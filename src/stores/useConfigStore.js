import create from "zustand";
import { combine } from "zustand/middleware";

export const useConfigStore = create(
  combine(
    {
      configs: [],
    },
    (set) => ({
      setConfigs: (value) => set({ configs: value }),

      addConfig: (name, value) =>
        set((state) => {
          let updatedConfigs = [...state.configs];
          return { configs: [...updatedConfigs, { name, value }] };
        }),

      updateConfig: (name, value) =>
        set((state) => {
          let updatedConfigs = [...state.configs];
          let found = false;
          updatedConfigs = updatedConfigs.map((c) => {
            let updatedConfig = { ...c };
            if (c.name === name) {
              updatedConfig.value = { value };
              found = true;
            }
            return updatedConfig;
          });
          if (found) {
            return { configs: [...updatedConfigs] };
          } else {
            return { configs: [...updatedConfigs, { name, value }] };
          }
        }),

      removeConfig: (name) =>
        set((state) => {
          return {
            configs: [...state.configs.filter((c) => c.name !== name)],
          };
        }),
    })
  )
);
