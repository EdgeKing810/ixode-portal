import axios from 'axios';
import { IConfig } from '../../stores/useConfigStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitCreateConfig = (
  API_URL: string,
  profile: IUserProfile,
  key: string,
  setKey: React.Dispatch<React.SetStateAction<string>>,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  configs: Array<IConfig>,
  setCreatingConfig: React.Dispatch<React.SetStateAction<boolean>>,
  addConfig: (key: string, value: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    key: key.trim().split(' ').join('_'),
    value: value.trim().split(' ').join('_'),
  };

  if (
    configs.filter((c) => c.name.toLowerCase() === data.key.toLowerCase())
      .length > 0
  ) {
    alert.error('Config with the same key already exists');
    return;
  }

  alert.info('Processing...');
  setKey('');
  setValue('');
  setCreatingConfig(false);

  axios
    .post(
      `${API_URL}/config/add`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Config Created!');

        addConfig(data.key, data.value);
      } else {
        console.log(res.data);
      }
    });
};

export const submitUpdateConfig = (
  API_URL: string,
  profile: IUserProfile,
  key: string,
  setKey: React.Dispatch<React.SetStateAction<string>>,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setEditingConfig: React.Dispatch<React.SetStateAction<boolean>>,
  updateConfig: (key: string, value: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    key: key,
    value: value.trim().split(' ').join('_'),
  };

  alert.info('Processing...');
  setKey('');
  setValue('');
  setEditingConfig(false);

  axios
    .patch(
      `${API_URL}/config/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Config Updated!');

        updateConfig(data.key, data.value);
      } else {
        console.log(res.data);
      }
    });
};

export const submitDeleteConfig = (
  API_URL: string,
  profile: IUserProfile,
  key: string,
  setKey: React.Dispatch<React.SetStateAction<string>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setDeletingConfig: React.Dispatch<React.SetStateAction<boolean>>,
  removeConfig: (config_id: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    key: key,
  };

  alert.info('Processing...');
  setKey('');
  setValue('');
  setDeletingConfig(false);

  axios
    .delete(`${API_URL}/config/delete?uid=${profile.uid}&key=${key}`, {
      headers: { Authorization: `Bearer ${profile.jwt}` },
    })
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Config Deleted!');

        removeConfig(data.key);
      } else {
        console.log(res.data);
      }
    });
};
