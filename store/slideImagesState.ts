import { create } from 'zustand';

interface SlideImagesState {
  images: { [key: string]: string };
  setImage: (slideId: string, imageUrl: string) => void;
}

export const useSlideImagesStore = create<SlideImagesState>((set) => ({
  images: {},
  setImage: (slideId, imageUrl) =>
    set((state) => ({
      images: {
        ...state.images,
        [slideId]: imageUrl,
      },
    })),
}));
