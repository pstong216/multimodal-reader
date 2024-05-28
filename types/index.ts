export interface SettingsState {
  tempMusicTags: string[];
  tempImgTags: string[];
  // tempTags: string[];
  setTempImgTags: (tempTags: string[]) => void;
  setTempMusicTags: (tempTags: string[]) => void;
  book: Book;
  setBook: (book: Book) => void;
  styleOptions: styleOptions;

  selectedButton: string | null;
  fontColor: string;
  leading: number;
  margin: number;
  paraSpacing: number;
  backImg: string;
  turnOver: string;
  showToolBar: boolean;
  fontSize: number;
  fontFamily: string;
  background: string;
  brightness: number;
  language: string;
  fontSizeGlobal: number;
  fontFamilyGlobal: string;
  fontColorGlobal: string;
  leadingGlobal: number;
  marginGlobal: number;
  paraSpacingGlobal: number;
  backgroundGlobal: string;
  backImgGlobal: string;
  setFontSizeGlobal: (fontSizeGlobal: number) => void;
  setFontFamilyGlobal: (fontFamilyGlobal: string) => void;
  setFontColorGlobal: (fontColorGlobal: string) => void;
  setLeadingGlobal: (leadingGlobal: number) => void;
  setMarginGlobal: (marginGlobal: number) => void;
  setParaSpacingGlobal: (paraSpacingGlobal: number) => void;
  setBackgroundGlobal: (backgroundGlobal: string) => void;
  setBackImgGlobal: (backImgGlobal: string) => void;
  setLanguage: (language: string) => void;
  setFontColor: (fontColor: string) => void;
  setLeading: (leading: number) => void;
  setMargin: (margin: number) => void;
  setParaSpacing: (paraSpacing: number) => void;
  setBackImg: (backImg: string) => void;
  setTurnOver: (turnOver: string) => void;
  setSelectedButton: (selectedButton: string) => void;
  setShowToolBar: (showToolBar: boolean) => void;
  setFontSize: (fontSize: number) => void;
  setFontFamily: (fontFamily: string) => void;
  setBackground: (background: string) => void;
  setBrightness: (brightness: number) => void;
}

export type RootStackParamList = {
  Home: undefined; // 'Home' 屏幕不接受任何参数
  Setting: undefined; // 'Setting' 屏幕不接受任何参数
  Reading: { bookId: string }; // 'Reading' 屏幕接受一个参数 userId
};
export type styleOptions = {
  imgOptions: string[],
  musicOptions: string[]
}
export type readingDisplay = {//阅读时小功能
  // time: timestamp,
  currentPage: string,
  totalPage: string,
}

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
export interface TimeState {
  currentTime: string;
  updateCurrentTime: () => void;
}

export interface modalSettingState {
  globalTextSetting: boolean;
  modalVisible: boolean;
  setGlobalTextSetting: (globalTextSetting: boolean) => void;
  setModalVisible: (modalVisible: boolean) => void;
}