import axios from 'axios';

export const submitCreateMedia = (
  API_URL,
  profile,
  id,
  setID,
  name,
  setName,
  media,
  setCreatingMedia,
  addMedia,
  alert
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
  API_URL,
  profile,
  id,
  setID,
  name,
  setName,
  setEditingMedia,
  updateMedia,
  alert
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
    .post(
      `${API_URL}/media/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Media Updated!');

        updateMedia(data.media_id, data.name);
      } else {
        console.log(res.data);
      }
    });
};

export const submitDeleteMedia = (
  API_URL,
  profile,
  id,
  setID,
  setName,
  setDeletingMedia,
  removeMedia,
  alert
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
    .post(
      `${API_URL}/media/delete`,
      { ...data },
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
