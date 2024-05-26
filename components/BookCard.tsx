import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
type BookCardProps = {
  bookName: string;
  progress: string;
  iconUri: string;

};
const { width, height } = Dimensions.get('window');

const BookCard: React.FC<BookCardProps> = ({ bookName, progress, iconUri }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Reading')}>
      <View style={styles.bookCard}>
        <View style={styles.bookImageContainer}>
          <SvgUri width="100%" height="100%" uri={iconUri} />
        </View>
        <View style={styles.bookTextContainer}>
          <Text style={styles.bookTitle}>{bookName}</Text>
          {progress !== "" && <Text style={styles.bookProgress}>{progress}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
    width: width * 0.27, // 调整宽度以适应屏幕大小
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bookImageContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: 0,
    gap: 13,
    position: 'relative',
    height: height * 0.1, // 调整高度以适应比例
    marginBottom: height * 0.02, // 调整下边距
    width: '100%',
  },
  bookTextContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flex: 0,
    flexDirection: 'column',
    gap: 5,
    paddingLeft: 5,
    position: 'relative',
    width: '100%',
  },
  bookTitle: {
    color: '#000000',
    fontFamily: 'Mulish-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },
  bookProgress: {
    color: '#00000099',
    fontFamily: 'Mulish-Light',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 18,
    width: '100%',
  },
});

export default BookCard;
