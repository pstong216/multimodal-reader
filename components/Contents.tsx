import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Contents = () => (
  <View style={styles.overlayContent}>
    <Text style={styles.overlayTitle}>Book Name</Text>
    <ScrollView style={styles.overlayContentScroll}>
      {[...Array(20).keys()].map((i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.chapterTitle}>Chapter {i + 1}</Text>
          <Text style={styles.pageNumber}>12</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  overlayContent: {
    width: width,
    height: height * 0.7,
    backgroundColor: '#FFF',
    padding: 20,
  },
  overlayTitle: {
    fontFamily: 'Mulish',
    fontSize: width * 0.045, // 18px
    fontWeight: '700',
    marginBottom: 10,
  },
  overlayContentScroll: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  pageNumber: {
    color: '#667080',
    fontFamily: 'Mulish',
  },
  chapterTitle: {
    fontFamily: 'Mulish',
    fontSize: width * 0.045, // 18px
  },
});

export default Contents;
