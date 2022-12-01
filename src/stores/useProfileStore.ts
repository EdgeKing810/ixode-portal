import create from 'zustand';

export interface IProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
}

export interface ProfileStore {
  profiles: Array<IProfile>;
  setProfiles: (value: Array<IProfile>) => void;
  addProfile: (
    profileID: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    role: string
  ) => void;
  updateProfile: (profileID: string, update: IProfile) => void;
  removeProfile: (profileID: string) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: [],

  setProfiles: (value: Array<IProfile>) => {
    set({ profiles: value });
  },

  addProfile: (profileID, first_name, last_name, username, email, role) => {
    let updatedProfiles = get().profiles;
    set({
      profiles: [
        ...updatedProfiles,
        {
          id: profileID,
          first_name,
          last_name,
          username,
          email,
          role,
        },
      ],
    });
  },

  updateProfile: (profileID, update) => {
    let updatedProfiles = get().profiles;
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
      set({ profiles: [...updatedProfiles] });
    } else {
      set({
        profiles: [...updatedProfiles, { ...update }],
      });
    }
  },

  removeProfile: (profileID) => {
    set({
      profiles: [...get().profiles.filter((p) => p.id !== profileID)],
    });
  },
}));
