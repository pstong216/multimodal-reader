// SettingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/toolbar/progress/Icons left.svg'; // Replace with the correct path to your back icon
import { Picker } from '@react-native-picker/picker';
import Multimodal from './Multimodal';
import stateStore from '../stores/stateStore';
import TextSettingScreen from './TextSettingGlobal';
const { width, height } = Dimensions.get('window');

const SettingScreen = () => {
  const { modalVisible, setModalVisible, globalTextSetting, setGlobalTextSetting } = stateStore();
  const [textSetting, setTextSetting] = React.useState(false);
  const navigation = useNavigation();
  const [Language, setLanguage] = React.useState('English');
  const [multimodalContent, setMultimodalContent] = React.useState(false);
  const [isLanguagePickerVisible, setIsLanguagePickerVisible] = React.useState(false);
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <BackIcon width={20} height={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setting</Text>
      </View>
      {/* 设置语言 */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingItem} onPress={() => { }}>
          <Text style={styles.settingText} onPress={() => { setIsLanguagePickerVisible(true) }}>Language</Text>
          <Modal
            visible={isLanguagePickerVisible}
            transparent={true}
            animationType="slide"
          ><View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={Language}
                  style={styles.fontFamilyPicker}
                  onValueChange={(itemValue: string) => { setLanguage(itemValue) }}
                >
                  <Picker.Item label="English" value="English" />
                  <Picker.Item label="中文" value="中文" />
                  <Picker.Item label="Deutsch" value="Deutsch" />
                  <Picker.Item label="한국어" value="한국어" />
                  <Picker.Item label="日本語" value="日本語" />
                </Picker>
                <TouchableOpacity onPress={() => setIsLanguagePickerVisible(false)} style={styles.modalCloseButton}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => { setMultimodalContent(true); setModalVisible(true) }}>
          <Text style={styles.settingText}>Multimodal Content</Text>
          {multimodalContent && <Multimodal />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => { setTextSetting(true), setGlobalTextSetting(true) }}>
          <Text style={styles.settingText}>Theme Setting</Text>
          {textSetting && <TextSettingScreen />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Others</Text>
        </TouchableOpacity>

      </View >
    </View >
  );
};

const styles = StyleSheet.create({
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
  screen: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  headerTitle: {
    marginLeft: width * 0.03,
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: width * 0.05,
  },
  settingItem: {
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingText: {
    fontSize: width * 0.04,
  },
  fontFamilyPicker: {
    width: '100%',
    height: 150,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#007BFF',
    fontSize: 18,
  },
});

export default SettingScreen;
