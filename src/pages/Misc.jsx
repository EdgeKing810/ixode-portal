import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useConfigStore } from '../stores/useConfigStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import MiscBulk from '../components/misc/MiscBulk';
import MiscIncludes from '../components/misc/MiscIncludes';

export default function Misc() {
  const { theme } = useThemeStore((state) => state);
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

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setTestingMongoConnection(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let foundConfigURI = configs.filter((c) => c.name === 'MONGO_URI');
    if (foundConfigURI.length > 0) {
      setUri(foundConfigURI[0].value);
    }
    let foundConfigName = configs.filter((c) => c.name === 'DB_NAME');
    if (foundConfigName.length > 0) {
      setName(foundConfigName[0].value);
    }
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
      className={`w-full lg:h-screen ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="misc" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="misc" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {isLoading ? (
              <Heading className="blink">Loading...</Heading>
            ) : (
              <div></div>
            )}

            <MiscBulk
              configs={configs}
              testingMongoConnection={testingMongoConnection}
              setTestingMongoConnection={setTestingMongoConnection}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              uri={uri}
              setUri={setUri}
              name={name}
              setName={setName}
              isLoading={isLoading}
              theme={theme}
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
        updateConfig={updateConfig}
        theme={theme}
        alert={alert}
      />
    </div>
  );
}
