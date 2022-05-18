import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import banner from '../assets/images/logo_purple.png';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useThemeStore } from '../stores/useThemeStore';
import { IconButton, Linker, LinkerButton } from './Components';
import { fetchData } from '../utils/data';

export default function Navbar({ width, currentPage }) {
  const { profile } = useUserProfileStore((state) => state);
  const { theme, setTheme } = useThemeStore((state) => state);
  const [pages] = useState(fetchData().navigation);

  const [showMenu, setShowMenu] = useState(false);

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
          theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
        } py-2 lg:pb-4 lg:pt-2 duration-400 ease-in-out lg:overflow-y-hidden`}
      >
        <div className="flex w-full h-full justify-between items-center px-2 lg:px-4">
          <div className="w-2/5 sm:w-1/5 h-full flex justify-start items-center">
            <Link className="h-full flex justify-start items-center" to="/home">
              <img
                src={banner}
                alt="banner"
                className="h-4/5 sm:h-3/5 lg:h-full object-scale-down"
              />
            </Link>
          </div>

          <div className="sm:w-1/5 h-full flex justify-end items-center relative">
            <IconButton
              title="Change Theme"
              condition
              theme={theme}
              icon={theme === 'light' ? 'sun' : 'moon'}
              color={theme === 'light' ? 'dark' : 'light'}
              borderColor="primary"
              className="p-2 rounded-full ml-1 lg:ml-2 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 lg:border-4"
              click={() => changeTheme()}
              noFill
            />

            <IconButton
              title="Menu"
              condition
              theme={theme}
              icon="menu"
              color={theme === 'light' ? 'dark' : 'light'}
              borderColor="primary"
              className="p-2 rounded-full ml-1 lg:ml-2 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 lg:hidden"
              click={() => setShowMenu(true)}
              noFill
            />
          </div>
        </div>

        <div className="w-full mt-2">
          <div
            className="pt-1 bg-main-primary"
            style={{ width: `${width !== undefined ? width : 100}%` }}
          ></div>
        </div>
      </div>

      <div
        className={`w-screen h-screenm lg:hidden fixed z-50 p-2 transform transition duration-400 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } ${
          theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
        } opacity-95 left-0 top-0 flex flex-col items-center`}
        onClick={() => {
          setShowMenu(false);
        }}
      >
        <div className="w-full flex justify-end pt-1">
          <IconButton
            title="Close"
            condition
            theme={theme}
            icon="close"
            color={theme === 'light' ? 'dark' : 'light'}
            borderColor="primary"
            className="p-2 rounded-full w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 lg:hidden"
            click={() => setShowMenu(true)}
            noFill
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <p
            className={`text-main-primary font-spartan text-3xl font-semibold`}
          >
            Navigation
          </p>

          <div className="w-4/6 flex flex-col items-center py-2">
            {pages.map((p) => (
              <Linker
                key={`navbar-${p.name}`}
                to={`/${p.name.toLowerCase()}`}
                title={p.name}
                theme={theme}
                icon={p.icon}
                className="w-full rounded-lg mt-2 p-2"
                condition={currentPage !== p.name.toLowerCase()}
                noFill
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-2">
          <p
            className={`text-main-primary font-spartan text-3xl font-semibold`}
          >
            Misc
          </p>

          <div className="w-4/6 flex items-center py-2">
            <LinkerButton
              title={
                theme === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
              }
              theme={theme}
              icon="user-3"
              className="w-full rounded-lg mt-2 p-2"
              condition
              noFill
              click={() => changeTheme()}
            />
          </div>
        </div>
      </div>

      <div
        className={`py-3 lg:hidden bottom-0 fixed z-30 w-screen flex justify-around border-t-2 border-main-primary ${
          theme === 'light' ? 'bg-main-100' : 'bg-main-900'
        } ease-in-out duration-400`}
      >
        <Link
          to="/home"
          className={`text-center text-lg px-3 py-2 border-2 border-transparent flex justify-center items-center ${
            theme === 'light'
              ? 'bg-main-light text-main-dark'
              : 'bg-main-dark text-main-light'
          } hover:border-main-primary focus:border-main-primary font-spartan rounded-full ease-in-out duration-400`}
        >
          <div className={`h-full flex items-center ri-home-4-line`}></div>
        </Link>
      </div>
    </>
  );
}
