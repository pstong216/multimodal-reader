// 解析文件中字符串读取到的字符串，并转化成json文件
import { v4 as uuidv4 } from "uuid";
import { Book } from "../types";
import * as FileSystem from "expo-file-system";
import * as Random from "expo-random";
import { Alert } from "react-native";

export async function parseText(text: string): Promise<void> {
  const randomBytes = await Random.getRandomBytesAsync(16);
  const bookId = uuidv4({
    random: [...randomBytes],
  });
  const book: Book = {
    id: bookId,
    name: "",
    author: "",
    chapters: [],
    multiModel: {
      bookId: bookId,
      imgStyle: [],
      musicStyle: [],
      imgs: [],
      musics: [],
    },
    lastRead: {
      chapter: 0,
      paragraph: 0,
    },
  };
  const lines: string[] = text.split("\n"); //按行分割
  let chapterCnt = -1;
  let paraCnt = -1;
  const nonBlankLines = lines.filter(
    (line) => line !== "" //去除空行
  );
  nonBlankLines.forEach((nonBlankLine) => {
    if (nonBlankLine.startsWith("# ")) {
      //book name
      book.name = nonBlankLine.slice(2);
    } else if (nonBlankLine.startsWith("* ")) {
      //author
      book.author = nonBlankLine.slice(2);
    } else if (nonBlankLine.startsWith("## ")) {
      //chapter name
      chapterCnt++;
      paraCnt = -1; //reset paragrph
      book.chapters.push({
        id: bookId + "-" + chapterCnt,
        name: nonBlankLine.slice(3),
        paragraphs: [],
      });
    } else if (nonBlankLine.startsWith("- ")) {
      //bgm
      book.chapters[chapterCnt].bgm = nonBlankLine.slice(2);
    } else {
      //paragraph
      paraCnt++;
      book.chapters[chapterCnt].paragraphs.push({
        bookId: bookId,
        id: bookId + "-" + chapterCnt + "-" + paraCnt,
        content: nonBlankLine,
        imgs: [],
        musics: [],
      });
    }
  });
  const jsonObj = JSON.stringify(book, null, 2);
  const path = FileSystem.documentDirectory + `${book.name}.json`;
  try {
    // 写入文件
    await FileSystem.writeAsStringAsync(path, jsonObj);
    Alert.alert("导入成功", "成功导入书籍：" + book.name);
    // console.log("文件已成功写入:", path);
  } catch (error) {
    console.error("写入文件时出错:", error);
  }
}
