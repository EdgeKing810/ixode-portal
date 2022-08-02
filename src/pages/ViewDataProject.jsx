import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import DataProjectDisplay from '../components/data/DataProjectDisplay';
import DataCollectionItem from '../components/data/DataCollectionItem';
import DataViewProjectIncludes from '../components/data/DataViewProjectIncludes';
import DataViewProjectBulk from '../components/data/DataViewProjectBulk';

export default function ViewDataProject() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const { project_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [memberCurrentPage, setMemberCurrentPage] = useState(0);
  const memberLimit = 5;
  const [filter, setFilter] = useState('');

  const [currentProject, setCurrentProject] = useState(null);
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);

  let allProfiles = [profile, ...profiles.filter((p) => p.id !== profile.id)];
  const [collections, setCollections] = useState(null);

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

  useEffect(() => {
    let foundProject = projects.find((p) => p.id === project_id);
    if (foundProject) {
      if (
        !profile ||
        (!['ROOT', 'ADMIN', 'AUTHOR'].includes(profile.role) &&
          !foundProject.members.includes(profile.id))
      ) {
        alert.error('Not Authorized to view data for this Project');
        navigate('/home');
      }

      setCurrentProject(foundProject);
      setName(foundProject.name);
      setMembers(foundProject.members);

      axios
        .post(
          `${API_URL}/collection/fetch`,
          { uid: profile.uid, project_id: project_id },
          {
            headers: { Authorization: `Bearer ${profile.jwt}` },
          }
        )
        .then(async (res) => {
          if (res.data.status === 200) {
            setCollections(res.data.collections);
          } else {
            console.log(res.data);
          }
        });

      setIsLoading(false);
    }

    // eslint-disable-next-line
  }, [project_id, projects]);

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
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!currentProject || !currentProject.id ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">Project not found.</Heading>
              )
            ) : (
              <div></div>
            )}

            {currentProject && currentProject.id && (
              <DataProjectDisplay
                currentProject={currentProject}
                setShowMembers={setShowMembers}
                setMembers={setMembers}
                setName={setName}
                setMemberCurrentPage={setMemberCurrentPage}
                theme={theme}
              />
            )}

            <DataViewProjectBulk
              collections={collections}
              isLoading={isLoading}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              theme={theme}
            />

            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
              {collections &&
                collections
                  .filter(
                    (c) =>
                      filter.length <= 0 ||
                      c.name
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      c.description
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      c.id.toLowerCase().includes(filter.trim().toLowerCase())
                  )
                  .slice(currentPage * limit, limit + currentPage * limit)
                  .map((c) => (
                    <DataCollectionItem
                      key={`cl-${c.id}`}
                      collection={c}
                      project_id={project_id}
                      theme={theme}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      <DataViewProjectIncludes
        allProfiles={allProfiles}
        name={name}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        members={members}
        memberLimit={memberLimit}
        memberCurrentPage={memberCurrentPage}
        setMemberCurrentPage={setMemberCurrentPage}
        theme={theme}
      />
    </div>
  );
}
