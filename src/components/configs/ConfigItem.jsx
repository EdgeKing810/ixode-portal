import React from 'react';
import { IconButton, Text } from '../Components';

export default function ConfigItem({
  config,
  theme,
  visibility,
  setVisibility,
  keyname,
  setKeyName,
  setValue,
  setEditingConfig,
  setDeletingConfig,
}) {
  return (
    <div
      key={`l-${config.name}`}
      className={`w-full rounded-lg lg:p-2 p-2 flex lg:flex-row flex-col lg:items-center ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className="w-full lg:w-1/4"
      >
        {config.name}
      </Text>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full p-1 my-2 lg:mx-2 rounded-lg ${
          theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
        } overflow-hidden`}
      >
        {visibility.includes(config.name)
          ? config.value
          : [...config.value].map(() => '*').join('')}
      </Text>

      <div className="w-full lg:w-1/4 flex">
        <IconButton
          title={visibility.includes(config.name) ? 'Hide value' : 'Show value'}
          condition
          noFill={!visibility.includes(config.name)}
          theme={theme}
          icon="eye"
          className="mr-2 p-2 rounded-full w-10 h-10"
          color="primary"
          click={() =>
            setVisibility((prev) => {
              let updatedVisibility = [...prev];
              if (updatedVisibility.includes(config.name)) {
                updatedVisibility = updatedVisibility.filter(
                  (v) => v !== config.name
                );
              } else {
                updatedVisibility = [...updatedVisibility, config.name];
              }
              return updatedVisibility;
            })
          }
        />

        <IconButton
          title="Edit Config"
          condition
          noFill={keyname !== config.name}
          theme={theme}
          icon="pencil"
          className="mr-2 p-2 rounded-full w-10 h-10"
          color="primary"
          click={() => {
            setKeyName(config.name);
            setValue(config.value);
            setEditingConfig(true);
          }}
        />

        <IconButton
          title="Delete Config"
          condition
          noFill={keyname !== config.name}
          theme={theme}
          icon="delete-bin-2"
          className="mr-2 p-2 rounded-full w-10 h-10"
          color="primary"
          click={() => {
            setKeyName(config.name);
            setDeletingConfig(true);
          }}
        />
      </div>
    </div>
  );
}
