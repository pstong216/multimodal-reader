import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ParaProps, RootStackParamList } from "../../types";
import useStore from "../../stores/useSettingsStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ImgIcon from "../../assets/imgIcon.svg";
import MusicIcon from "../../assets/musicIcon.svg";
import { useRef, useState } from "react";
import Popover from "react-native-popover-view";
import { chat } from "../../utils/aiRequest";

export default function Paragraph(props: ParaProps) {
  const store = useStore();
  const { fontColor, book, fontSize, fontFamily, leading, margin, background } =
    store;
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState(false);
  const touchable = useRef();
  const [popoverText, setPopoverText] = useState<string>("");

  const styles = StyleSheet.create({
    container: {
      width: props.width,
      flex: 1,
      backgroundColor: background,
      // backgroundImage: 'url(../assets/backgrounds/reading.jpg)',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: props.width * (0.05 + 0.01 * margin),
      paddingVertical: props.height * 0.001,
    },
    textContent: {
      width: "100%",
      // height: props.height * 0.75,
      color: fontColor,
      fontFamily: fontFamily,
      fontSize: props.width * (0.05 + 0.005 * fontSize), // 20px
      fontWeight: "400",
      lineHeight: props.width * (0.084 + 0.01 * leading), // 36px
      textAlign: "justify",
      marginVertical: props.height * 0.001, // 你可以在此处添加垂直边距
    },
    multiModeButton: {
      width: 30,
      height: 30,
      borderRadius: 108,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    button: {
      marginVertical: 10,
    },
    buttonText: {
      fontSize: 17,
      color: "blue",
    },
    popoverBox: {
      borderRadius: 8,
      backgroundColor: "#FFF",
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
  });

  //展示释义
  async function handleMeaning() {
    setModalVisible(false);
    const explaination = await chat([
      {
        role: "system",
        content:
          "Please explain the following content/word based on its context (please be brief!).",
      },
      {
        role: "user",
        content: `This is the context: ${props.context}`,
      },
      {
        role: "user",
        content: `This is the content/word you need to understand: ${props.content}`,
      },
    ]);
    setPopoverText(explaination);
    setShowPopover(true);
  }

  return (
    <>
      <Popover
        from={touchable}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        popoverStyle={[styles.popoverBox]}
      >
        <View>
          <Text style={{ fontSize: 18 }}>{"AI Explainaton: "}</Text>
          {popoverText !== "" && (
            <Text
              selectable
              style={{
                textAlign: "justify",
                fontSize: 15,
                fontFamily: "Times New Roman",
                marginTop: 2,
              }}
            >
              {popoverText}
            </Text>
          )}
        </View>
      </Popover>
      <View ref={touchable} style={[styles.container, { marginBottom: 30 }]}>
        <Pressable style={styles.contentContainer}>
          <Text
            style={styles.textContent}
            selectable={true}
            onLongPress={() => setModalVisible(true)}
          >
            {"  " + props.content}
          </Text>
        </Pressable>
        <View
          style={[
            styles.contentContainer,
            {
              display: "flex",
              flexDirection: "row",
              columnGap: 0,
              justifyContent: "flex-end",
              marginTop: -20,
            },
          ]}
        >
          {props.imgs.map((img) => {
            return (
              <TouchableOpacity
                style={styles.multiModeButton}
                onPress={() => {
                  //TODO:点击后跳转到图片展示页
                  navigation.navigate("Setting");
                }}
              >
                <ImgIcon />
              </TouchableOpacity>
            );
          })}
          {props.musics.map((music) => {
            return (
              <TouchableOpacity
                style={styles.multiModeButton}
                onPress={() => {
                  //TODO:点击后播放音乐
                  navigation.navigate("Setting");
                }}
              >
                <MusicIcon />
              </TouchableOpacity>
            );
          })}
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={handleMeaning} style={styles.button}>
                <Text style={styles.buttonText}>Explaination</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.handleGenerateImage}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Genarate Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.handleGenerateMusic}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Genarate Music</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
