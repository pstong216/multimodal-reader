import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { BookCardProps } from "../types";
const bookImage = require("../assets/home/bookIcon.png");
const addImage = require("../assets/home/addIcon.png");
const { width, height } = Dimensions.get("window");

const BookCard: FC<BookCardProps> = ({
  bookName = "Book",
  progress = 26,
  cardType = "book",
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.bookCard}>
        <View style={styles.bookImageContainer}>
          <ImageBackground
            source={cardType === "book" ? bookImage : addImage}
            style={styles.ImageBackground}
          />
        </View>
        <View style={styles.bookTextContainer}>
          <Text
            style={[
              styles.bookTitle,
              cardType == "add" && { alignSelf: "center" },
            ]}
          >
            {bookName}
          </Text>
          <Text style={styles.bookProgress}>
            {cardType === "add" ? "" : progress + "%"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    // position: "relative",
    width: width * 0.27, // 调整宽度以适应屏幕大小
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bookImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    gap: 13,
    // position: "relative",
    width: "100%",
    height: height * 0.1, // 调整高度以适应比例
    marginBottom: height * 0.02, // 调整下边距
  },
  ImageBackground: {
    resizeMode: "contain",
    width: 24,
    height: 24,
  },
  bookTextContainer: {
    alignItems: "flex-start",
    display: "flex",
    flex: 0,
    flexDirection: "column",
    gap: 5,
    // paddingLeft: 5,
    position: "relative",
    width: "100%",
  },
  bookTitle: {
    color: "#000000",
    fontFamily: "Mulish-SemiBold",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
    // width: 50,
  },
  bookProgress: {
    color: "#00000099",
    fontFamily: "Mulish-Light",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 18,
    width: "100%",
  },
});

export default BookCard;
