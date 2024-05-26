import { create } from 'zustand'
import { TimeState } from '../types'
const useStore = create<TimeState>((set) => ({
    currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    updateCurrentTime: () => set(() => ({
        currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }))
}));
export default useStore;