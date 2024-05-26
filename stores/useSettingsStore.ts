import { create } from 'zustand'
import { SettingsState } from '../types'
const useStore = create<SettingsState>((set) => ({
    language: 'english',
    showToolBar: false,
    fontSize: 1,
    fontFamily: 'Times New Roman',
    fontColor: 'black',
    leading: 1,//行间距
    margin: 1,//边距
    paraSpacing: 1,//行距
    background: 'white',
    backImg: '',
    brightness: 0,
    selectedButton: null,
    turnOver: 'turnOver',
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