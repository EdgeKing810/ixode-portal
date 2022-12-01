import create from 'zustand';

export interface ThemeStore {
  theme: 'light' | 'dark';
  setTheme: (value: string) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'dark',
  setTheme: (value: string) => {
    // @ts-ignore
    document.getElementById('body').className = `w-screen overflow-x-hidden ${
      value === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
    } duration-300 ease-in-out`;

    set({ theme: value === 'light' ? 'light' : 'dark' });
  },
}));
