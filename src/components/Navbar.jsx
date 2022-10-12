import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useThemeStore } from '../stores/useThemeStore';

import { LocalContext } from '../wrappers/LocalContext';

import { fetchData } from '../utils/data';
import { logout } from '../utils/fetcher';

export default function Navbar({ width, currentPage }) {
  const { profile } = useUserProfileStore((state) => state);
  const { theme, setTheme } = useThemeStore((state) => state);
  const [pages] = useState(fetchData().navigation);

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { PUBLIC_URL } = useContext(LocalContext);

  const changeTheme = () => {
    let newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    document
      .getElementById('root')
      .setAttribute(
        'data-theme',
        newTheme === 'light' ? 'moonlight' : 'shadow'
      );

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
        className={`w-full fixed z-50 h-16 lg:h-20 bg-base-200 py-2 lg:py-0 duration-300 ease-in-out lg:overflow-y-hidden`}
      >
        <div className="flex w-full h-full justify-between items-center px-2 lg:px-4 lg:border-b-4 lg:border-primary">
          <div className="w-2/5 sm:w-1/5 h-full flex justify-start items-center">
            <Link className="h-full flex justify-start items-center" to="/home">
              <img
                src={`${PUBLIC_URL}/public/logo_purple.webp`}
                alt="logo"
                className="h-4/5 sm:h-3/5 lg:h-full object-scale-down lg:py-2"
              />
            </Link>
          </div>

          <div className="sm:w-1/5 h-full flex justify-end items-center relative">
            <button
              className="btn btn-accent btn-circle ml-1 lg:ml-2"
              title="Change Theme"
              onClick={() => changeTheme()}
            >
              <i className={`ri-${theme === 'light' ? 'sun' : 'moon'}-line`} />
            </button>

            <button
              className="btn btn-circle btn-outline ml-2 lg:hidden"
              title="Menu"
              onClick={() => setShowMenu(true)}
            >
              <i className={`ri-menu-line`} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-screen h-full lg:hidden fixed z-50 p-2 transform transition duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        } bg-base-300 bg-opacity-85 fullabs left-0 top-0 flex flex-col items-center`}
        onClick={() => {
          setShowMenu(false);
        }}
      >
        <div className="w-full flex justify-end pt-1">
          <button
            className="btn btn-circle btn-outline ml-1 lg:ml-2 lg:hidden"
            title="Close"
            onClick={() => setShowMenu(false)}
          >
            <i className={`ri-close-line`} />
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <p className={`text-primary font-spartan text-3xl font-semibold`}>
            Navigation
          </p>

          <ul className="w-4/6 flex flex-col items-center py-2">
            {pages
              .filter((p) => p.visibility.split(',').includes(profile.role))
              .map((p) => (
                <li
                  key={`navbar-${p.name}`}
                  className="mt-2 w-full"
                  title={p.name}
                >
                  <button
                    onClick={() => navigate(`/${p.name.toLowerCase()}`)}
                    className={`btn w-full flex gap-2 ${
                      currentPage === p.name.toLowerCase()
                        ? 'no-animation btn-secondary btn-outline'
                        : 'btn-ghost'
                    }`}
                  >
                    {p.name}
                    <span className={`ri-${p.icon}-line`} />
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-2">
          <p className={`text-primary font-spartan text-3xl font-semibold`}>
            Misc
          </p>

          <div className="w-4/6 flex items-center py-2">
            <button
              title={
                theme === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'
              }
              onClick={() => {
                changeTheme();
              }}
              className={`btn w-full flex justify-center gap-2 btn-outline mt-2`}
            >
              {theme === 'dark'
                ? 'Switch to Light Mode'
                : 'Switch to Dark Mode'}
              <span
                className={`ri-${theme === 'dark' ? 'moon' : 'sun'}-line`}
              />
            </button>
          </div>
        </div>

        <div className="w-4/6">
          <div
            className={`pt-1 w-full bg-base-accent my-4 rounded-lg opacity-25`}
          />

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className={`btn w-full flex justify-center gap-2 btn-error btn-outline mt-2`}
          >
            Log Out
            <span className={`ri-logout-box-line`} />
          </button>
        </div>
      </div>
    </>
  );
}
