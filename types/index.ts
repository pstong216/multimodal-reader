export interface SettingsState {
  fontSize: number;
  fontFamily: string;
  background: string;
  setFontSize: (fontSize: number) => void;
  setFontFamily: (fontFamily: string) => void;
  setBackground: (background: string) => void;
}
