import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
// import Sound from 'react-native-sound';
import { Audio } from "expo-av";

import useSettingState from "../stores/useSettingsStore";
const {
  customGenerateAudio,
  generateAudioByPrompt,
  extendAudio,
  getAudioInformation,
  getQuotaInformation,
  getClipInformation,
} = require("./sunoRequest"); // Make sure the path is correct
// import { generateAudioByPrompt, getAudioInformation } from '../../utils/sunoRequest';
interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange }) => {
  const [tag, setTag] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleAddTag = () => {
    if (tag.length > 0) {
      onTagsChange(tag);
      setTag("");
    }
  };
  const handlePrompt = () => {
    console.log("send request to generate music");
    musicRequest(prompt);
  };

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
      prompt: `The music has the following styles: ${input}, ${tags.join(
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setPrompt}
        onSubmitEditing={handlePrompt}
        placeholder="input prompt"
      />

      {/* 添加用于停止播放的按钮 */}
      <TouchableOpacity style={styles.button} onPress={stopSound}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (sound) {
            await sound.playAsync();
          }
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePrompt}>
        <Text style={styles.buttonText}>generate music</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // width: '10%',
    // height: '10%',
    backgroundColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  container: {
    flexDirection: "row", // 设置为行方向以使输入框和按钮水平排列
    marginVertical: 12,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 4,
    padding: 4,
    margin: 2,
  },
  tagText: {
    color: "#000",
    marginRight: 4,
  },
  removeTag: {
    color: "#000",
  },
  input: {
    flex: 1, // 输入框占据剩余空间，确保最大可能的输入空间
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,

    marginRight: 8, // 在输入框和按钮之间提供一定的间距
    // marginTop: 8,
  },
});

export default TagInput;
