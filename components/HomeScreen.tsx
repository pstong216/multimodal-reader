// HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SettingIcon from "../assets/home/setting.svg";
import SearchBar from "../assets/home/search.svg";
import EditIcon from "../assets/home/edit.svg";
import BookCard from "./BookCard"; // Assuming BookCard component is in the same directory
import { StackNavigationProp } from "@react-navigation/stack";
import { Book, RootStackParamList } from "../types";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { parseText } from "../utils/textParser";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();

  const handleSettingPress = () => {
    navigation.navigate("Setting");
  };

  useEffect(() => {
    readBooks();
  }, []);
  // 读取 json 书籍文件
  const readBooks = async () => {
    try {
      const path = FileSystem.documentDirectory;
      const files = await FileSystem.readDirectoryAsync(path!);
      const newBooks: Book[] = [];
      for (const bookFile of files.filter((file) => file.endsWith(".json"))) {
        const uri = FileSystem.documentDirectory + bookFile;
        const fileContent = await FileSystem.readAsStringAsync(uri);
        const bookObj: Book = JSON.parse(fileContent);
        newBooks.push(bookObj);
      }
      setBooks([...newBooks]);
    } catch (err) {
      Alert.alert("Error", String(err));
    }
  };
  // 导入并解析文本文件
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "text/*", // 指定文件类型
      });
      if (!res.canceled) {
        const fileContent = await FileSystem.readAsStringAsync(
          res.assets[0].uri
        );
        await parseText(fileContent);
      }
      //刷新书籍
      await readBooks();
    } catch (err) {
      Alert.alert("Error", String(err));
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text>{fileContent}</Text> */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.settingIcon}
            onPress={handleSettingPress}
          >
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
          {books.map((book) => {
            return (
              <BookCard
                key={book.id}
                bookName={book.name}
                progress={book.lastRead.chapter / book.chapters.length}
                cardType="book"
                onPress={() =>
                  navigation.navigate("Reading", { bookId: book.id })
                }
              />
            );
          })}
          <BookCard
            bookName="Add"
            progress={0}
            cardType="add"
            onPress={pickDocument}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flexGrow: 1,
    paddingTop: height * 0.04, // 5% of screen height
    paddingBottom: height * 0.06, // 5% of screen height
    paddingHorizontal: width * 0.06, // 5% of screen width
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: height * 0.02, // 2% of screen height
  },
  settingIcon: {
    width: 20,
    height: 13.998,
  },
  searchBarPlaceholder: {
    width: "100%", // 100% of the screen width minus padding
    height: 49,
    backgroundColor: "#EEF1F4",
    borderRadius: 15,
    flexShrink: 0,
    marginBottom: height * 0.02, // 2% of screen height
  },
  bookshelfTitleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%", // 100% of the screen width minus padding
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02, // 2% of screen height
  },
  bookshelfTitle: {
    color: "#000",
    fontFamily: "Mulish",
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: "700",
    lineHeight: 50,
  },
  booksContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%", // 100% of the screen width minus padding
    justifyContent: "flex-start",
    columnGap: 13,
    rowGap: 20,
    alignItems: "flex-start",
  },
});

export default HomeScreen;
