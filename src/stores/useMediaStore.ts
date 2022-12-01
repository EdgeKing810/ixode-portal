import create from 'zustand';

export interface IMedia {
  id: string;
  name: string;
}

export interface MediaStore {
  media: Array<IMedia>;
  setMedia: (value: Array<IMedia>) => void;
  addMedia: (id: string, name: string) => void;
  updateMedia: (id: string, name: string) => void;
  removeMedia: (id: string) => void;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  media: [],

  setMedia: (value) => {
    set({ media: value });
  },

  addMedia: (id, name) => {
    let updatedMedia = [...get().media, { id, name }];
    set({ media: updatedMedia });
  },

  updateMedia: (id, name) => {
    let updatedMedia = [...get().media];
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
      set({ media: updatedMedia });
    } else {
      set({ media: [...updatedMedia, { id, name }] });
    }
  },

  removeMedia: (id) => {
    let updatedMedia = get().media.filter((m) => m.id !== id);
    set({ media: updatedMedia });
  },
}));
