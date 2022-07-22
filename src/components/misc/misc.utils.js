import axios from 'axios';

export const submitTestMongo = (
  API_URL,
  profile,
  setIsProcessing,
  uri,
  name,
  updateConfig,
  setTesting,
  alert
) => {
  setIsProcessing(true);

  const uriData = {
    uid: profile.uid,
    key: 'MONGO_URI',
    value: uri.trim().split(' ').join('_'),
  };

  alert.info('Processing...');

  axios
    .post(
      `${API_URL}/config/add`,
      { ...uriData },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        updateConfig(uriData.key, uriData.value);
      } else {
        console.log(res.data);
      }
    });

  const nameData = {
    uid: profile.uid,
    key: 'DB_NAME',
    value: name.trim().split(' ').join('_'),
  };

  alert.info('Processing...');

  axios
    .post(
      `${API_URL}/config/add`,
      { ...nameData },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        updateConfig(nameData.key, nameData.value);
      } else {
        console.log(res.data);
      }
    });

  const testData = {
    uid: profile.uid,
    uri: uriData.value,
    name: nameData.value,
  };

  axios
    .post(
      `${API_URL}/misc/test/mongo`,
      { ...testData },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      setIsProcessing(false);
      if (res.data.status === 200) {
        alert.success('Mongo connection successful!');
        setTesting(false);
      } else {
        alert.error('Mongo connection failed');
        console.log(res.data);
      }
    })
    .catch(() => {
      setIsProcessing(false);
      alert.error('Mongo connection failed');
    });
};
