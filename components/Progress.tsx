// ProgressScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import LeftArrow from '../assets/toolbar/progress/Icons left.svg';
import RightArrow from '../assets/toolbar/progress/Icons right.svg';

const { width, height } = Dimensions.get('window');

const ProgressScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>XX/YY</Text>
      <View style={styles.sliderContainer}>
        <LeftArrow width={width * 0.06} height={width * 0.06} style={styles.arrow} />
        <Slider
          style={styles.slider}
          value={0}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor="#FFF"
          minimumTrackTintColor="#DADADA"
          maximumTrackTintColor="rgba(218, 218, 218, 0.39)"
          thumbStyle={styles.thumb}
        />
        <RightArrow width={width * 0.06} height={width * 0.06} style={styles.arrow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    color: '#667080',
    fontFamily: 'Mulish',
    fontSize: width * 0.04,
    fontWeight: '400',
    lineHeight: width * 0.04,
    marginBottom: height * 0.02,
    marginTop: height * 0.02
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(218, 218, 218, 0.39)',
    borderRadius: width * 0.05, // 20px based on 428px width
    width: width * 0.8, // 342px based on 428px width
    height: height * 0.04, // 36px based on 926px height
    paddingHorizontal: width * 0.02, // 10px based on 428px width
    marginBottom: height * 0.02,
  },
  arrow: {
    width: width * 0.06, // 24px based on 428px width
    height: width * 0.06, // 24px based on 428px width
  },
  slider: {
    flex: 1,
    height: height * 0.043, // 40px based on 926px height
  },
  thumb: {
    width: width * 0.084, // 36px based on 428px width
    height: width * 0.084, // 36px based on 428px width
    backgroundColor: '#FFF',
    borderRadius: width * 0.042, // 18px based on 428px width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.004 }, // 4px based on 926px height
    shadowOpacity: 0.25,
    shadowRadius: width * 0.01, // 4px based on 428px width
  },
});

export default ProgressScreen;
