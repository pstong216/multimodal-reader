import React, { useState, useEffect, FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import ContentScreen from "./Contents";
import MultimodalScreen from "./Multimodal";
import ProgressScreen from "./Progress";
import TextSettingScreen from "./TextSetting";
import ContentIcon from "../assets/toolbar/content.svg";
import MultimodalIcon from "../assets/toolbar/multimodality.svg";
import ProgressIcon from "../assets/toolbar/progress.svg";
import TextSettingIcon from "../assets/toolbar/text_setting.svg";
import useStore from "../stores/useSettingsStore";
import timeStore from "../stores/timeStore";
import stateStore from "../stores/stateStore";
import Paragraph from "./Multimodal/Paragraph";
import { chat, generateImg } from "../utils/aiRequest";
import { useBookStore } from "../stores/bookStore";
import { Book, Chapter, ImgGc, MusicGc, RootStackParamList } from "../types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
const {
  generateAudioByPrompt,
  getAudioInformation,
} = require("../utils/sunoRequest"); // Make sure the path is correct
const { width, height } = Dimensions.get("window");

type PicScreenRouteProp = RouteProp<RootStackParamList, "Reading">;

type Props = {
  route: PicScreenRouteProp;
};

const ReadingScreen: FC<Props> = ({ route }) => {
  const { bookId } = route.params;
  const store = useStore();
  const bookStore = useBookStore();
  const time = timeStore();
  const {
    fontColor,
    setFontColor,
    book,
    showToolBar,
    setShowToolBar,
    selectedButton,
    setSelectedButton,
    background,
    fontSize,
    fontFamily,
    leading,
    margin,
    tempImgTags,
    tempMusicTags,
  } = store;
  const { currentTime, updateCurrentTime } = time;
  const { modalVisible, setModalVisible } = stateStore();
  const [currentColor, setCurrentColor] = useState("#000");
  const [imgs, setImgs] = useState<ImgGc[]>([]);
  const [musics, setMusics] = useState<MusicGc[]>([]);
  const [tag, setTag] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  // const [showToolBar, setShowToolBar] = useState(false);
  // const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Reading">>();
  useEffect(() => {
    const timer = setInterval(() => {
      updateCurrentTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [updateCurrentTime]);

  const handlePress = () => {
    setShowToolBar(!showToolBar);
    setSelectedButton(null);
  };

  const handleButtonPress = (button: string) => {
    setSelectedButton(button);
  };

  //获取当前打开的书
  useEffect(() => {
    setCurrentBook(bookStore.books.filter((book) => book.id === bookId)[0]);
  }, []);

  //生成 ai 图片并将其添加到这本书里
  async function generateImage(text: string, context: string, paraId: string) {
    alert("Picture generating...Please wait patiently...");
    const prompt =
      `Please generate an image with the following text as the content, and the image style should match the text style: ${text}` +
      `You can also refer to the context here to infer other elements in the picture, but these should not be the main content of the image: ${context}` +
      `Besides we have this style tags: ${tempImgTags.join(",")}.`;
    const imgUrl = await generateImg(prompt);
    setImgs((prev) => {
      return [...prev, { id: uuidv4(), url: imgUrl, paraId: paraId }];
    });
    bookStore.setImg(bookId, {
      id: uuidv4(),
      url: imgUrl,
      paraId: paraId,
    });
  }

  async function generateMusic(text: string) {
    alert("Music generating...Please wait patiently...");
    const aiPrompt = await chat([
      {
        role: "user",
        content: `Please summarize the musical melody and style of this passage. Please try to describe them in a concise phrase. Do not include anything else in your answer:${text}`,
      },
    ]);
    await musicRequest(aiPrompt);
  }

  async function setAudioMode() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }

  setAudioMode();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (url: string) => {
    console.log("Loading Sound");
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true }
    );
    setSound(newSound);

    console.log("Playing Sound");
    await newSound.playAsync();
    setIsPlaying(true);
  };

  const stopSound = async () => {
    if (sound) {
      console.log("Stopping Sound");
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };
  async function musicRequest(input: string) {
    const data = await generateAudioByPrompt({
      prompt: `The music has the following styles: ${input}, ${tempMusicTags.join(
        ", "
      )}, and please add appropriate lyrics or no lyrics.`,
      make_instrumental: false,
      wait_audio: false,
    });

    const ids = `${data[0].id},${data[1].id}`;
    console.log(`ids: ${ids}`);

    for (let i = 0; i < 60; i++) {
      const data = await getAudioInformation(ids);
      if (data[0].status === "streaming") {
        console.log(`data0: ${data[0].id} ==> ${data[0].audio_url}`);
        const url0 = "https://cdn1.suno.ai/" + data[0].id + ".mp3";
        playSound(data[0].audio_url);
        console.log(`data1: ${data[1].id} ==> ${data[1].audio_url}`);
        break;
      }

      // sleep 5s
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  const getIconColor = (button: string) =>
    selectedButton === button ? "#A8ADB7" : "#667080";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      // backgroundImage: 'url(../assets/backgrounds/reading.jpg)',
    },
    header: {
      width: "100%",
      height: height * 0.05, // 固定顶部高度
      justifyContent: "center",
      alignItems: "center",
    },
    chapterTitle: {
      color: "#848484",
      fontFamily: fontFamily,
      fontSize: width * 0.036,
      fontWeight: "400",
      lineHeight: width * 0.084, // 36px
    },
    footer: {
      width: "100%",
      height: height * 0.08, // 固定底部高度
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: width * 0.05,
      backgroundColor: "#F8F8F8",
      position: "absolute",
      bottom: 0,
    },
    footerText: {
      color: "#848484",
      fontFamily: "Times New Roman",
      fontSize: width * 0.036,
      fontWeight: "400",
      lineHeight: width * 0.084, // 36px
    },
    toolBar: {
      display: "flex",
      width: width,
      height: height * 0.1, // 调整高度以容纳内容
      paddingVertical: height * 0.02,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: height * 0.015,
      flexShrink: 0,
      borderRadius: 0,
      backgroundColor: "#FFF",
      position: "absolute",
      bottom: 0,
      shadowColor: "#000", // 阴影颜色
      shadowOffset: {
        width: 0,
        height: 4,
      }, // 阴影偏移量
      shadowOpacity: 0.2, // 阴影透明度
      shadowRadius: 8, // 阴影半径
      elevation: 5, // Android 上的阴影
    },
    toolButtonRow: {
      display: "flex",
      width: width * 0.96,
      paddingHorizontal: width * 0.04,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: height * 0.01,
    },
    toolButton: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    overlayContainer: {
      position: "absolute",
      bottom: height * 0.1, // 与工具栏保持一定距离
      width: "100%",
      backgroundColor: "#FFF",
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.5, // 加大阴影透明度
      shadowRadius: 10,
      elevation: 5,
    },
    closeButton: {
      position: "absolute",
      right: 70,
      width: 50,
      height: 30,
      borderRadius: 25,
      borderColor: "#000",
      borderWidth: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      color: "#000",
      fontSize: 24,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {book.theme && book.theme.bgImg !== "" ? (
          <ImageBackground source={{ uri: book.theme.bgImg }}>
            <View style={styles.header}>
              <Text style={styles.chapterTitle}>
                {currentBook
                  ? currentBook.chapters[currentBook.lastRead.chapter].name
                  : "Chapter x"}
              </Text>
              <TouchableOpacity style={styles.closeButton}>
                <Image source={isPlaying ? continueIcon : pauseIcon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 100 }}>
              {(currentBook
                ? currentBook.chapters[currentBook.lastRead.chapter].paragraphs
                : []
              ).map((para, index, total) => {
                let context;
                if (index !== 0 && index !== total.length - 1) {
                  context = total[index - 1].content + total[index + 1].content;
                } else if (index !== 0) {
                  context = total[index - 1].content;
                } else {
                  context = total[index + 1].content;
                }
                return (
                  <Paragraph
                    key={para.id}
                    width={width}
                    height={height}
                    bookId={para.bookId}
                    id={para.id}
                    content={para.content}
                    imgs={currentBook?.multiModel.imgs}
                    musics={currentBook?.multiModel.musics}
                    context={context}
                    handleGenerateImage={(
                      selectedText: string,
                      context: string
                    ) => {
                      generateImage(selectedText, context, "124");
                    }}
                    handleGenerateMusic={(selectedText: string) => {
                      generateMusic(selectedText);
                    }}
                  />
                );
              })}
            </ScrollView>
          </ImageBackground>
        ) : (
          <ImageBackground
          // source={{ uri: book.theme.bgImg }}
          >
            <View style={styles.header}>
              <Text style={styles.chapterTitle}>
                {currentBook
                  ? currentBook.chapters[currentBook.lastRead.chapter].name
                  : "Chapter x"}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setIsPlaying(!isPlaying);
                  stopSound();
                }}
              >
                <Text>{isPlaying ? "⏹" : "▶️"}</Text>
              </TouchableOpacity>
            </View>

            {/* 音乐播放按钮 */}
            <ScrollView style={{ marginBottom: 100 }}>
              {(currentBook
                ? currentBook.chapters[currentBook.lastRead.chapter].paragraphs
                : []
              ).map((para, index, total) => {
                let context;
                if (index !== 0 && index !== total.length - 1) {
                  context = total[index - 1].content + total[index + 1].content;
                } else if (index !== 0) {
                  context = total[index - 1].content;
                } else {
                  context = total[index + 1].content;
                }
                return (
                  <Paragraph
                    key={para.id}
                    width={width}
                    height={height}
                    bookId={para.bookId}
                    id={para.id}
                    content={para.content}
                    imgs={currentBook?.multiModel.imgs}
                    musics={currentBook?.multiModel.musics}
                    context={context}
                    handleGenerateImage={(
                      selectedText: string,
                      context: string
                    ) => {
                      generateImage(selectedText, context, "124");
                    }}
                    handleGenerateMusic={(selectedText: string) => {
                      generateMusic(selectedText);
                    }}
                  />
                );
              })}
            </ScrollView>
          </ImageBackground>
        )}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{currentTime}</Text>
          <Text style={styles.footerText}>XX/YY</Text>
        </View>

        {selectedButton && (
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <ScrollView style={styles.overlayContainer}>
              {selectedButton === "contents" && (
                <ContentScreen bookId={bookId} />
              )}
              {selectedButton === "multimodal" && <MultimodalScreen />}
              {selectedButton === "progress" && <ProgressScreen />}
              {selectedButton === "textSetting" && <TextSettingScreen />}
            </ScrollView>
          </TouchableWithoutFeedback>
        )}
        {showToolBar && (
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.toolBar}>
              <View style={styles.toolButtonRow}>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => handleButtonPress("contents")}
                >
                  <ContentIcon
                    width={30}
                    height={30}
                    fill={getIconColor("contents")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => handleButtonPress("progress")}
                >
                  <ProgressIcon
                    width={30}
                    height={30}
                    fill={getIconColor("progress")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => {
                    setModalVisible(true);
                    handleButtonPress("multimodal");
                  }}
                >
                  <MultimodalIcon
                    width={26}
                    height={26}
                    fill={getIconColor("multimodal")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() => handleButtonPress("textSetting")}
                >
                  <TextSettingIcon
                    width={26}
                    height={26}
                    fill={getIconColor("textSetting")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReadingScreen;
