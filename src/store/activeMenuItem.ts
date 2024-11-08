import { create } from "zustand"

interface MenuState {
  activeItem: string | null;
  setActiveItem: (title: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  activeItem: null,
  setActiveItem: (title: string) => set({ activeItem: title }),
}));
