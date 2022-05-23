import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useProfileStore = create(
  combine(
    {
      profiles: [],
    },
    (set) => ({
      setProfiles: (value) => set({ profiles: value }),

      addProfile: (profileID, first_name, last_name, username, email, role) =>
        set((state) => {
          let updatedProfiles = [...state.profiles];
          return {
            profiles: [
              ...updatedProfiles,
              { id: profileID, first_name, last_name, username, email, role },
            ],
          };
        }),

      updateProfile: (profileID, update) =>
        set((state) => {
          let updatedProfiles = [...state.profiles];
          let found = false;
          updatedProfiles = updatedProfiles.map((p) => {
            let updatedProfile = { ...p };
            if (p.id === profileID) {
              updatedProfile = { ...update };
              found = true;
            }
            return updatedProfile;
          });
          if (found) {
            return { profiles: [...updatedProfiles] };
          } else {
            return { profiles: [...updatedProfiles, { ...update }] };
          }
        }),

      removeProfile: (profileID) =>
        set((state) => {
          return {
            profiles: [...state.profiles.filter((p) => p.id !== profileID)],
          };
        }),
    })
  )
);
