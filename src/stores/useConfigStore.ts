import create from 'zustand';

export interface IConfig {
  name: string;
  value: string;
}

export interface ConfigStore {
  configs: Array<IConfig>;
  setConfigs: (value: Array<IConfig>) => void;
  addConfig: (name: string, value: string) => void;
  updateConfig: (name: string, value: string) => void;
  removeConfig: (name: string) => void;
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  configs: [],

  setConfigs: (value: Array<IConfig>) => {
    set({ configs: value });
  },

  addConfig: (name, value) => {
    let updatedConfigs = [...get().configs, { name, value }];
    set({ configs: updatedConfigs });
  },

  updateConfig: (name, value) => {
    let updatedConfigs = [...get().configs];
    let found = false;
    updatedConfigs = updatedConfigs.map((c) => {
      let updatedConfig = { ...c };
      if (c.name === name) {
        updatedConfig.value = value;
        found = true;
      }
      return updatedConfig;
    });

    if (found) {
      set({ configs: updatedConfigs });
    } else {
      set({ configs: [...updatedConfigs, { name, value }] });
    }
  },

  removeConfig: (name) => {
    let updatedConfigs = get().configs.filter((c) => c.name !== name);
    set({ configs: updatedConfigs });
  },
}));
