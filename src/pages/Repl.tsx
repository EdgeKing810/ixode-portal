import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignores
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import ReplDisplay from '../components/repl/ReplDisplay';
import { IReplResult } from '../components/repl/repl.utils';

export default function Repl() {
  const { profile } = useUserProfileStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [command, setCommand] = useState<string>('');
  const [result, setResult] = useState<IReplResult | null>(null);

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 4000);

    if (!profile || profile.role.toUpperCase() !== 'ROOT') {
      alert.error('Not authorized to use the repl shell');
      navigate('/home');
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="repl" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="repl" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            <ReplDisplay
              API_URL={API_URL}
              profile={profile}
              command={command}
              setCommand={setCommand}
              result={result}
              setResult={setResult}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              alert={alert}
            />

            {isLoading ? (
              <Heading className="blink mt-2">Loading...</Heading>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
