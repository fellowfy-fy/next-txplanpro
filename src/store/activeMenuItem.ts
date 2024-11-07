import { create } from "zustand"

interface MenuState {
  activeItem: string;
  setActiveItem: (title: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  activeItem: "Dashboard",
  setActiveItem: (title: string) => set({ activeItem: title }),
}));
