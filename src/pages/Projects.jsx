import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import ProjectItem from '../components/projects/ProjectItem';
import ProjectsBulk from '../components/projects/ProjectsBulk';
import ProjectsIncludes from '../components/projects/ProjectsIncludes';

export default function Projects() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const {
    projects,
    addProject,
    removeProject,
    addProjectMember,
    removeProjectMember,
  } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [memberCurrentPage, setMemberCurrentPage] = useState(0);
  const memberLimit = 5;
  const [filter, setFilter] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [apiPath, setApiPath] = useState('');
  const [members, setMembers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [projectID, setProjectID] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [removeMember, setRemoveMember] = useState(false);
  const [deletingProject, setDeletingProject] = useState(false);

  let allProfiles = [profile, ...profiles.filter((p) => p.id !== profile.id)];

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setProjectID('');
      setCreatingProject(false);
      setDeletingProject(false);
      setShowMembers(false);
      setAddMember(false);
      setRemoveMember(false);
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
      <Navbar currentPage="projects" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="projects" />
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

            <ProjectsBulk
              profile={profile}
              projects={projects}
              setCreatingProject={setCreatingProject}
              setProjectID={setProjectID}
              setName={setName}
              setDescription={setDescription}
              setApiPath={setApiPath}
              setMembers={setMembers}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              isLoading={isLoading}
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
                  <ProjectItem
                    key={`prl-${p.id}`}
                    project={p}
                    profile={profile}
                    setShowMembers={setShowMembers}
                    setMembers={setMembers}
                    setProjectID={setProjectID}
                    setName={setName}
                    setMemberCurrentPage={setMemberCurrentPage}
                    setAddMember={setAddMember}
                    setRemoveMember={setRemoveMember}
                    setDeletingProject={setDeletingProject}
                    theme={theme}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectsIncludes
        API_URL={API_URL}
        profile={profile}
        allProfiles={allProfiles}
        creatingProject={creatingProject}
        setCreatingProject={setCreatingProject}
        name={name}
        setName={setName}
        projectID={projectID}
        setProjectID={setProjectID}
        description={description}
        setDescription={setDescription}
        apiPath={apiPath}
        setApiPath={setApiPath}
        members={members}
        setMembers={setMembers}
        addProject={addProject}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        memberLimit={memberLimit}
        memberCurrentPage={memberCurrentPage}
        setMemberCurrentPage={setMemberCurrentPage}
        addMember={addMember}
        setAddMember={setAddMember}
        addProjectMember={addProjectMember}
        removeMember={removeMember}
        setRemoveMember={setRemoveMember}
        removeProjectMember={removeProjectMember}
        deletingProject={deletingProject}
        setDeletingProject={setDeletingProject}
        removeProject={removeProject}
        theme={theme}
        alert={alert}
      />
    </div>
  );
}
