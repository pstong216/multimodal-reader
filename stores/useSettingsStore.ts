import { create } from 'zustand'
import { SettingsState } from '../types'
const useStore = create<SettingsState>((set) => ({
    language: 'english',
    showToolBar: false,
    fontSize: 1,
    fontFamily: 'Times New Roman',
    fontColor: '#000',
    leading: 1,//行间距
    margin: 1,//边距
    paraSpacing: 1,//行距
    background: '#F8F8F8',
    backImg: '',
    brightness: 0,
    selectedButton: null,
    turnOver: 'turnOver',

    fontSizeGlobal: 1,
    fontFamilyGlobal: 'Times New Roman',
    fontColorGlobal: '#000',
    leadingGlobal: 1,//行间距
    marginGlobal: 1,//边距
    paraSpacingGlobal: 1,//行距
    backgroundGlobal: '#F8F8F8',
    backImgGlobal: '',
    setFontSizeGlobal: (fontSizeGlobal: number) => set(() => ({ fontSizeGlobal })),
    setFontFamilyGlobal: (fontFamilyGlobal: string) => set(() => ({ fontFamilyGlobal })),
    setFontColorGlobal: (fontColorGlobal: string) => set(() => ({ fontColorGlobal })),
    setLeadingGlobal: (leadingGlobal: number) => set(() => ({ leadingGlobal })),
    setMarginGlobal: (marginGlobal: number) => set(() => ({ marginGlobal })),
    setParaSpacingGlobal: (paraSpacingGlobal: number) => set(() => ({ paraSpacingGlobal })),
    setBackgroundGlobal: (backgroundGlobal: string) => set(() => ({ backgroundGlobal })),
    setBackImgGlobal: (backImgGlobal: string) => set(() => ({ backImgGlobal })),


    setSelectedButton: (selectedButton: string) => set(() => ({ selectedButton })),
    setShowToolBar: (showToolBar: boolean) => set(() => ({ showToolBar })),
    setFontSize: (fontSize: number) => set(() => ({ fontSize })),
    setFontFamily: (fontFamily: string) => set(() => ({ fontFamily })),
    setBackground: (background: string) => set(() => ({ background })),
    setBrightness: (brightness: number) => set(() => ({ brightness })),
    setLeading: (leading: number) => set(() => ({ leading })),
    setMargin: (margin: number) => set(() => ({ margin })),
    setParaSpacing: (paraSpacing: number) => set(() => ({ paraSpacing })),
    setFontColor: (fontColor: string) => set(() => ({ fontColor })),
    setBackImg: (backImg: string) => set(() => ({ backImg })),
    setTurnOver: (turnOver: string) => set(() => ({ turnOver })),
    setLanguage: (language: string) => set(() => ({ language })),

}))
export default useStore;