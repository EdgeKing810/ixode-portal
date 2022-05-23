import React, { useCallback, useEffect, useState } from 'react';

import { useThemeStore } from '../stores/useThemeStore';
import { useConfigStore } from '../stores/useConfigStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { IconButton, Text } from '../components/Components';

export default function Configs() {
  const { theme } = useThemeStore((state) => state);
  const { configs } = useConfigStore((state) => state);

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [visibility, setVisibility] = useState([]);
  const [creatingConfig, setCreatingConfig] = useState('');
  const [editingConfig, setEditingConfig] = useState('');
  const [deletingConfig, setDeletingConfig] = useState('');

  console.log(visibility);

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

    return () => {
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
      <Navbar currentPage="configs" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="configs" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {configs.map((c) => (
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
                  }`}
                >
                  {c.value}
                </Text>

                <div className="w-full lg:w-1/4 flex">
                  <IconButton
                    title={
                      visibility.includes(c.name) ? 'Hide value' : 'Show value'
                    }
                    condition
                    noFill={!visibility.includes(c.name)}
                    theme={theme}
                    icon="eye"
                    className="mr-2 p-2 rounded-full w-10 h-10"
                    color="warning"
                    click={setVisibility((prev) => {
                      let updatedVisibility = [...prev];
                      if (updatedVisibility.includes(c.name)) {
                        updatedVisibility = updatedVisibility.filter(
                          (v) => v !== c.name
                        );
                      } else {
                        updatedVisibility = [...updatedVisibility, c.name];
                      }
                      return updatedVisibility;
                    })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
