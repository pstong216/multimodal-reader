export interface SettingsState {
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

export interface TimeState {
  currentTime: string;
  updateCurrentTime: () => void;
}