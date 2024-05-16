import { create } from 'zustand'
import { SettingsState } from '../types'
const useStore = create<SettingsState>((set) => ({
    fontSize: 14,
    fontFamily: 'Times New Roman',
    background: 'white',
    setFontSize: (fontSize: number) => set(() => ({ fontSize })),
    setFontFamily: (fontFamily: string) => set(() => ({ fontFamily })),
    setBackground: (background: string) => set(() => ({ background }))
}))
export default useStore;