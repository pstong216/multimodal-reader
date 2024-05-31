import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import ReloadIcon from '../assets/reload.svg'; // Ensure this path is correct

const { width, height } = Dimensions.get('window');

const PicScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Image source={require('../assets/image-placeholder.png')} style={styles.image} onError={(e) => console.log('Image load error', e)} />
          <TouchableOpacity style={styles.reloadButton}>
            <ReloadIcon width={24} height={24} fill="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.quoteText} numberOfLines={8} ellipsizeMode="tail">
          “IT OCCURS TO ME, as I write this, that the foreword to this book might be better thought of as an afterword. Because when it comes to Paul Kalanithi, all sense of time is turned on its head. To begin with—or, maybe, to end with—I got to know Paul only after his death. (Bear with me.) I came to know him most intimately when he’d ceased to be.”
        </Text>
      </View>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
    padding: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, 
  },
  imagePlaceholder: {
    width: width * 0.6,
    height: height * 0.4,
    backgroundColor: '#C4C4C4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  reloadButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, 
    paddingBottom: 50, 
  },
  quoteText: {
    color: '#FFF',
    fontFamily: 'Times New Roman',
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 26,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    left: width / 2 - 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default PicScreen;
