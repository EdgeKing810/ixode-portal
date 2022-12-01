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

import ConfigItem from '../components/configs/ConfigItem';
import ConfigsBulk from '../components/configs/ConfigsBulk';
import ConfigsIncludes from '../components/configs/ConfigsIncludes';

export default function Configs() {
  const { profile } = useUserProfileStore((state) => state);
  const { configs, addConfig, updateConfig, removeConfig } = useConfigStore(
    (state) => state
  );

  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [visibility, setVisibility] = useState<Array<string>>([]);
  const [creatingConfig, setCreatingConfig] = useState(false);
  const [editingConfig, setEditingConfig] = useState(false);
  const [deletingConfig, setDeletingConfig] = useState(false);

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setCreatingConfig(false);
      setEditingConfig(false);
      setDeletingConfig(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(configs && configs.length > 0));

    if (
      profile &&
      profile.role.toUpperCase() !== 'ROOT' &&
      profile.role.toUpperCase() !== 'ADMIN'
    ) {
      alert.error('Not authorized to view Configs');
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
      <Navbar currentPage="configs" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="configs" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!configs || configs.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Configs Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            <ConfigsBulk
              configs={configs}
              setCreatingConfig={setCreatingConfig}
              setKey={setKey}
              setValue={setValue}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              isLoading={isLoading}
            />

            {configs
              .filter(
                (c) =>
                  filter.length <= 0 ||
                  c.name.toLowerCase().includes(filter.trim().toLowerCase())
              )
              .slice(currentPage * limit, limit + currentPage * limit)
              .map((c) => (
                <ConfigItem
                  key={`cl-${c.name}`}
                  config={c}
                  visibility={visibility}
                  setVisibility={setVisibility}
                  setKeyName={setKey}
                  setValue={setValue}
                  setEditingConfig={setEditingConfig}
                  setDeletingConfig={setDeletingConfig}
                />
              ))}
          </div>
        </div>
      </div>

      <ConfigsIncludes
        API_URL={API_URL}
        profile={profile}
        creatingConfig={creatingConfig}
        setCreatingConfig={setCreatingConfig}
        keyname={key}
        setKey={setKey}
        value={value}
        setValue={setValue}
        configs={configs}
        addConfig={addConfig}
        editingConfig={editingConfig}
        setEditingConfig={setEditingConfig}
        updateConfig={updateConfig}
        deletingConfig={deletingConfig}
        setDeletingConfig={setDeletingConfig}
        removeConfig={removeConfig}
        alert={alert}
      />
    </div>
  );
}
