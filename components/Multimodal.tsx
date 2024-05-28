import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import ToggleSwitch from './Multimodal/ToggleSwitch';
import ImagePicker from './Multimodal/ImagePicker';
import ColorPicker from './Multimodal/ColorPicker';
import Dropdown from './Multimodal/Dropdown';
import TagInput from './Multimodal/TagInput';
import stateStore from '../stores/stateStore';
import useSettingstore from '../stores/useSettingsStore';

const screenHeight = Dimensions.get('window').height; // 获取屏幕高度

const Multimodal: React.FC = () => {
  const { modalVisible, setModalVisible } = stateStore();
  const [gcEnabled, setGcEnabled] = useState(false); // 用于控制是否显示多模态设置
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [imageEnabled, setImageEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [themeEnabled, setThemeEnabled] = useState(false);
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [tags, setTags] = useState<string[]>([]);
  const { book, styleOptions, setBook } = useSettingstore();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>

        <ScrollView style={styles.scrollView}>
          {/* 关闭按钮 */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            {/* <Text style={styles.closeButtonText}>X</Text> */}
            <Text style={styles.closeButtonText}>X</Text>
            {/* <img src="" alt="" /> */}
          </TouchableOpacity>
          <ToggleSwitch label="Multimodal Content Generation" value={gcEnabled} onValueChange={setGcEnabled} />
          <View style={styles.section}>
            <ToggleSwitch label="Audio" value={audioEnabled} onValueChange={setAudioEnabled} />
            <View>
              <Text style={styles.tagsContainer}>
                tags1, tags2
              </Text>
            </View>
            <TagInput tags={tags} onTagsChange={setTags} />
          </View>
          <View style={styles.section}>
            <ToggleSwitch label="Image" value={imageEnabled} onValueChange={setImageEnabled} />
            <View>
              <Text style={styles.tagsContainer}>
                tags1, tags2
              </Text>
            </View>
            <TagInput tags={tags} onTagsChange={setTags} />
          </View>
          <View style={styles.section}>
            <ToggleSwitch label="Vibration" value={vibrationEnabled} onValueChange={setVibrationEnabled} />
          </View>
          <View style={styles.section}>
            <ToggleSwitch label="Theme" value={themeEnabled} onValueChange={setThemeEnabled} />
            <View style={styles.themeOptions}>
              <Text>Background Image</Text>
              <ImagePicker />
            </View>
            <View style={styles.themeOptions}>
              <Text>Font Family</Text>
              <Dropdown options={['Times New Roman', 'Arial', 'Courier']} selectedValue={book.theme ? book.theme.fontFamily : fontFamily} onValueChange={() => {
                setFontFamily(fontFamily);
                setBook({
                  ...book,
                  theme: {
                    ...book.theme as { bgImg: string, fontFamily: string, fontColor: string },
                    fontFamily,
                  },
                });
              }} />
            </View>
            <View style={styles.themeOptions}>
              <Text>Font Color</Text>
              <ColorPicker />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    padding: 10,
    width: '100%',
    height: 80,
    backgroundColor: '#f0f0f0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // 将内容对齐到屏幕底部
  },
  scrollView: {
    backgroundColor: 'white',
    maxHeight: screenHeight, // 设置滚动视图的最大高度为屏幕的三分之二
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  closeButton: {
    position: 'relative',
    top: 5,
    left: -2,
    width: 20,
    height: 20,
    padding: 0, // 更新这里以适应小尺寸
    justifyContent: 'center', // 确保内容居中
    alignItems: 'center', // 确保内容居中
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 14,
    // color: 'red',
  },
});

export default Multimodal;
