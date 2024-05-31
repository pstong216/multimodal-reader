import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Book } from "../types";
import { useBookStore } from "../stores/bookStore";

const { width, height } = Dimensions.get("window");

function Contents(props: { bookId: string }) {
  const bookStore = useBookStore();
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  //获取当前打开的书
  useEffect(() => {
    setCurrentBook(
      bookStore.books.filter((book) => book.id === props.bookId)[0]
    );
  }, []);

  return (
    <View style={styles.overlayContent}>
      <Text style={styles.overlayTitle}>
        {currentBook ? currentBook.name : ""}
      </Text>
      <ScrollView style={styles.overlayContentScroll}>
        {(currentBook ? currentBook.chapters : []).map((i) => (
          <View key={i.id} style={styles.row}>
            <Text style={styles.chapterTitle}>{i.name}</Text>
            <Text style={styles.pageNumber}>{i.paragraphs.length}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContent: {
    width: width,
    height: height * 0.7,
    backgroundColor: "#FFF",
    padding: 20,
  },
  overlayTitle: {
    fontFamily: "Mulish",
    fontSize: width * 0.045, // 18px
    fontWeight: "700",
    marginBottom: 10,
  },
  overlayContentScroll: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  pageNumber: {
    color: "#667080",
    fontFamily: "Mulish",
  },
  chapterTitle: {
    fontFamily: "Mulish",
    fontSize: width * 0.045, // 18px
  },
});

export default Contents;
