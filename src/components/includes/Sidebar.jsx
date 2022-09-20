import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserProfileStore } from '../../stores/useUserProfileStore';

import { fetchData } from '../../utils/data';
import { logout } from '../../utils/fetcher';

import banner from '../../assets/images/banner_purple.png';

export default function Sidebar({ currentPage }) {
  const { profile } = useUserProfileStore((state) => state);
  const [pages] = useState(fetchData().navigation);

  const navigate = useNavigate();

  return (
    <div
      className={`w-0 lg:w-1/5 invisible lg:visible bg-base-200 h-full lg:border-r-4 lg:border-primary`}
    >
      <img
        src={banner}
        alt="banner"
        className={`w-full p-2 mt-1 object-fill flex justify-center items-center`}
      />

      <ul className="menu w-full p-4 text-base-content">
        {pages
          .filter((p) => p.visibility.split(',').includes(profile.role))
          .map((p) => (
            <li key={`nav-${p.name}`} className="mt-2" title={p.name}>
              <button
                onClick={() => navigate(`/${p.name.toLowerCase()}`)}
                className={`btn flex justify-start gap-2 ${
                  currentPage === p.name.toLowerCase()
                    ? 'no-animation btn-secondary btn-outline'
                    : 'btn-ghost'
                }`}
              >
                <span className={`ri-${p.icon}-line`} />
                {p.name}
              </button>
            </li>
          ))}

        <div
          className={`pt-1 w-full bg-base-content my-4 rounded-lg opacity-25`}
        />

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className={`btn flex justify-center gap-2 btn-error btn-outline`}
        >
          <span className={`ri-logout-box-line`} />
          Log Out
        </button>
      </ul>
    </div>
  );
}
