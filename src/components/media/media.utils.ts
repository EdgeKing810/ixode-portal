import axios from 'axios';
import React from 'react';
import { IMedia } from '../../stores/useMediaStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitCreateMedia = (
  API_URL: string,
  profile: IUserProfile,
  id: string,
  setID: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  media: Array<IMedia>,
  setCreatingMedia: React.Dispatch<React.SetStateAction<boolean>>,
  addMedia: (id: string, name: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    media: {
      id: id,
      name: name,
    },
  };

  if (
    media.filter((m) => m.id.toLowerCase() === data.media.id.toLowerCase())
      .length > 0
  ) {
    alert.error('Media with the same id already exists');
    return;
  }

  alert.info('Processing...');
  setID('');
  setName('');
  setCreatingMedia(false);

  axios
    .post(
      `${API_URL}/media/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Media Created!');

        addMedia(data.media.id, data.media.name);
      } else {
        console.log(res.data);
      }
    });
};

export const submitUpdateMedia = (
  API_URL: string,
  profile: IUserProfile,
  id: string,
  setID: React.Dispatch<React.SetStateAction<string>>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setEditingMedia: React.Dispatch<React.SetStateAction<boolean>>,
  updateMedia: (id: string, name: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    media_id: id,
    change: 'NAME',
    data: name,
  };

  alert.info('Processing...');
  setID('');
  setName('');
  setEditingMedia(false);

  axios
    .patch(
      `${API_URL}/media/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Media Updated!');

        updateMedia(data.media_id, data.data);
      } else {
        console.log(res.data);
      }
    });
};

export const submitDeleteMedia = (
  API_URL: string,
  profile: IUserProfile,
  id: string,
  setID: React.Dispatch<React.SetStateAction<string>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDeletingMedia: React.Dispatch<React.SetStateAction<boolean>>,
  removeMedia: (id: string) => void,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    media_id: id,
  };

  alert.info('Processing...');
  setID('');
  setName('');
  setDeletingMedia(false);

  axios
    .delete(
      `${API_URL}/media/delete?uid=${data.uid}&media_id=${data.media_id}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Media Deleted!');

        removeMedia(data.media_id);
      } else {
        console.log(res.data);
      }
    });
};
