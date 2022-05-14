import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';

import Navbar from '../components/Navbar';

export default function Home() {
  const { theme } = useThemeStore((state) => state);

  const { profile } = useUserProfileStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!profile || !profile.id) {
        navigate('/');
      }
    }, 1000);

    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar />
      <div
        className={`w-full p-2 lg:px-56 pt-20 lg:pt-24 flex flex-col items-center`}
      >
        <div>works</div>
      </div>
    </div>
  );
}
