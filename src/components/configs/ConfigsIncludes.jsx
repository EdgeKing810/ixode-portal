import React from 'react';

import IncludeCreateConfig from '../../pages/includes/configs/IncludeCreateConfig';
import IncludeDeleteConfig from '../../pages/includes/configs/IncludeDeleteConfig';
import IncludeEditConfig from '../../pages/includes/configs/IncludeEditConfig';

import {
  submitCreateConfig,
  submitDeleteConfig,
  submitUpdateConfig,
} from './config.utils';

export default function ConfigsIncludes({
  API_URL,
  profile,
  creatingConfig,
  setCreatingConfig,
  keyname,
  setKey,
  value,
  setValue,
  configs,
  addConfig,
  editingConfig,
  setEditingConfig,
  updateConfig,
  deletingConfig,
  setDeletingConfig,
  removeConfig,
  alert,
}) {
  return (
    <div className="w-full">
      <IncludeCreateConfig
        isCreating={creatingConfig}
        setIsCreating={setCreatingConfig}
        keyname={keyname}
        setKey={setKey}
        value={value}
        setValue={setValue}
        submitValue={() =>
          submitCreateConfig(
            API_URL,
            profile,
            keyname,
            setKey,
            value,
            setValue,
            configs,
            setCreatingConfig,
            addConfig,
            alert
          )
        }
      />

      <IncludeEditConfig
        isEditing={editingConfig}
        setIsEditing={setEditingConfig}
        value={value}
        setValue={setValue}
        submitValue={() =>
          submitUpdateConfig(
            API_URL,
            profile,
            keyname,
            setKey,
            value,
            setValue,
            setEditingConfig,
            updateConfig,
            alert
          )
        }
        keyname={keyname}
      />

      <IncludeDeleteConfig
        isActive={deletingConfig}
        setIsActive={setDeletingConfig}
        keyname={keyname}
        nextCallback={() =>
          submitDeleteConfig(
            API_URL,
            profile,
            keyname,
            setKey,
            setValue,
            setDeletingConfig,
            removeConfig,
            alert
          )
        }
      />
    </div>
  );
}
