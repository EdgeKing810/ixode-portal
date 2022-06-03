import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import {
  ALinkTo,
  BigText,
  Button,
  Heading,
  IconButton,
  Input,
  Separator,
  SmallText,
  SubHeading,
  Text,
} from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import IncludeCreateProject from './includes/projects/IncludeCreateProject';
import IncludeShowMembers from './includes/projects/IncludeShowMembers';
import IncludeAddMembers from './includes/projects/IncludeAddMembers';
import IncludeDeleteMembers from './includes/projects/IncludeDeleteMembers';
import PaginationList from '../wrappers/PaginationList';
import IncludeDeleteProject from './includes/projects/IncludeDeleteProject';

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

  const submitCreateProject = () => {
    const data = {
      uid: profile.uid,
      project: {
        id: projectID,
        name: name,
        description: description,
        api_path: apiPath,
        members: [...members],
      },
    };

    axios
      .post(
        `${API_URL}/project/create`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Project Created!');

          setCreatingProject(false);

          setProjectID('');
          setName('');
          setDescription('');
          setApiPath('');
          setMembers([]);

          addProject(
            data.project.id,
            data.project.name,
            data.project.description,
            data.project.api_path,
            [
              profile.uid,
              ...data.project.members.filter((m) => m !== profile.uid),
            ]
          );
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitAddMember = (uid) => {
    const data = {
      uid: profile.uid,
      project_id: projectID,
      target_uid: uid.toLowerCase(),
    };

    setAddMember(false);

    axios
      .post(
        `${API_URL}/project/member/add`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Member Added!');

          setProjectID('');
          setName('');
          setDescription('');
          setApiPath('');
          setMembers([]);

          addProjectMember(data.project_id, data.target_uid);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitRemoveMember = (uid) => {
    const data = {
      uid: profile.uid,
      project_id: projectID,
      target_uid: uid.toLowerCase(),
    };

    setRemoveMember(false);

    axios
      .post(
        `${API_URL}/project/member/remove`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Member Removed!');

          setProjectID('');
          setName('');
          setDescription('');
          setApiPath('');
          setMembers([]);

          removeProjectMember(data.project_id, data.target_uid);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitDeleteProject = () => {
    const data = {
      uid: profile.uid,
      project_id: projectID,
    };

    axios
      .post(
        `${API_URL}/project/delete`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Project Deleted!');

          setDeletingProject(false);

          setProjectID('');
          setName('');
          setDescription('');
          setApiPath('');
          setMembers([]);

          removeProject(data.project_id);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

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

            {profile &&
              ['ROOT', 'ADMIN'].includes(profile.role) &&
              ((projects && projects.length > 0) || !isLoading) && (
                <Button
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  className="p-3 w-full lg:w-1/3 justify-center uppercase"
                  click={() => {
                    setCreatingProject(true);
                    setProjectID('');
                    setName('');
                    setDescription('');
                    setApiPath('');
                    setMembers([]);
                  }}
                >
                  Create a new Project
                </Button>
              )}

            <Separator />

            {projects && projects.length > 0 && (
              <Input
                title="Filter Projects"
                placeholder="Filter Projects..."
                value={filter}
                theme={theme}
                change={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="mb-2"
              />
            )}

            {projects && projects.length > 0 && (
              <PaginationList
                theme={theme}
                limit={limit}
                amount={
                  projects
                    ? projects.filter(
                        (p) =>
                          filter.length <= 0 ||
                          p.name
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          p.description
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          p.id
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          p.api_path
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase())
                      ).length
                    : 0
                }
                setter={setCurrentPage}
                additional="mb-2 lg:mb-4"
              />
            )}

            {projects &&
              projects.length > 0 &&
              filter.length > 0 &&
              !projects.find(
                (p) =>
                  filter.length <= 0 ||
                  p.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  p.description
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  p.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  p.api_path.toLowerCase().includes(filter.trim().toLowerCase())
              ) && (
                <SubHeading color="error">
                  no project match the filter.
                </SubHeading>
              )}

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
                  <div
                    className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
                      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                    } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                    key={p.id}
                  >
                    <BigText
                      color="primary"
                      theme={theme}
                      nobreak
                      className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
                    >
                      <ALinkTo
                        noopacity
                        to={`/project/${p.id}`}
                        color="primary"
                      >
                        {p.name}
                      </ALinkTo>
                    </BigText>

                    <Text
                      color={theme === 'light' ? 'dark' : 'light'}
                      theme={theme}
                      nobreak
                      className={`w-full mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
                    >
                      {p.description}
                    </Text>

                    <Text
                      color="secondary"
                      theme={theme}
                      nobreak
                      className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center ${
                        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
                      } p-1 rounded-lg`}
                    >
                      {p.api_path}
                    </Text>

                    <SmallText
                      color={theme === 'light' ? 'dark' : 'light'}
                      theme={theme}
                      nobreak
                      className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                    >
                      {p.members.length} members
                    </SmallText>

                    <Separator smaller />

                    <div className="w-full flex">
                      <IconButton
                        title="View Members"
                        condition
                        noFill
                        theme={theme}
                        icon="user"
                        className="p-2 rounded-full w-10 h-10 mr-2"
                        color="primary"
                        click={() => {
                          setShowMembers(true);
                          setMembers(p.members);
                          setProjectID(p.id);
                          setName(p.name);
                          setMemberCurrentPage(0);
                        }}
                      />

                      {profile.role &&
                        ['ROOT', 'ADMIN'].includes(profile.role) && (
                          <IconButton
                            title="Add Member"
                            condition
                            noFill
                            theme={theme}
                            icon="user-add"
                            className="p-2 rounded-full w-10 h-10 mr-2"
                            color="primary"
                            click={() => {
                              setAddMember(true);
                              setMembers(p.members);
                              setProjectID(p.id);
                              setName(p.name);
                              setMemberCurrentPage(0);
                            }}
                          />
                        )}

                      {profile.role &&
                        ['ROOT', 'ADMIN'].includes(profile.role) && (
                          <IconButton
                            title="Remove Member"
                            condition
                            noFill
                            theme={theme}
                            icon="user-unfollow"
                            className="p-2 rounded-full w-10 h-10 mr-2"
                            color="primary"
                            click={() => {
                              setRemoveMember(true);
                              setMembers(p.members);
                              setProjectID(p.id);
                              setName(p.name);
                              setMemberCurrentPage(0);
                            }}
                          />
                        )}

                      {profile.role &&
                        ['ROOT', 'ADMIN'].includes(profile.role) && (
                          <IconButton
                            title="Delete Project"
                            condition
                            noFill
                            theme={theme}
                            icon="delete-bin-2"
                            className="p-2 rounded-full w-10 h-10"
                            color="primary"
                            click={() => {
                              setDeletingProject(true);
                              setProjectID(p.id);
                              setName(p.name);
                            }}
                          />
                        )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <IncludeCreateProject
        isCreating={creatingProject}
        setIsCreating={setCreatingProject}
        name={name}
        setName={setName}
        projectID={projectID}
        setProjectID={setProjectID}
        description={description}
        setDescription={setDescription}
        apiPath={apiPath}
        setAPIPath={setApiPath}
        submitCreateProject={submitCreateProject}
        theme={theme}
      />

      <IncludeShowMembers
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        name={name}
        members={allProfiles.filter((ap) =>
          members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
        theme={theme}
      />

      <IncludeAddMembers
        showMembers={addMember}
        setShowMembers={setAddMember}
        name={name}
        members={allProfiles.filter(
          (ap) => !members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
        submitAddMember={submitAddMember}
        theme={theme}
      />

      <IncludeDeleteMembers
        showMembers={removeMember}
        setShowMembers={setRemoveMember}
        name={name}
        members={allProfiles.filter((ap) =>
          members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
        submitRemoveMember={submitRemoveMember}
        theme={theme}
      />

      <IncludeDeleteProject
        isActive={deletingProject}
        setIsActive={setDeletingProject}
        submitDeleteProject={submitDeleteProject}
        name={name}
        theme={theme}
      />
    </div>
  );
}
