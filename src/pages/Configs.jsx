import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useConfigStore } from '../stores/useConfigStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import {
  Button,
  Heading,
  IconButton,
  Input,
  Separator,
  SubHeading,
  Text,
} from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';
import PaginationList from '../wrappers/PaginationList';

import IncludeCreateConfig from './includes/configs/IncludeCreateConfig';
import IncludeEditConfig from './includes/configs/IncludeEditConfig';
import IncludeDeleteConfig from './includes/configs/IncludeDeleteConfig';

export default function Configs() {
  const { theme } = useThemeStore((state) => state);
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
  const [visibility, setVisibility] = useState([]);
  const [creatingConfig, setCreatingConfig] = useState(false);
  const [editingConfig, setEditingConfig] = useState(false);
  const [deletingConfig, setDeletingConfig] = useState(false);

  const escFunction = useCallback((event) => {
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

  const submitCreateConfig = () => {
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

  const submitUpdateConfig = () => {
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
      .post(
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

  const submitDeleteConfig = () => {
    const data = {
      uid: profile.uid,
      key: key,
    };

    alert.info('Processing...');
    setKey('');
    setValue('');
    setDeletingConfig(false);

    axios
      .post(
        `${API_URL}/config/delete`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Config Deleted!');

          removeConfig(data.key);
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <div
      className={`w-full lg:h-screen ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="configs" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="configs" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!configs || configs.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Configs Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            {((configs && configs.length > 0) || !isLoading) && (
              <Button
                color={theme === 'light' ? 'dark' : 'light'}
                theme={theme}
                className="p-3 w-full lg:w-1/3 justify-center uppercase"
                click={() => {
                  setCreatingConfig(true);
                  setKey('');
                  setValue('');
                }}
              >
                Create a new Config
              </Button>
            )}

            <Separator />

            {configs && configs.length > 0 && (
              <Input
                title="Filter Configs"
                placeholder="Filter Configs..."
                value={filter}
                theme={theme}
                change={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="mb-2"
              />
            )}

            {configs && configs.length > 0 && (
              <PaginationList
                theme={theme}
                limit={limit}
                amount={
                  configs
                    ? configs.filter(
                        (c) =>
                          filter.length <= 0 ||
                          c.name
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase())
                      ).length
                    : 0
                }
                setter={setCurrentPage}
                additional="mb-4 lg:mb-2"
              />
            )}

            {/* <input
              name={terms.filter_rooms}
              title={terms.filter_rooms}
              className={`w-full mb-2 outline-none rounded-lg p-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-100'
              } text-xs sm:text-base opacity-85 hover:opacity-95 focus:opacity-95 ${
                theme === 'light' ? 'bg-gray-300' : 'bg-gray-800'
              } font-spartan ${
                theme === 'light'
                  ? 'placeholder-gray-800'
                  : 'placeholder-gray-200'
              } bg-opacity-50`}
            /> */}

            {configs &&
              configs.length > 0 &&
              filter.length > 0 &&
              !configs.find((c) =>
                c.name.toLowerCase().includes(filter.trim().toLowerCase())
              ) && (
                <SubHeading color="error">
                  no config match the filter.
                </SubHeading>
              )}

            {configs
              .filter(
                (c) =>
                  filter.length <= 0 ||
                  c.name.toLowerCase().includes(filter.trim().toLowerCase())
              )
              .slice(currentPage * limit, limit + currentPage * limit)
              .map((c) => (
                <div
                  key={`l-${c.name}`}
                  className={`w-full rounded-lg lg:p-2 p-2 flex lg:flex-row flex-col lg:items-center ${
                    theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                  } duration-400 border-2 border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                >
                  <Text
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className="w-full lg:w-1/4"
                  >
                    {c.name}
                  </Text>

                  <Text
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className={`w-full p-1 my-2 lg:mx-2 rounded-lg ${
                      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                    } overflow-hidden`}
                  >
                    {visibility.includes(c.name)
                      ? c.value
                      : [...c.value].map(() => '*').join('')}
                  </Text>

                  <div className="w-full lg:w-1/4 flex">
                    <IconButton
                      title={
                        visibility.includes(c.name)
                          ? 'Hide value'
                          : 'Show value'
                      }
                      condition
                      noFill={!visibility.includes(c.name)}
                      theme={theme}
                      icon="eye"
                      className="mr-2 p-2 rounded-full w-10 h-10"
                      color="primary"
                      click={() =>
                        setVisibility((prev) => {
                          let updatedVisibility = [...prev];
                          if (updatedVisibility.includes(c.name)) {
                            updatedVisibility = updatedVisibility.filter(
                              (v) => v !== c.name
                            );
                          } else {
                            updatedVisibility = [...updatedVisibility, c.name];
                          }
                          return updatedVisibility;
                        })
                      }
                    />

                    <IconButton
                      title="Edit Config"
                      condition
                      noFill={key !== c.name}
                      theme={theme}
                      icon="pencil"
                      className="mr-2 p-2 rounded-full w-10 h-10"
                      color="primary"
                      click={() => {
                        setKey(c.name);
                        setValue(c.value);
                        setEditingConfig(true);
                      }}
                    />

                    <IconButton
                      title="Delete Config"
                      condition
                      noFill={key !== c.name}
                      theme={theme}
                      icon="delete-bin-2"
                      className="mr-2 p-2 rounded-full w-10 h-10"
                      color="primary"
                      click={() => {
                        setKey(c.name);
                        setDeletingConfig(true);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <IncludeCreateConfig
        isCreating={creatingConfig}
        setIsCreating={setCreatingConfig}
        keyname={key}
        setKey={setKey}
        value={value}
        setValue={setValue}
        submitValue={() => submitCreateConfig()}
        theme={theme}
      />

      <IncludeEditConfig
        isEditing={editingConfig}
        setIsEditing={setEditingConfig}
        value={value}
        setValue={setValue}
        submitValue={() => submitUpdateConfig()}
        theme={theme}
        keyname={key}
      />

      <IncludeDeleteConfig
        isActive={deletingConfig}
        setIsActive={setDeletingConfig}
        keyname={key}
        nextCallback={() => submitDeleteConfig()}
        theme={theme}
      />
    </div>
  );
}
