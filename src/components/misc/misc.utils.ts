import axios from 'axios';
import { IUserProfile } from '../../stores/useUserProfileStore';

const submitConfig = (
  API_URL: string,
  profile: IUserProfile,
  key: string,
  value: string,
  updateConfig: (name: string, value: string) => void
) => {
  const data = {
    uid: profile.uid,
    key: key,
    value: value.trim().split(' ').join('_'),
  };

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
};

export const submitTestMongo = (
  API_URL: string,
  profile: IUserProfile,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
  uri: string,
  name: string,
  updateConfig: (name: string, value: string) => void,
  setTesting: React.Dispatch<React.SetStateAction<boolean>>,
  alert: any
) => {
  setIsProcessing(true);
  alert.info('Processing...');

  submitConfig(API_URL, profile, 'MONGO_URI', uri, updateConfig);
  submitConfig(API_URL, profile, 'DB_NAME', name, updateConfig);

  const testData = {
    uid: profile.uid,
    uri: uri.trim().split(' ').join('_'),
    name: name.trim().split(' ').join('_'),
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

export const submitTestSMTP = (
  API_URL: string,
  profile: IUserProfile,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
  smtpUsername: string,
  smtpPassword: string,
  smtpHost: string,
  smtpPort: string,
  updateConfig: (name: string, value: string) => void,
  setTesting: React.Dispatch<React.SetStateAction<boolean>>,
  alert: any
) => {
  setIsProcessing(true);
  alert.info('Processing...');

  submitConfig(API_URL, profile, 'SMTP_USERNAME', smtpUsername, updateConfig);
  submitConfig(API_URL, profile, 'SMTP_PASSWORD', smtpPassword, updateConfig);
  submitConfig(API_URL, profile, 'SMTP_HOST', smtpHost, updateConfig);
  submitConfig(API_URL, profile, 'SMTP_PORT', smtpPort, updateConfig);

  const testData = {
    uid: profile.uid,
    username: smtpUsername.trim().split(' ').join('_'),
    password: smtpPassword.trim().split(' ').join('_'),
    host: smtpHost.trim().split(' ').join('_'),
    port: smtpPort.trim().split(' ').join('_'),
  };

  axios
    .post(
      `${API_URL}/misc/test/smtp`,
      { ...testData },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      setIsProcessing(false);
      if (res.data.status === 200) {
        alert.success('Valid SMTP Credentials!');
        setTesting(false);
      } else {
        alert.error('Invalid SMTP Credentials');
        console.log(res.data);
      }
    })
    .catch(() => {
      setIsProcessing(false);
      alert.error('Invalid SMTP Credentials');
    });
};
