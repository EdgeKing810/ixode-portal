import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useMediaStore = create(
  combine(
    {
      media: [],
    },
    (set) => ({
      setMedia: (value) => set({ media: value }),

      addMedia: (id, name) =>
        set((state) => {
          let updatedMedia = [...state.media];
          return { media: [...updatedMedia, { id, name }] };
        }),

      updateMedia: (id, name) =>
        set((state) => {
          let updatedMedia = [...state.media];
          let found = false;
          updatedMedia = updatedMedia.map((m) => {
            let updated = { ...m };
            if (m.id === id) {
              updated.name = name;
              found = true;
            }
            return updated;
          });
          if (found) {
            return { media: [...updatedMedia] };
          } else {
            return { media: [...updatedMedia, { id, name }] };
          }
        }),

      removeMedia: (id) =>
        set((state) => {
          return {
            media: [...state.media.filter((m) => m.id !== id)],
          };
        }),
    })
  )
);
