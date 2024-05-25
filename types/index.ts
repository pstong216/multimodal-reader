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
