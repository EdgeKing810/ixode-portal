import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useConfigStore } from '../stores/useConfigStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import MiscBulk from '../components/misc/MiscBulk';
import MiscIncludes from '../components/misc/MiscIncludes';

export default function Misc() {
  const { profile } = useUserProfileStore((state) => state);
  const { configs, updateConfig } = useConfigStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [uri, setUri] = useState('');
  const [name, setName] = useState('');
  const [testingMongoConnection, setTestingMongoConnection] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [smtpUsername, setSmtpUsername] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('');
  const [testingSmtp, setTestingSmtp] = useState(false);

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setTestingMongoConnection(false);
      setTestingSmtp(false);
    }

    // eslint-disable-next-line
  }, []);

  const findAndSet = (key: string, setter: (v: string) => void) => {
    const config = configs.find((c) => c.name === key);
    if (config && config.value && config.value.length > 0) {
      setter(config.value);
    }
  };

  useEffect(() => {
    findAndSet('MONGO_URI', setUri);
    findAndSet('DB_NAME', setName);

    findAndSet('SMTP_USERNAME', setSmtpUsername);
    findAndSet('SMTP_PASSWORD', setSmtpPassword);
    findAndSet('SMTP_HOST', setSmtpHost);
    findAndSet('SMTP_PORT', setSmtpPort);

    // eslint-disable-next-line
  }, [isLoading, configs]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(configs && configs.length > 0));

    if (
      profile &&
      profile.role.toUpperCase() !== 'ROOT' &&
      profile.role.toUpperCase() !== 'ADMIN'
    ) {
      alert.error('Not authorized to view Misc settings');
      navigate('/home');
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="misc" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="misc" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {isLoading ? (
              <Heading className="blink">Loading...</Heading>
            ) : (
              <div></div>
            )}

            <MiscBulk
              // configs={configs}
              // testingMongoConnection={testingMongoConnection}
              setTestingMongoConnection={setTestingMongoConnection}
              setTestingSmtp={setTestingSmtp}
              // isProcessing={isProcessing}
              // setIsProcessing={setIsProcessing}
              // uri={uri}
              // setUri={setUri}
              // name={name}
              // setName={setName}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <MiscIncludes
        API_URL={API_URL}
        profile={profile}
        testingMongoConnection={testingMongoConnection}
        setTestingMongoConnection={setTestingMongoConnection}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        uri={uri}
        setUri={setUri}
        name={name}
        setName={setName}
        smtpUsername={smtpUsername}
        setSmtpUsername={setSmtpUsername}
        smtpPassword={smtpPassword}
        setSmtpPassword={setSmtpPassword}
        smtpHost={smtpHost}
        setSmtpHost={setSmtpHost}
        smtpPort={smtpPort}
        setSmtpPort={setSmtpPort}
        testingSmtp={testingSmtp}
        setTestingSmtp={setTestingSmtp}
        updateConfig={updateConfig}
        alert={alert}
      />
    </div>
  );
}
