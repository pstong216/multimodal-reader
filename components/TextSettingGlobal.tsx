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
import stateStore from '../stores/stateStore';
import * as Brightness from 'expo-brightness';
import * as Font from 'expo-font';
const { width, height } = Dimensions.get('window');

const TextSettingScreen = () => {
    const [selectedFont, setSelectedFont] = useState("Times New Roman");
    const [isFontPickerVisible, setFontPickerVisible] = useState(false);
    const { setFontColorGlobal, fontColorGlobal, setFontColor, fontColor, brightness, setBrightness, backgroundGlobal, setBackgroundGlobal, background, setBackground, fontSizeGlobal, setFontSizeGlobal, fontSize, setFontSize, fontFamilyGlobal, setFontFamilyGlobal, fontFamily, setFontFamily, marginGlobal, setMarginGlobal, margin, setMargin, leading, setLeading, leadingGlobal, setLeadingGlobal } = useStore();
    const { globalTextSetting, setGlobalTextSetting } = stateStore();
    const colorList = ['#F8F8F8', '#CCF0CF', '#F7F0DF', '#494949'];
    const fontFamilyList = ['Times New Roman', 'Arial', 'Courier New', 'Georgia', 'Verdana'];
    const [modalVisible, setModalVisible] = useState(true);
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
    const text = "EDG Viper his field yet relatively little known to the wider public his field yet relatively little known his field yet relatively little known to the wider public  to the wider public his field yet relatively EDG Viper his field yet relatively little kn EDG Viper his field yet relatively little kn  EDG Viper his field yet relatively little kn"
    const styles = StyleSheet.create({
        textContainer: {
            paddingHorizontal: width * (0.05 + 0.01 * marginGlobal),
            padding: 10,
            backgroundColor: backgroundGlobal,
            top: height * 0.02,
            width: '100%',
            height: height * 0.28,
        },
        textContent: {
            width: '100%',
            // height: height * 0.75,
            color: fontColorGlobal,
            // color: '#000',
            fontFamily: fontFamilyGlobal,
            fontSize: width * (0.05 + 0.005 * fontSizeGlobal), // 20px
            fontWeight: '400',
            lineHeight: width * (0.084 + 0.01 * leadingGlobal), // 36px
            textAlign: 'justify',
            marginVertical: height * 0.001, // 你可以在此处添加垂直边距
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
            borderColor: '#DADADA',
            backgroundColor: '#fff',
            borderRadius: 4,
            marginBottom: 10,
            marginTop: 10,

        },
        closeButtonText: {
            fontSize: 14,
            color: '#DADADA',
        },
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
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={globalTextSetting}
            onRequestClose={() => { setGlobalTextSetting(false) }}
        >
            <ScrollView style={styles.container}>

                <TouchableOpacity style={styles.closeButton} onPress={() => setGlobalTextSetting(false)}>
                    {/* <Text style={styles.closeButtonText}>X</Text> */}
                    <Text style={styles.closeButtonText}>X</Text>
                    {/* <img src="" alt="" /> */}
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.textContent}>
                        {text}
                    </Text>
                </View>

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
                        onPress={() => { { setBackgroundGlobal(colorList[2]); setFontColorGlobal('#000'); setBackground(colorList[2]); setFontColor('#000'); } }}
                    >
                        <ColorCircle fill={colorList[0]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.colorButtonGreen} onPress={() => { setBackgroundGlobal(colorList[1]); setFontColorGlobal('#000'); setBackground(colorList[1]); setFontColor('#000') }}>
                        <ColorCircle fill={colorList[1]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.colorButtonYellow} onPress={() => { setBackgroundGlobal(colorList[2]); setFontColorGlobal('#000'); setBackground(colorList[2]); setFontColor('#000') }}>
                        <ColorCircle fill={colorList[2]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.colorButtonBlack} onPress={() => { setBackgroundGlobal(colorList[3]); setFontColorGlobal(colorList[0]); setBackground(colorList[3]); setFontColor(colorList[0]) }}>
                        <ColorCircle fill={colorList[3]} />
                    </TouchableOpacity>
                    {/* 翻页模式 */}
                    <TouchableOpacity style={styles.rectangularButton}>
                        <RectangularButton width={79} height={51} />
                    </TouchableOpacity>
                </View>
                {/* 字体大小 */}
                <View style={styles.textSizeContainer}>
                    <TouchableOpacity style={styles.textSizeButtonDecrease} onPress={() => { setFontSizeGlobal(Math.max(fontSize - 1, -10)); setFontSize(Math.max(fontSize - 1, -10)) }}>
                        <TextSizeDecreaseIcon width={116} height={48} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textSizeButtonIncrease} onPress={() => { setFontSizeGlobal(Math.min(fontSize + 1, 15)); setFontSize(Math.min(fontSize + 1, 15)) }}>
                        <TextSizeIncreaseIcon width={116} height={48} />
                    </TouchableOpacity>
                </View>
                {/* 字体 */}
                <View style={styles.fontFamilyContainer}>
                    <View style={styles.fontFamilyPickerContainer}>
                        <Text style={styles.selectedFontText}>{fontFamilyGlobal}</Text>
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
                                    selectedValue={fontFamilyGlobal}
                                    style={styles.fontFamilyPicker}
                                    onValueChange={(itemValue: string) => setFontFamilyGlobal(itemValue)}
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
                    <TouchableOpacity style={styles.textAlignButton} onPress={() => { setLeadingGlobal(-2); setLeading(-2) }}>
                        <AlignLeftIcon width={108} height={48} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textAlignButton} onPress={() => { setLeadingGlobal(-1); setLeading(-1) }}>
                        <AlignCenterIcon width={108} height={48} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textAlignButton} onPress={() => { setLeadingGlobal(0); setLeading(0) }}>
                        <AlignRightIcon width={108} height={48} />
                    </TouchableOpacity>
                </View>
                <View style={styles.layoutOptions}>
                    <TouchableOpacity style={styles.layoutButton} onPress={() => { setMarginGlobal(-1); setMargin(-1) }}>
                        <Layout1Icon width={108} height={48} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.layoutButton} onPress={() => { setMarginGlobal(1); setMargin(1) }}>
                        <Layout2Icon width={108} height={48} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.layoutButton} onPress={() => { setMarginGlobal(3); setMargin(3) }}>
                        <Layout3Icon width={108} height={48} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal >
    );
};



export default TextSettingScreen;