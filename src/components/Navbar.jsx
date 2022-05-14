import React from 'react';
import { Link } from 'react-router-dom';

import banner from '../assets/images/banner_purple.png';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useThemeStore } from '../stores/useThemeStore';

export default function Navbar({ width }) {
  const { profile } = useUserProfileStore((state) => state);
  const { theme, setTheme } = useThemeStore((state) => state);

  const changeTheme = () => {
    let newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    localStorage.setItem(
      '_userData',
      JSON.stringify({
        uid: profile.uid,
        jwt: profile.jwt,
        theme: newTheme,
      })
    );
  };

  return (
    <>
      <div
        className={`w-full fixed z-50 h-16 lg:h-20 ${
          theme === 'light' ? 'bg-white' : 'bg-main-900'
        } py-2 lg:py-4 duration-400 ease-in-out lg:overflow-y-hidden`}
      >
        <div className="flex w-full h-full justify-between items-center px-2 lg:px-4">
          <div className="w-2/5 sm:w-1/5 h-full flex justify-start items-center mr-4 lg:mr-0">
            <Link className="h-full flex justify-start items-center" to="/">
              <img
                src={banner}
                alt="banner"
                className="h-4/5 sm:h-3/5 lg:h-4/5 object-scale-down"
              />
            </Link>
          </div>

          <div
            className={`sm:w-1/2 sm:flex justify-around h-full rounded-lg p-1 bg-main-300 hidden ease-in-out duration-400`}
          ></div>

          <div className="sm:w-1/5 h-full flex justify-end items-center relative">
            <button
              title={`${theme === 'light' ? 'Dark' : 'Light'}`}
              className={`ml-1 lg:ml-2 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 outline-none border-2 lg:border-4 border-transparent hover:border-main-300 focus:border-main-300 lg:flex justify-center items-center rounded-full ri-${
                theme === 'light' ? 'sun' : 'moon'
              }-line text-sm lg:text-xl ${
                theme === 'light'
                  ? 'bg-main-light text-main-dark'
                  : 'bg-main-dark text-main-light'
              } hidden ease-in-out duration-400`}
              onClick={() => changeTheme()}
            />
          </div>
        </div>

        <div className="w-full mt-2">
          <div
            className="pt-1 bg-main-300"
            style={{ width: `${width !== undefined ? width : 100}%` }}
          ></div>
        </div>
      </div>

      <div
        className={`py-3 lg:hidden bottom-0 fixed z-30 w-screen flex justify-around border-t-2 border-main-300 ${
          theme === 'light' ? 'bg-main-100' : 'bg-main-900'
        } ease-in-out duration-400`}
      >
        <Link
          to="/"
          className={`text-center text-lg px-3 py-2 border-2 border-transparent flex justify-center items-center ${
            theme === 'light'
              ? 'bg-main-light text-main-dark'
              : 'bg-main-dark text-main-light'
          } hover:border-main-300 focus:border-main-300 font-gilroy rounded-full ease-in-out duration-400`}
        >
          <div className={`h-full flex items-center ri-home-2-line`}></div>
        </Link>

        <Link
          to={profile && profile.uid ? `/u/${profile.uid}` : '/login'}
          className={`text-center text-lg px-3 py-2 border-2 border-transparent flex justify-center items-center ${
            theme === 'light'
              ? 'bg-main-light text-main-dark'
              : 'bg-main-dark text-main-light'
          } hover:border-main-300 focus:border-main-300 font-gilroy rounded-full ease-in-out duration-400`}
        >
          <div className={`h-full flex items-center ri-user-3-line`}></div>
        </Link>

        {profile && profile.uid && (
          <Link
            to="/settings"
            className={`text-center text-lg px-3 py-2 border-2 border-transparent flex justify-center items-center ${
              theme === 'light'
                ? 'bg-main-light text-main-dark'
                : 'bg-main-dark text-main-light'
            } hover:border-main-300 focus:border-main-300 font-gilroy rounded-full ease-in-out duration-400`}
          >
            <div
              className={`h-full flex items-center ri-settings-3-line`}
            ></div>
          </Link>
        )}
        <button
          className={`text-center text-lg px-3 py-2 border-2 border-transparent flex justify-center items-center ${
            theme === 'light'
              ? 'bg-main-light text-main-dark'
              : 'bg-main-dark text-main-light'
          } hover:border-main-300 focus:border-main-300 font-gilroy rounded-full ri-${
            theme === 'light' ? 'sun' : 'moon'
          }-line ease-in-out duration-400`}
          onClick={() => changeTheme()}
        ></button>
      </div>
    </>
  );
}
