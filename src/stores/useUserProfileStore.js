import create from "zustand";
import { combine } from "zustand/middleware";

export const useUserProfileStore = create(
  combine({ profile: {} }, (set) => ({
    setUserProfile: (value) => set({ profile: value }),

    setProfileFirstName: (first_name) =>
      set((state) => {
        let updatedProfile = state.profile;
        updatedProfile.first_name = first_name;
        return { profile: updatedProfile };
      }),

    setProfileLastName: (last_name) =>
      set((state) => {
        let updatedProfile = state.profile;
        updatedProfile.last_name = last_name;
        return { profile: updatedProfile };
      }),

    setProfileUsername: (username) =>
      set((state) => {
        let updatedProfile = state.profile;
        updatedProfile.username = username;
        return { profile: updatedProfile };
      }),

    setProfileEmail: (email) =>
      set((state) => {
        let updatedProfile = state.profile;
        updatedProfile.email = email;
        return { profile: updatedProfile };
      }),

    setProfileRole: (role) =>
      set((state) => {
        let updatedProfile = state.profile;
        updatedProfile.role = role;
        return { profile: updatedProfile };
      }),
  }))
);
