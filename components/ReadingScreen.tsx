import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
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
const { width, height } = Dimensions.get("window");

const ReadingScreen = () => {
  const store = useStore();
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
  } = store;
  const { currentTime, updateCurrentTime } = time;
  const { modalVisible, setModalVisible } = stateStore();
  const [currentColor, setCurrentColor] = useState("#000");
  // const [showToolBar, setShowToolBar] = useState(false);
  // const [selectedButton, setSelectedButton] = useState<string | null>(null);

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
  });
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {book.theme && book.theme.bgImg !== "" ? (
          <ImageBackground source={{ uri: book.theme.bgImg }}>
            <View style={styles.header}>
              <Text style={styles.chapterTitle}>Chapter Name</Text>
            </View>
            <Paragraph
              width={width}
              height={height}
              bookId="1"
              id="123"
              content="EDG Viper his field yet relatively little known to the wider public"
              imgs={[]}
              musics={[]}
              context={
                "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider public his field yet relatively little known to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider public"
              }
              handleGenerateImage={(selectedText: string) => {
                console.log(selectedText);
              }}
              handleGenerateMusic={(selectedText: string) => {
                console.log(selectedText);
              }}
            />
            <Paragraph
              width={width}
              height={height}
              bookId="1"
              id="123"
              content="EDG Viper his field yet relatively little known to the wider public"
              imgs={[]}
              musics={[]}
              context={
                "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider public his field yet relatively little known to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider public"
              }
              handleGenerateImage={(selectedText: string) => {
                console.log(selectedText);
              }}
              handleGenerateMusic={(selectedText: string) => {
                console.log(selectedText);
              }}
            />
          </ImageBackground>
        ) : (
          <ImageBackground
          // source={{ uri: book.theme.bgImg }}
          >
            <View style={styles.header}>
              <Text style={styles.chapterTitle}>Chapter Name</Text>
            </View>
            <ScrollView>
              <Paragraph
                width={width}
                height={height}
                bookId="1"
                id="123"
                content="EDG Viper his field yet relatively little known to the wider public"
                imgs={[]}
                musics={[]}
                context={
                  "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider public his field yet relatively little known to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider public"
                }
                handleGenerateImage={(selectedText: string) => {
                  console.log(selectedText);
                }}
                handleGenerateMusic={(selectedText: string) => {
                  console.log(selectedText);
                }}
              />
              <Paragraph
                width={width}
                height={height}
                bookId="1"
                id="123"
                content="EDG Viper his field yet relatively little known to the wider public"
                imgs={[]}
                musics={[]}
                context={
                  "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider public his field yet relatively little known to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider public"
                }
                handleGenerateImage={(selectedText: string) => {
                  console.log(selectedText);
                }}
                handleGenerateMusic={(selectedText: string) => {
                  console.log(selectedText);
                }}
              />
              <Paragraph
                width={width}
                height={height}
                bookId="1"
                id="123"
                content="EDG Viper his field yet relatively little known to the wider public"
                imgs={[]}
                musics={[]}
                context={
                  "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider public his field yet relatively little known to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider public"
                }
                handleGenerateImage={(selectedText: string) => {
                  console.log(selectedText);
                }}
                handleGenerateMusic={(selectedText: string) => {
                  console.log(selectedText);
                }}
              />
              <Paragraph
                width={width}
                height={height}
                bookId="1"
                id="123"
                content="EDG Viper his field yet relatively little known to the wider public"
                imgs={[]}
                musics={[]}
                context={
                  "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider public his field yet relatively little known to the wider public his field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider publichis field yet relatively little known to the wider public"
                }
                handleGenerateImage={(selectedText: string) => {
                  console.log(selectedText);
                }}
                handleGenerateMusic={(selectedText: string) => {
                  console.log(selectedText);
                }}
              />
            </ScrollView>
          </ImageBackground>
        )}
        {/* <ImageBackground
        // source={{ uri: book.theme.bgImg }}
        >
          <View style={styles.header}>
            <Text style={styles.chapterTitle}>Chapter Name</Text>
          </View>
          <Pressable style={styles.contentContainer} onPress={handlePress}>
            <Text style={styles.textContent}>
              {text}
            </Text>
          </Pressable>
        </ImageBackground> */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{currentTime}</Text>
          <Text style={styles.footerText}>XX/YY</Text>
        </View>

        {selectedButton && (
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <ScrollView style={styles.overlayContainer}>
              {selectedButton === "contents" && <ContentScreen />}
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
