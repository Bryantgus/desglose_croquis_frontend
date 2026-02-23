// globalState/id.ts
import { create } from 'zustand';

export interface IdState { // Exporta la interfaz
  id: number | null;
  setId: (id: number) => void;
  clearId: () => void;
}

export const useIdStore = create<IdState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
  clearId: () => set({ id: null }),
}));