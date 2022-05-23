import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useThemeStore = create(
  combine(
    {
      theme: 'dark',
    },
    (set) => ({
      setTheme: (value) =>
        set(() => {
          document.getElementById(
            'body'
          ).className = `w-screen overflow-x-hidden ${
            value === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
          } duration-400 ease-in-out`;

          return { theme: value };
        }),
    })
  )
);
