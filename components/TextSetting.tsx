import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import BrightnessIcon from '../assets/text_setting/brightness.svg';
import ColorCircle from '../assets/text_setting/color_circle.svg';
import TextSizeIncreaseIcon from '../assets/text_setting/text_size_increase.svg';
import TextSizeDecreaseIcon from '../assets/text_setting/text_size_decrease.svg';
import FontDropdownIcon from '../assets/text_setting/font_dropdown.svg';
import AlignLeftIcon from '../assets/text_setting/align_left.svg';
import AlignCenterIcon from '../assets/text_setting/align_center.svg';
import AlignRightIcon from '../assets/text_setting/align_right.svg';
import Layout1Icon from '../assets/text_setting/layout1.svg';
import Layout2Icon from '../assets/text_setting/layout2.svg';
import Layout3Icon from '../assets/text_setting/layout3.svg';
import RectangularButton from '../assets/text_setting/rectangular_button.svg';
import useStore from '../stores/useSettingsStore';
import * as Brightness from 'expo-brightness';
import * as Font from 'expo-font';
const { width, height } = Dimensions.get('window');

const TextSettingScreen = () => {
  const [selectedFont, setSelectedFont] = useState("Times New Roman");
  const [isFontPickerVisible, setFontPickerVisible] = useState(false);
  const { brightness, setFontColor, setBrightness, background, setBackground, fontSize, setFontSize, fontFamily, setFontFamily, margin, setMargin, setLeading } = useStore();
  const colorList = ['#F8F8F8', '#CCF0CF', '#F7F0DF', '#494949'];
  const fontFamilyList = ['Times New Roman', 'Arial', 'Courier New', 'Georgia', 'Verdana'];
  useEffect(() => {

    const fetchBrightness = async () => {
      // await Brightness.setBrightnessAsync(0.1);
      const currentBrightness = await Brightness.getBrightnessAsync();
      console.log('current ', currentBrightness);
      setBrightness(currentBrightness);
    };
    fetchBrightness();
  }, []);

  const handleValueChange = async (newBrightness: number) => {
    console.log('attempting ', newBrightness);
    await Brightness.setBrightnessAsync(newBrightness);//这个API没效果。。
    const fetchBrightness = async () => {
      const currentBrightness = await Brightness.getBrightnessAsync();
      // console.log('current ', currentBrightness);
      setBrightness(currentBrightness);
    };
    fetchBrightness();
    setBrightness(newBrightness);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 亮度 */}
      <View style={styles.sliderContainer}>
        <BrightnessIcon width={24} height={24} />
        <Slider
          style={styles.slider}
          value={brightness}
          onValueChange={handleValueChange}
          minimumValue={0}
          maximumValue={0.99}
          thumbTintColor="#FFF"
          minimumTrackTintColor="#DADADA"
          maximumTrackTintColor="rgba(218, 218, 218, 0.39)"
        />
      </View>
      {/* 选择背景颜色 */}
      <View style={styles.colorOptions}>
        <TouchableOpacity
          style={styles.colorButtonWhite}
          onPress={() => { setBackground(colorList[0]); setFontColor('#000') }}
        >
          <ColorCircle fill={colorList[0]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.colorButtonGreen} onPress={() => { setBackground(colorList[1]); setFontColor('#000') }}>
          <ColorCircle fill={colorList[1]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.colorButtonYellow} onPress={() => { setBackground(colorList[2]); setFontColor('#000') }}>
          <ColorCircle fill={colorList[2]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.colorButtonBlack} onPress={() => { setBackground(colorList[3]); setFontColor(colorList[0]) }}>
          <ColorCircle fill={colorList[3]} />
        </TouchableOpacity>
        {/* 翻页模式 */}
        <TouchableOpacity style={styles.rectangularButton}>
          <RectangularButton width={79} height={51} />
        </TouchableOpacity>
      </View>
      {/* 字体大小 */}
      <View style={styles.textSizeContainer}>
        <TouchableOpacity style={styles.textSizeButtonDecrease} onPress={() => setFontSize(Math.max(fontSize - 1, -10))}>
          <TextSizeDecreaseIcon width={116} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textSizeButtonIncrease} onPress={() => setFontSize(Math.min(fontSize + 1, 15))}>
          <TextSizeIncreaseIcon width={116} height={48} />
        </TouchableOpacity>
      </View>
      {/* 字体 */}
      <View style={styles.fontFamilyContainer}>
        <View style={styles.fontFamilyPickerContainer}>
          <Text style={styles.selectedFontText}>{fontFamily}</Text>
          <TouchableOpacity onPress={() => setFontPickerVisible(true)}>
            <FontDropdownIcon style={styles.fontDropdownIcon} />
          </TouchableOpacity>
        </View>
        <Modal
          visible={isFontPickerVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={fontFamily}
                style={styles.fontFamilyPicker}
                onValueChange={(itemValue: string) => setFontFamily(itemValue)}
              >
                <Picker.Item label="Times New Roman" value="Times New Roman" />
                <Picker.Item label="Arial" value="Arial" />
                <Picker.Item label="Courier New" value="Courier New" />
                <Picker.Item label="Georgia" value="Georgia" />
                <Picker.Item label="Verdana" value="Verdana" />
              </Picker>
              <TouchableOpacity onPress={() => setFontPickerVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.line} />
      {/* 行距 */}
      <View style={styles.textAlignContainer}>
        <TouchableOpacity style={styles.textAlignButton} onPress={() => setLeading(-2)}>
          <AlignLeftIcon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textAlignButton} onPress={() => setLeading(-1)}>
          <AlignCenterIcon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textAlignButton} onPress={() => setLeading(0)}>
          <AlignRightIcon width={108} height={48} />
        </TouchableOpacity>
      </View>
      <View style={styles.layoutOptions}>
        <TouchableOpacity style={styles.layoutButton} onPress={() => setMargin(-1)}>
          <Layout1Icon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layoutButton} onPress={() => setMargin(1)}>
          <Layout2Icon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layoutButton} onPress={() => setMargin(3)}>
          <Layout3Icon width={108} height={48} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  slider: {
    flex: 1,
    marginLeft: width * 0.02,
  },
  colorOptions: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: height * 0.02,
  },
  colorButtonWhite: {
    width: 48,
    height: 48,
    borderRadius: 108,
  },
  colorButtonGreen: {
    width: 48,
    height: 48,
    borderRadius: 108,
  },
  colorButtonYellow: {
    width: 48,
    height: 48,
    borderRadius: 108,
  },
  colorButtonBlack: {
    width: 48,
    height: 48,
    borderRadius: 108,
  },
  rectangularButton: {
    width: 79,
    height: 51,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F1F1F1',
  },
  textSizeContainer: {
    paddingHorizontal: width * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: height * 0.02,
  },
  textSizeButtonDecrease: {
    width: 116,
    height: 48,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#F1F1F1',
  },
  textSizeButtonIncrease: {
    width: 116,
    height: 48,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#F1F1F1',
  },
  fontFamilyContainer: {
    width: '100%',
    marginBottom: height * 0.02,
    backgroundColor: '#F1F1F1',
    borderRadius: 24,
    padding: 10,
  },
  fontFamilyPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedFontText: {
    fontSize: 16,
    color: '#000',
  },
  fontDropdownIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
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
  fontFamilyPicker: {
    width: '100%',
    height: 150,
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  modalCloseButtonText: {
    color: '#007BFF',
    fontSize: 18,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'rgba(102, 112, 128, 0.25)',
    marginBottom: height * 0.02,
  },
  textAlignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: height * 0.02,
  },
  textAlignButton: {
    width: 108,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: 359,
    marginBottom: height * 0.02,
  },
  layoutButton: {
    width: 108,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextSettingScreen;