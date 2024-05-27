import { create } from 'zustand'
import { modalSettingState } from '../types'
const useStore = create<modalSettingState>((set) => ({
    modalVisible: false,
    globalTextSetting: false,
    setGlobalTextSetting: (globalTextSetting: boolean) => set(() => ({ globalTextSetting })),
    setModalVisible: (modalVisible: boolean) => set(() => ({ modalVisible })),
}));
export default useStore;