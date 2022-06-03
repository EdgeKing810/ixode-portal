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
import {
  ALink,
  BigText,
  Button,
  Heading,
  IconButton,
  Input,
  LinkerButton,
  Separator,
  SmallText,
  SubHeading,
  Text,
} from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import IncludeShowMembers from './includes/projects/IncludeShowMembers';
import IncludeAddMembers from './includes/projects/IncludeAddMembers';
import IncludeDeleteMembers from './includes/projects/IncludeDeleteMembers';
import PaginationList from '../wrappers/PaginationList';
import IncludeDeleteProject from './includes/projects/IncludeDeleteProject';
import IncludeEditProject from './includes/projects/IncludeEditProject';

import IncludeCreateCollection from './includes/collection/IncludeCreateCollection';
import IncludeEditCollection from './includes/collection/IncludeEditCollection';
import IncludeDeleteCollection from './includes/collection/IncludeDeleteCollection';

export default function ViewProject() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const {
    projects,
    addProject,
    updateProject,
    removeProject,
    addProjectMember,
    removeProjectMember,
  } = useProjectStore((state) => state);

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
  const [projectID, setProjectID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [apiPath, setApiPath] = useState('');
  const [members, setMembers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [removeMember, setRemoveMember] = useState(false);
  const [editingProject, setEditingProject] = useState('');
  const [deletingProject, setDeletingProject] = useState(false);

  const [collectionID, setCollectionID] = useState('');
  const [editCollectionID, setEditCollectionID] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [editingCollectionID, setEditingCollectionID] = useState(false);
  const [editingCollectionName, setEditingCollectionName] = useState(false);
  const [editingCollectionDescription, setEditingCollectionDescription] =
    useState(false);
  const [deletingCollection, setDeletingCollection] = useState(false);

  let allProfiles = [profile, ...profiles.filter((p) => p.id !== profile.id)];
  const [collections, setCollections] = useState(null);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setEditingProject('');
      setDeletingProject(false);
      setShowMembers(false);
      setAddMember(false);
      setRemoveMember(false);

      setCreatingCollection(false);
      setEditingCollectionID(false);
      setEditingCollectionName(false);
      setEditingCollectionDescription(false);
      setDeletingCollection(false);
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
        (!['ROOT', 'ADMIN'].includes(profile.role) &&
          !foundProject.members.includes(profile.id))
      ) {
        alert.error('Not Authorized to view this Project');
        navigate('/home');
      }

      setCurrentProject(foundProject);
      setProjectID(foundProject.id);
      setName(foundProject.name);
      setDescription(foundProject.description);
      setApiPath(foundProject.api_path);
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

  const submitUpdateProjectID = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      change: 'ID',
      data: projectID,
    };

    axios
      .post(
        `${API_URL}/project/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Project Updated!');

          setEditingProject(false);
          addProject(
            data.data,
            name,
            description,
            apiPath,
            currentProject.members
          );
          removeProject(currentProject.id);

          navigate(`/project/${data.data}`);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateProjectName = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      change: 'NAME',
      data: name,
    };

    axios
      .post(
        `${API_URL}/project/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Project Updated!');

          setEditingProject(false);
          updateProject(
            data.project_id,
            name,
            description,
            apiPath,
            currentProject.members
          );
          setCurrentProject((p) => {
            let updatedProject = { ...p };
            updatedProject.name = data.data;
            return updatedProject;
          });
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateProjectDescription = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      change: 'DESCRIPTION',
      data: description,
    };

    axios
      .post(
        `${API_URL}/project/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Project Updated!');

          setEditingProject(false);
          updateProject(
            data.project_id,
            name,
            description,
            apiPath,
            currentProject.members
          );
          setCurrentProject((p) => {
            let updatedProject = { ...p };
            updatedProject.description = data.data;
            return updatedProject;
          });
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateProjectAPIPath = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      change: 'APIPATH',
      data: apiPath,
    };

    axios
      .post(
        `${API_URL}/project/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Project Updated!');

          setEditingProject(false);
          updateProject(
            data.project_id,
            name,
            description,
            apiPath,
            currentProject.members
          );
          setCurrentProject((p) => {
            let updatedProject = { ...p };
            updatedProject.api_path = data.data;
            return updatedProject;
          });
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitAddMember = (uid) => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
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
      project_id: currentProject.id,
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
      project_id: currentProject.id,
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
          navigate('/projects');

          removeProject(data.project_id);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitCreateCollection = () => {
    const data = {
      uid: profile.uid,
      collection: {
        id: collectionID,
        project_id: currentProject.id,
        name: collectionName,
        description: collectionDescription,
      },
    };

    axios
      .post(
        `${API_URL}/collection/create`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Collection Created!');

          setCreatingCollection(false);

          setCollectionID('');
          setCollectionName('');
          setCollectionDescription('');

          setCollections((prev) => [
            ...prev,
            {
              id: data.collection.id,
              project_id: data.collection.project_id,
              name: data.collection.name,
              description: data.collection.description,
              structures: [],
              custom_structures: [],
            },
          ]);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateCollectionID = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      collection_id: collectionID,
      change: 'ID',
      data: editCollectionID,
    };

    axios
      .post(
        `${API_URL}/collection/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Collection Updated!');

          setEditingCollectionID(false);
          setCollections((prev) =>
            prev.map((p) => {
              let updatedCollection = { ...p };
              if (p.id === data.collection_id) {
                updatedCollection.id = data.data;
              }
              return updatedCollection;
            })
          );
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateCollectionName = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      collection_id: collectionID,
      change: 'NAME',
      data: collectionName,
    };

    axios
      .post(
        `${API_URL}/collection/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Collection Updated!');

          setEditingCollectionName(false);
          setCollections((prev) =>
            prev.map((p) => {
              let updatedCollection = { ...p };
              if (p.id === data.collection_id) {
                updatedCollection.name = data.data;
              }
              return updatedCollection;
            })
          );
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateCollectionDescription = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      collection_id: collectionID,
      change: 'DESCRIPTION',
      data: collectionDescription,
    };

    axios
      .post(
        `${API_URL}/collection/update`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Collection Updated!');

          setEditingCollectionDescription(false);
          setCollections((prev) =>
            prev.map((p) => {
              let updatedCollection = { ...p };
              if (p.id === data.collection_id) {
                updatedCollection.description = data.data;
              }
              return updatedCollection;
            })
          );
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitDeleteCollection = () => {
    const data = {
      uid: profile.uid,
      project_id: currentProject.id,
      collection_id: collectionID,
    };

    axios
      .post(
        `${API_URL}/collection/delete`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Collection Deleted!');

          setDeletingCollection(false);
          //   navigate('/projects');

          setCollections((prev) => [
            ...prev.filter((p) => p.id !== data.collection_id),
          ]);
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
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!projects || projects.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">Project not found.</Heading>
              )
            ) : (
              <div></div>
            )}

            {currentProject && currentProject.id && (
              <div
                className={`w-full rounded-lg lg:p-4 p-2 flex flex-col ${
                  theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                } duration-400 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
              >
                <Heading
                  color="primary"
                  theme={theme}
                  nobreak
                  className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
                >
                  {currentProject.name}
                </Heading>

                <BigText
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  nobreak
                  className={`w-full -mt-2 mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
                  smallerOnMobile
                >
                  {currentProject.description}
                </BigText>

                <Text
                  color="secondary"
                  theme={theme}
                  nobreak
                  className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center ${
                    theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
                  } p-1 rounded-lg`}
                >
                  {currentProject.api_path}
                </Text>

                <SmallText
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  nobreak
                  className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                >
                  {currentProject.members.length} members
                </SmallText>

                <Separator smaller />

                <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
                  <LinkerButton
                    theme={theme}
                    className="p-2 rounded-lg uppercase w-full"
                    smaller
                    transparent
                    condition
                    title="Update Project ID"
                    icon="arrow-right-s"
                    noFill
                    reverseIcon
                    click={() => {
                      setEditingProject('ID');
                    }}
                  />
                  <LinkerButton
                    theme={theme}
                    className="p-2 rounded-lg uppercase w-full"
                    smaller
                    transparent
                    condition
                    title="Update Project Name"
                    icon="arrow-right-s"
                    noFill
                    reverseIcon
                    click={() => {
                      setEditingProject('Name');
                    }}
                  />
                  <LinkerButton
                    theme={theme}
                    className="p-2 rounded-lg uppercase w-full lg:mt-0"
                    smaller
                    transparent
                    condition
                    title="Update Project Description"
                    icon="arrow-right-s"
                    noFill
                    reverseIcon
                    click={() => {
                      setEditingProject('Description');
                    }}
                  />
                  <LinkerButton
                    theme={theme}
                    className="p-2 rounded-lg uppercase w-full lg:mt-0"
                    smaller
                    transparent
                    condition
                    title="Update Project API Path"
                    icon="arrow-right-s"
                    noFill
                    reverseIcon
                    click={() => {
                      setEditingProject('API Path');
                    }}
                  />
                </div>

                <Separator />

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
                      setMembers(currentProject.members);
                      setProjectID(currentProject.id);
                      setName(currentProject.name);
                      setMemberCurrentPage(0);
                    }}
                  />

                  {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
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
                        setMembers(currentProject.members);
                        setProjectID(currentProject.id);
                        setName(currentProject.name);
                        setMemberCurrentPage(0);
                      }}
                    />
                  )}

                  {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
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
                        setMembers(currentProject.members);
                        setProjectID(currentProject.id);
                        setName(currentProject.name);
                        setMemberCurrentPage(0);
                      }}
                    />
                  )}

                  {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
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
                        setProjectID(currentProject.id);
                        setName(currentProject.name);
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            <Separator />

            <div className="flex lg:flex-row flex-col">
              {((collections && collections.length > 0) || !isLoading) && (
                <SubHeading
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  nobreak
                  className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                  smallerOnMobile
                >
                  Collections ({collections ? collections.length : 0})
                </SubHeading>
              )}

              {profile &&
                ['ROOT', 'ADMIN'].includes(profile.role) &&
                ((collections && collections.length > 0) || !isLoading) && (
                  <Button
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    className="p-3 w-full lg:w-1/3 justify-center uppercase"
                    click={() => {
                      setCreatingCollection(true);
                      setCollectionID('');
                      setCollectionName('');
                      setCollectionDescription('');
                    }}
                  >
                    Create a new Collection
                  </Button>
                )}
            </div>

            <Separator />

            {collections && collections.length > 0 && (
              <Input
                title="Filter Collections"
                placeholder="Filter Collections..."
                value={filter}
                theme={theme}
                change={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="mb-2"
              />
            )}

            {collections && collections.length > 0 && (
              <PaginationList
                theme={theme}
                limit={limit}
                amount={
                  collections
                    ? collections.filter(
                        (c) =>
                          filter.length <= 0 ||
                          c.name
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          c.description
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          c.id
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase())
                      ).length
                    : 0
                }
                setter={setCurrentPage}
                additional="mb-2 lg:mb-4"
              />
            )}

            {collections &&
              collections.length > 0 &&
              filter.length > 0 &&
              !collections.find(
                (c) =>
                  filter.length <= 0 ||
                  c.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  c.description
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  c.id.toLowerCase().includes(filter.trim().toLowerCase())
              ) && (
                <SubHeading color="error">
                  no collection match the filter.
                </SubHeading>
              )}

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
                    <div
                      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
                        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                      key={c.id}
                    >
                      <BigText
                        color="primary"
                        theme={theme}
                        nobreak
                        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
                      >
                        <ALink
                          noopacity
                          href={`/project/${project_id}/${c.id}`}
                          color="primary"
                        >
                          {c.name}
                        </ALink>
                      </BigText>

                      <Text
                        color={theme === 'light' ? 'dark' : 'light'}
                        theme={theme}
                        nobreak
                        className={`w-full mb-1 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
                      >
                        {c.description}
                      </Text>

                      <SmallText
                        color={theme === 'light' ? 'dark' : 'light'}
                        theme={theme}
                        nobreak
                        className={`w-full mt-1 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                      >
                        {c.structures.length} Structures
                      </SmallText>

                      <SmallText
                        color={theme === 'light' ? 'dark' : 'light'}
                        theme={theme}
                        nobreak
                        className={`w-full mt-1 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                      >
                        {c.custom_structures.length} Custom Structures
                      </SmallText>

                      <Separator smaller />

                      <div className="w-full flex">
                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Edit Collection ID"
                              condition
                              noFill
                              theme={theme}
                              icon="edit"
                              className="p-2 rounded-full w-10 h-10 mr-2"
                              color="primary"
                              click={() => {
                                setEditingCollectionID(true);
                                setCollectionID(c.id);
                                setEditCollectionID(c.id);
                                setCollectionName(c.name);
                              }}
                            />
                          )}

                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Edit Collection Name"
                              condition
                              noFill
                              theme={theme}
                              icon="pencil"
                              className="p-2 rounded-full w-10 h-10 mr-2"
                              color="primary"
                              click={() => {
                                setEditingCollectionName(true);
                                setCollectionID(c.id);
                                setCollectionName(c.name);
                              }}
                            />
                          )}

                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Edit Collection Description"
                              condition
                              noFill
                              theme={theme}
                              icon="edit-box"
                              className="p-2 rounded-full w-10 h-10 mr-2"
                              color="primary"
                              click={() => {
                                setEditingCollectionDescription(true);
                                setCollectionID(c.id);
                                setCollectionName(c.name);
                                setCollectionDescription(c.description);
                              }}
                            />
                          )}

                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Delete Collection"
                              condition
                              noFill
                              theme={theme}
                              icon="delete-bin-2"
                              className="p-2 rounded-full w-10 h-10"
                              color="primary"
                              click={() => {
                                setDeletingCollection(true);
                                setCollectionID(c.id);
                                setCollectionName(c.name);
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

      <IncludeEditProject
        isEditing={editingProject && editingProject.length > 0}
        setIsEditing={setEditingProject}
        title={editingProject}
        data={
          editingProject === 'ID'
            ? projectID
            : editingProject === 'Name'
            ? name
            : editingProject === 'Description'
            ? description
            : apiPath
        }
        setData={
          editingProject === 'ID'
            ? setProjectID
            : editingProject === 'Name'
            ? setName
            : editingProject === 'Description'
            ? setDescription
            : setApiPath
        }
        submitUpdate={
          editingProject === 'ID'
            ? submitUpdateProjectID
            : editingProject === 'Name'
            ? submitUpdateProjectName
            : editingProject === 'Description'
            ? submitUpdateProjectDescription
            : submitUpdateProjectAPIPath
        }
        textarea={editingProject === 'Description'}
        format={editingProject === 'API Path'}
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

      <IncludeCreateCollection
        isCreating={creatingCollection}
        setIsCreating={setCreatingCollection}
        name={collectionName}
        setName={setCollectionName}
        collectionID={collectionID}
        setCollectionID={setCollectionID}
        description={collectionDescription}
        setDescription={setCollectionDescription}
        submitCreateCollection={submitCreateCollection}
        theme={theme}
      />

      <IncludeEditCollection
        isEditing={editingCollectionID}
        setIsEditing={setEditingCollectionID}
        name={collectionName}
        type="ID"
        data={editCollectionID}
        setData={setEditCollectionID}
        submitUpdate={submitUpdateCollectionID}
        theme={theme}
      />

      <IncludeEditCollection
        isEditing={editingCollectionName}
        setIsEditing={setEditingCollectionName}
        name={collectionName}
        type="Name"
        data={collectionName}
        setData={setCollectionName}
        submitUpdate={submitUpdateCollectionName}
        theme={theme}
      />

      <IncludeEditCollection
        isEditing={editingCollectionDescription}
        setIsEditing={setEditingCollectionDescription}
        name={collectionName}
        type="Description"
        data={collectionDescription}
        setData={setCollectionDescription}
        submitUpdate={submitUpdateCollectionDescription}
        theme={theme}
        textarea
      />

      <IncludeDeleteCollection
        isActive={deletingCollection}
        setIsActive={setDeletingCollection}
        submitDeleteCollection={submitDeleteCollection}
        name={collectionName}
        theme={theme}
      />
    </div>
  );
}
