import React, { useState } from 'react';
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

const { width, height } = Dimensions.get('window');

const TextSettingScreen = () => {
  const [selectedFont, setSelectedFont] = useState("Times New Roman");
  const [isFontPickerVisible, setFontPickerVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
        <BrightnessIcon width={24} height={24} />
        <Slider
          style={styles.slider}
          value={50}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor="#FFF"
          minimumTrackTintColor="#DADADA"
          maximumTrackTintColor="rgba(218, 218, 218, 0.39)"
        />
      </View>
      <View style={styles.colorOptions}>
        <TouchableOpacity style={styles.colorButtonWhite}>
          <ColorCircle fill="#F8F8F8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.colorButtonGreen}>
          <ColorCircle fill="#CCF0CF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.colorButtonYellow}>
          <ColorCircle fill="#F7F0DF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.colorButtonBlack}>
          <ColorCircle fill="#494949" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rectangularButton}>
          <RectangularButton width={79} height={51} />
        </TouchableOpacity>
      </View>
      <View style={styles.textSizeContainer}>
        <TouchableOpacity style={styles.textSizeButtonDecrease}>
          <TextSizeDecreaseIcon width={116} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textSizeButtonIncrease}>
          <TextSizeIncreaseIcon width={116} height={48} />
        </TouchableOpacity>
      </View>
      <View style={styles.fontFamilyContainer}>
        <View style={styles.fontFamilyPickerContainer}>
          <Text style={styles.selectedFontText}>{selectedFont}</Text>
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
                selectedValue={selectedFont}
                style={styles.fontFamilyPicker}
                onValueChange={(itemValue) => setSelectedFont(itemValue)}
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
      <View style={styles.textAlignContainer}>
        <TouchableOpacity style={styles.textAlignButton}>
          <AlignLeftIcon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textAlignButton}>
          <AlignCenterIcon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textAlignButton}>
          <AlignRightIcon width={108} height={48} />
        </TouchableOpacity>
      </View>
      <View style={styles.layoutOptions}>
        <TouchableOpacity style={styles.layoutButton}>
          <Layout1Icon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layoutButton}>
          <Layout2Icon width={108} height={48} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.layoutButton}>
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