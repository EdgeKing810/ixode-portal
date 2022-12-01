import React from 'react';
import { IConfig } from '../../stores/useConfigStore';
import { Text } from '../Components';

export default function ConfigItem({
  config,
  visibility,
  setVisibility,
  setKeyName,
  setValue,
  setEditingConfig,
  setDeletingConfig,
}: {
  config: IConfig;
  visibility: Array<string>;
  setVisibility: React.Dispatch<React.SetStateAction<Array<string>>>;
  setKeyName: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setEditingConfig: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingConfig: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      key={`l-${config.name}`}
      className={`w-full rounded-lg lg:p-2 p-2 flex lg:flex-row flex-col lg:items-center bg-base-200 duration-300 border-2 border-primary bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Text nobreak className="w-full lg:w-1/4">
        {config.name}
      </Text>

      <Text
        nobreak
        className={`w-full p-1 my-2 lg:mx-2 rounded-lg bg-base-200 overflow-hidden`}
      >
        {visibility.includes(config.name)
          ? config.value
          : [...config.value].map(() => '*').join('')}
      </Text>

      <div className="w-full lg:w-1/4 flex lg:justify-end">
        <button
          className="btn btn-sm btn-secondary btn-outline btn-circle mr-2"
          title={visibility.includes(config.name) ? 'Hide value' : 'Show value'}
          onClick={() => {
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
            });
          }}
        >
          <i className={`ri-eye-line`} />
        </button>

        <button
          className="btn btn-sm btn-warning btn-outline btn-circle mr-2"
          title="Edit Config"
          onClick={() => {
            setKeyName(config.name);
            setValue(config.value);
            setEditingConfig(true);
          }}
        >
          <i className={`ri-pencil-line`} />
        </button>

        <button
          className="btn btn-sm btn-error btn-outline btn-circle mr-2"
          title="Delete Config"
          onClick={() => {
            setKeyName(config.name);
            setDeletingConfig(true);
          }}
        >
          <i className={`ri-delete-bin-2-line`} />
        </button>
      </div>
    </div>
  );
}
