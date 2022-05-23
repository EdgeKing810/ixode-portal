import React, { useEffect, useState, useContext } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useThemeStore } from '../stores/useThemeStore';
import { automaticLogin, fetchCurrentProfile } from '../utils/fetcher';
import { LocalContext } from './LocalContext';

import logo from '../assets/images/banner_purple.png';

export default function LoginWrapper({ children, onlyLoad }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [didOnce, setDidOnce] = useState(false);

  const alert = useAlert();
  const navigate = useNavigate();

  const { profile, setUserProfile } = useUserProfileStore((state) => state);
  const { theme, setTheme } = useThemeStore((state) => state);
  const { API_URL } = useContext(LocalContext);

  useEffect(() => {
    async function fetchLocal() {
      if (localStorage.getItem('_userData')) {
        if (profile.jwt !== undefined && profile.jwt) {
          setLoggedIn(true);
          return;
        }

        const { uid, jwt, theme } = JSON.parse(
          localStorage.getItem('_userData')
        );
        setTheme(theme ? theme : 'dark');

        const data = await fetchCurrentProfile(API_URL, uid, jwt);

        if (data.status === 200) {
          setUserProfile({ ...data.user, uid: uid, jwt: jwt });
          setLoggedIn(true);
          await automaticLogin(API_URL, uid, jwt);
          alert.success('Login Successful!');
          setDidOnce(true);
          // navigate('/home');
        } else {
          console.log(data);
          // localStorage.clear();
          alert.error('Login Failed');
          navigate('/');
          setDidOnce(true);
        }
      } else {
        alert.error('Login Failed');
        // localStorage.clear();
        navigate('/');
        setDidOnce(true);
      }
    }

    setTimeout(() => {
      if (!onlyLoad) {
        fetchLocal();
      }
    }, 500);

    // eslint-disable-next-line
  }, []);

  const temporaryContainer = (
    <div
      className={`h-screen w-screen ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } overflow-hidden`}
    >
      <div className="overflow-hidden w-full h-full rounded-lg opacity-95 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center lg:w-1/5 mb-8 lg:mb-20">
          <img
            src={logo}
            alt="main-logo"
            className="object-fill flex items-center justify-center w-2/3 lg:w-11/12 opacity-90"
          />
        </div>

        <div className="text-main-primary w-full text-xl lg:text-2xl font-semibold font-gilroy opacity-80 text-center px-4 blink">
          Trying to automatically log you in...
        </div>
      </div>
    </div>
  );

  return (!loggedIn || onlyLoad) && !didOnce ? (
    temporaryContainer
  ) : (
    <div
      className={`${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } duration-400 ease-in-out`}
    >
      {children}
    </div>
  );
}
