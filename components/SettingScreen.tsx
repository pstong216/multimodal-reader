// SettingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/toolbar/progress/Icons left.svg'; // Replace with the correct path to your back icon

const { width, height } = Dimensions.get('window');

const SettingScreen = () => {
  const navigation = useNavigation();

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
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Multimodal Content</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Theme Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Others</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SettingScreen;
