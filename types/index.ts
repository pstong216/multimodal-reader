export interface SettingsState {
  fontSize: number;
  fontFamily: string;
  background: string;
  setFontSize: (fontSize: number) => void;
  setFontFamily: (fontFamily: string) => void;
  setBackground: (background: string) => void;
}

export type RootStackParamList = {
  Home: undefined; // 'Home' 屏幕不接受任何参数
  Setting: undefined; // 'Setting' 屏幕不接受任何参数
  Reading: { bookId: string }; // 'Reading' 屏幕接受一个参数 userId
};

export interface BookCardProps {
  bookName: string;
  progress: number;
  cardType: "book" | "add";
  onPress: () => void;
}

export interface ImgGc {
  id: string;
  url: string;
  //bookId:string,
  //chapterId:string,
  paraId: string;
}

export interface MusicGc {
  content: string; //如何放音乐？
  id: string;
  duration: number;
  paraId: string;
}

export interface MultiModel {
  bookId: string; //每本书对应一个多模态设置
  //musicState:boolean,
  //imgState:boolean,
  imgStyle: string[];
  musicStyle: string[];
  imgs: ImgGc[];
  musics: MusicGc[];
}

export interface Paragraph {
  bookId: string;
  id: string;
  content: string;
  imgs: ImgGc[];
  musics: MusicGc[];
}

export interface Chapter {
  id: string;
  name: string;
  paragraphs: Paragraph[];
  bgm?: string; //bgm文字描述
  music?: MusicGc; // 章节bgm
}

export interface Book {
  id: string;
  name: string;
  author: string;
  cover?: string;
  chapters: Chapter[];
  //catagories: string[]; //存每个章节的名字
  multiModel: MultiModel;
  lastRead: {
    //存当前读到的chapter
    chapter: number;
    paragraph: number;
  };
  theme?: {
    bgImg: string;
    fontFamily: string;
    fontColor: string;
  };
}

export interface Explaination {
  originWord: string; //原单词
  translatedWord: string; //单词 in language (global setting)
  meaning: string; //当前释义 in language (global setting)
}
