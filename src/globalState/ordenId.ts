// globalState/id.ts
import { create } from 'zustand';

export interface ordenIdState { // Exporta la interfaz
  ordenId: number | null;
  setId: (id: number) => void;
  clearId: () => void;
}

export const useIdStore = create<ordenIdState>((set) => ({
  ordenId: 0,
  setId: (ordenId) => set({ ordenId }),
  clearId: () => set({ ordenId: null }),
}));