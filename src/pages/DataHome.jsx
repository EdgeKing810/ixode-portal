import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import DataHomeProjectItem from '../components/data/DataHomeProjectItem';
import DataHomeProjectBulk from '../components/data/DataHomeProjectBulk';
import DataHomeProjectsIncludes from '../components/data/DataHomeProjectsIncludes';

export default function DataHome() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const navigate = useNavigate();

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [memberCurrentPage, setMemberCurrentPage] = useState(0);
  const memberLimit = 5;
  const [filter, setFilter] = useState('');

  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);

  let allProfiles = [profile, ...profiles.filter((p) => p.id !== profile.id)];

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowMembers(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(projects && projects.length > 0));

    if (!projects || !profile) {
      navigate('/home');
    }

    return () => {
      clearTimeout(timer);
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
      <Navbar currentPage="data" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="data" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25">
            {!projects || projects.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Projects Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            <DataHomeProjectBulk
              projects={projects}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              theme={theme}
            />

            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col">
              {projects
                .filter(
                  (p) =>
                    filter.length <= 0 ||
                    p.name
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    p.description
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    p.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                    p.api_path
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase())
                )
                .slice(currentPage * limit, limit + currentPage * limit)
                .map((p) => (
                  <DataHomeProjectItem
                    key={`dprl-${p.id}`}
                    project={p}
                    setShowMembers={setShowMembers}
                    setMembers={setMembers}
                    setName={setName}
                    setMemberCurrentPage={setMemberCurrentPage}
                    theme={theme}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <DataHomeProjectsIncludes
        allProfiles={allProfiles}
        name={name}
        members={members}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        memberLimit={memberLimit}
        memberCurrentPage={memberCurrentPage}
        setMemberCurrentPage={setMemberCurrentPage}
        theme={theme}
      />
    </div>
  );
}
