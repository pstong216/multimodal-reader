// HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingIcon from '../assets/home/setting.svg';
import SearchBar from '../assets/home/search.svg';
import EditIcon from '../assets/home/edit.svg';
import BookCard from './BookCard'; // Assuming BookCard component is in the same directory

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSettingPress = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.settingIcon} onPress={handleSettingPress}>
            <SettingIcon width={20} height={13.998} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarPlaceholder}>
          <SearchBar width="100%" height="100%" />
        </View>
        <View style={styles.bookshelfTitleContainer}>
          <Text style={styles.bookshelfTitle}>Bookshelf</Text>
          <EditIcon width={20.951} height={20.183} />
        </View>
        <View style={styles.booksContainer}>
          <BookCard bookName="Book 1" progress="26%" iconUri="assets/home/Image placeholder.svg" />
          <BookCard bookName="Book 2" progress="26%" iconUri="assets/home/Image placeholder.svg" />
          <BookCard bookName="Add" progress=" " iconUri="assets/home/add.svg" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flexGrow: 1,
    paddingTop: height * 0.04, // 5% of screen height
    paddingBottom: height * 0.06, // 5% of screen height
    paddingHorizontal: width * 0.06, // 5% of screen width
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: height * 0.02, // 2% of screen height
  },
  settingIcon: {
    width: 20,
    height: 13.998,
  },
  searchBarPlaceholder: {
    width: '100%', // 100% of the screen width minus padding
    height: 49,
    backgroundColor: '#EEF1F4',
    borderRadius: 15,
    flexShrink: 0,
    marginBottom: height * 0.02, // 2% of screen height
  },
  bookshelfTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%', // 100% of the screen width minus padding
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  bookshelfTitle: {
    color: '#000',
    fontFamily: 'Mulish',
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: '700',
    lineHeight: 50,
  },
  booksContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%', // 100% of the screen width minus padding
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export default HomeScreen;
