import create from 'zustand';

export interface IUserProfile {
  uid: string;
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  jwt: string;
}

export interface UserProfileStore {
  profile: IUserProfile;
  setUserProfile: (value: IUserProfile) => void;
  setProfileFirstName: (first_name: string) => void;
  setProfileLastName: (last_name: string) => void;
  setProfileUsername: (username: string) => void;
  setProfileEmail: (email: string) => void;
  setProfileRole: (role: string) => void;
}

export const useUserProfileStore = create<UserProfileStore>((set, get) => ({
  profile: {
    uid: '',
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    jwt: '',
  },
  setUserProfile: (value: IUserProfile) => {
    set({ profile: value });
  },
  setProfileFirstName: (first_name: string) => {
    let updatedProfile = get().profile;
    updatedProfile.first_name = first_name;
    set({ profile: updatedProfile });
  },
  setProfileLastName: (last_name: string) => {
    let updatedProfile = get().profile;
    updatedProfile.last_name = last_name;
    set({ profile: updatedProfile });
  },
  setProfileUsername: (username: string) => {
    let updatedProfile = get().profile;
    updatedProfile.username = username;
    set({ profile: updatedProfile });
  },
  setProfileEmail: (email: string) => {
    let updatedProfile = get().profile;
    updatedProfile.email = email;
    set({ profile: updatedProfile });
  },
  setProfileRole: (role: string) => {
    let updatedProfile = get().profile;
    updatedProfile.role = role;
    set({ profile: updatedProfile });
  },
}));
