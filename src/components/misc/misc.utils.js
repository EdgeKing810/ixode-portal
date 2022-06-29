import axios from 'axios';

export const submitTestMongo = (
  API_URL,
  profile,
  setIsProcessing,
  uri,
  updateConfig,
  setTesting,
  alert
) => {
  setIsProcessing(true);

  const data = {
    uid: profile.uid,
    key: 'MONGO_URI',
    value: uri.trim().split(' ').join('_'),
  };

  alert.info('Processing...');

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
        updateConfig(data.key, data.value);
      } else {
        console.log(res.data);
      }
    });

  axios
    .post(
      `${API_URL}/misc/test/mongo`,
      { uri: uri },
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
