// store/toastStore.ts
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  showToast: boolean
  message: string;
  type: ToastType;
  openToast: (message: string, type: ToastType) => void;
  closeToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  showToast: false,
  message: '',
  type: 'info',
  openToast: (message, type) => set({ message, type, showToast: true }),
  closeToast: () => set({showToast: false})
}));