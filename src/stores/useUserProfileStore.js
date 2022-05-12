import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useUserProfileStore = create(
  combine({ profile: {} }, (set) => ({
    setUserProfile: (value) => set({ profile: value }),
  }))
);
