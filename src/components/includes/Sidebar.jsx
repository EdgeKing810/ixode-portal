import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../../stores/useThemeStore';
import { useUserProfileStore } from '../../stores/useUserProfileStore';

import { fetchData } from '../../utils/data';
import { logout } from '../../utils/fetcher';

import { Image, Linker, LinkerButton, Separator } from '../Components';

import banner from '../../assets/images/banner_purple.png';

export default function Sidebar({ currentPage }) {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const [pages] = useState(fetchData().navigation);

  const navigate = useNavigate();

  return (
    <div
      className={`w-0 lg:w-1/5 invisible lg:visible ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } h-full bg-opacity-50 lg:border-r-4 lg:border-main-primary`}
    >
      <Image src={banner} alt="banner" className={`w-full p-2`} noRounded />

      <div className="w-full flex flex-col p-1 lg:p-2">
        {pages
          .filter((p) => p.visibility.split(',').includes(profile.role))
          .map((p) => (
            <Linker
              key={`nav-${p.name}`}
              theme={theme}
              className={`py-2 rounded-lg w-full flex justify-center uppercase`}
              color={theme}
              textColor={
                currentPage === p.name.toLowerCase() ? 'primary' : 'secondary'
              }
              transparent
              to={`/${p.name.toLowerCase()}`}
              condition={currentPage !== p.name.toLowerCase()}
              title={p.name}
              icon={p.icon}
              noFill
              reverseIcon
              customInner={`w-full flex justify-left overflow-hidden rounded-lg pl-6 py-2`}
            />
          ))}

        <Separator />

        <LinkerButton
          theme={theme}
          className="py-3 rounded-lg w-full justify-start uppercase -mt-1"
          click={() => {
            logout();
            navigate('/');
          }}
          color={theme}
          transparent
          condition
          title="Log Out"
          icon="logout-box"
          textColor="error"
          noFill
          reverseIcon
        />
      </div>
    </div>
  );
}
