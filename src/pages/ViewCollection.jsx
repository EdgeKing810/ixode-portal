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
  BigText,
  Button,
  Heading,
  IconButton,
  Input,
  LinkerButton,
  Separator,
  SmallText,
  SubHeading,
} from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import PaginationList from '../wrappers/PaginationList';

import IncludeEditCollection from './includes/collection/IncludeEditCollection';
import IncludeDeleteCollection from './includes/collection/IncludeDeleteCollection';

export default function ViewCollection() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const { project_id, collection_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const customLimit = 6;
  const [currentCustomPage, setCustomCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const [currentProject, setCurrentProject] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [projectID, setProjectID] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [collectionID, setCollectionID] = useState('');
  const [editCollectionID, setEditCollectionID] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [editingCollectionID, setEditingCollectionID] = useState(false);
  const [editingCollectionName, setEditingCollectionName] = useState(false);
  const [editingCollectionDescription, setEditingCollectionDescription] =
    useState(false);
  const [deletingCollection, setDeletingCollection] = useState(false);

  const [creatingStructure, setCreatingStructure] = useState(false);
  const [editingStructure, setEditingStructure] = useState(false);
  const [deletingStructure, setDeletingStructure] = useState(false);

  const [creatingCustomStructure, setCreatingCustomStructure] = useState(false);
  const [editingCustomStructure, setEditingCustomStructure] = useState(false);
  const [deletingCustomStructure, setDeletingCustomStructure] = useState(false);

  let allProfiles = [profile, ...profiles.filter((p) => p.id !== profile.id)];

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setEditingCollectionID(false);
      setEditingCollectionName(false);
      setEditingCollectionDescription(false);
      setDeletingCollection(false);

      setCreatingStructure(false);
      setEditingStructure(false);
      setDeletingStructure(false);

      setCreatingCustomStructure(false);
      setEditingCustomStructure(false);
      setDeletingCustomStructure(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 6000);
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
            let collections = res.data.collections;
            let foundCollection = collections.find(
              (c) => c.id === collection_id
            );
            if (foundCollection) {
              setCurrentCollection(foundCollection);

              setCollectionID(foundCollection.id);
              setEditCollectionID(foundCollection.id);
              setCollectionName(foundCollection.name);
              setCollectionDescription(foundCollection.description);
            }
          } else {
            console.log(res.data);
          }

          setIsLoading(false);
        });
    }

    // eslint-disable-next-line
  }, [project_id, projects]);

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
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.id = data.data;
            return updatedCollection;
          });
          navigate(`/project/${project_id}/collection/${data.data}`);
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
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.name = data.data;
            return updatedCollection;
          });
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
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.description = data.data;
            return updatedCollection;
          });
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
          navigate(`/project/${project_id}`);
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
            {!currentProject ||
            !currentProject.id ||
            !currentCollection ||
            !currentCollection.id ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : !currentProject ? (
                <Heading color="error">Project not found.</Heading>
              ) : !currentCollection ? (
                <Heading color="error">Collection not found.</Heading>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}

            {currentProject &&
              currentProject.id &&
              currentCollection &&
              currentCollection.id && (
                <div
                  className={`w-full rounded-lg lg:p-4 p-2 flex flex-col ${
                    theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                  } duration-400 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
                >
                  <Heading
                    color="primary"
                    theme={theme}
                    nobreak
                    className="w-full flex uppercase"
                  >
                    {currentProject.name} {'>'}
                    <span
                      className={`
                        ${
                          theme === 'light'
                            ? 'text-main-dark'
                            : 'text-main-light'
                        } ml-2
                      `}
                    >
                      {currentCollection.name}
                    </span>
                  </Heading>

                  <SmallText
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                  >
                    {currentCollection.structures.length} structures
                  </SmallText>

                  <SmallText
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                  >
                    {currentCollection.custom_structures.length} custom
                    structures
                  </SmallText>

                  <Separator smaller />

                  <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
                    <LinkerButton
                      theme={theme}
                      className="p-2 rounded-lg uppercase w-full"
                      smaller
                      transparent
                      condition
                      title="Edit Collection ID"
                      icon="arrow-right-s"
                      noFill
                      reverseIcon
                      click={() => {
                        setEditingCollectionID(true);
                      }}
                    />
                    <LinkerButton
                      theme={theme}
                      className="p-2 rounded-lg uppercase w-full"
                      smaller
                      transparent
                      condition
                      title="Edit Collection Name"
                      icon="arrow-right-s"
                      noFill
                      reverseIcon
                      click={() => {
                        setEditingCollectionName(true);
                      }}
                    />
                    <LinkerButton
                      theme={theme}
                      className="p-2 rounded-lg uppercase w-full lg:mt-0"
                      smaller
                      transparent
                      condition
                      title="Edit Collection Description"
                      icon="arrow-right-s"
                      noFill
                      reverseIcon
                      click={() => {
                        setEditingCollectionDescription(true);
                      }}
                    />
                    <LinkerButton
                      theme={theme}
                      className="p-2 rounded-lg uppercase w-full lg:mt-0"
                      smaller
                      transparent
                      condition
                      title="Delete Collection"
                      icon="delete-bin-2"
                      noFill
                      reverseIcon
                      click={() => {
                        setDeletingCollection(true);
                      }}
                    />
                  </div>
                </div>
              )}

            <Separator />

            <div className="flex lg:flex-row flex-col">
              {currentCollection && currentCollection.structures && (
                <SubHeading
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  nobreak
                  className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                  smallerOnMobile
                >
                  Structures ({currentCollection.structures.length})
                </SubHeading>
              )}

              {profile &&
                ['ROOT', 'ADMIN'].includes(profile.role) &&
                currentCollection &&
                currentCollection.id && (
                  <Button
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    className="p-3 w-full lg:w-1/3 justify-center uppercase"
                    click={() => {
                      setCreatingStructure(true);
                    }}
                  >
                    Create a new Structure
                  </Button>
                )}
            </div>

            <Separator />

            {currentCollection &&
              currentCollection.structures &&
              currentCollection.structures > 0 && (
                <Input
                  title="Filter Structures"
                  placeholder="Filter Structures..."
                  value={filter}
                  theme={theme}
                  change={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="mb-2"
                />
              )}

            {currentCollection &&
              currentCollection.structures &&
              currentCollection.structures > 0 && (
                <PaginationList
                  theme={theme}
                  limit={limit}
                  amount={
                    currentCollection.structures
                      ? currentCollection.structures.filter(
                          (s) =>
                            filter.length <= 0 ||
                            s.id
                              .toLowerCase()
                              .includes(filter.trim().toLowerCase()) ||
                            s.name
                              .toLowerCase()
                              .includes(filter.trim().toLowerCase()) ||
                            s.stype
                              .toLowerCase()
                              .includes(filter.trim().toLowerCase())
                        ).length
                      : 0
                  }
                  setter={setCurrentPage}
                  additional="mb-2 lg:mb-4"
                />
              )}

            {currentCollection &&
              currentCollection.structures &&
              currentCollection.structures > 0 &&
              filter.length > 0 &&
              !currentCollection.structures.find(
                (s) =>
                  filter.length <= 0 ||
                  s.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  s.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  s.stype.toLowerCase().includes(filter.trim().toLowerCase())
              ) && (
                <SubHeading color="error">
                  no structure match the filter.
                </SubHeading>
              )}

            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
              {currentCollection &&
                currentCollection.structures &&
                currentCollection.structures > 0 &&
                currentCollection.structures
                  .filter(
                    (s) =>
                      filter.length <= 0 ||
                      s.id
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      s.name
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      s.stype
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase())
                  )
                  .slice(currentPage * limit, limit + currentPage * limit)
                  .map((s) => (
                    <div
                      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
                        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                      key={s.id}
                    >
                      <BigText
                        color="primary"
                        theme={theme}
                        nobreak
                        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
                      >
                        {s.name}
                      </BigText>

                      <Separator smaller />

                      <div className="w-full flex">
                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Edit Structure"
                              condition
                              noFill
                              theme={theme}
                              icon="pencil"
                              className="p-2 rounded-full w-10 h-10 mr-2"
                              color="primary"
                              click={() => {
                                setEditingStructure(true);
                                // setCollectionID(c.id);
                                // setEditCollectionID(c.id);
                                // setCollectionName(c.name);
                              }}
                            />
                          )}

                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Delete Structure"
                              condition
                              noFill
                              theme={theme}
                              icon="delete-bin-2"
                              className="p-2 rounded-full w-10 h-10"
                              color="primary"
                              click={() => {
                                setDeletingStructure(true);
                                // setCollectionID(c.id);
                                // setCollectionName(c.name);
                              }}
                            />
                          )}
                      </div>
                    </div>
                  ))}
            </div>

            <div className="flex lg:flex-row flex-col">
              {currentCollection && currentCollection.custom_structures && (
                <SubHeading
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  nobreak
                  className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
                  smallerOnMobile
                >
                  Custom Structures (
                  {currentCollection.custom_structures.length})
                </SubHeading>
              )}

              {profile &&
                ['ROOT', 'ADMIN'].includes(profile.role) &&
                currentCollection &&
                currentCollection.id && (
                  <Button
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    className="p-3 w-full lg:w-1/3 justify-center uppercase"
                    click={() => {
                      setCreatingCustomStructure(true);
                    }}
                  >
                    Create a new Custom Structure
                  </Button>
                )}
            </div>

            <Separator />

            {currentCollection &&
              currentCollection.custom_structures &&
              currentCollection.custom_structures > 0 && (
                <Input
                  title="Filter Custom Structures"
                  placeholder="Filter Custom Structures..."
                  value={filter}
                  theme={theme}
                  change={(e) => {
                    setFilter(e.target.value);
                    setCustomCurrentPage(0);
                  }}
                  className="mb-2"
                />
              )}

            {currentCollection &&
              currentCollection.custom_structures &&
              currentCollection.custom_structures > 0 && (
                <PaginationList
                  theme={theme}
                  limit={customLimit}
                  amount={
                    currentCollection.custom_structures
                      ? currentCollection.custom_structures.filter(
                          (s) =>
                            filter.length <= 0 ||
                            s.id
                              .toLowerCase()
                              .includes(filter.trim().toLowerCase()) ||
                            s.name
                              .toLowerCase()
                              .includes(filter.trim().toLowerCase())
                        ).length
                      : 0
                  }
                  setter={setCustomCurrentPage}
                  additional="mb-2 lg:mb-4"
                />
              )}

            {currentCollection &&
              currentCollection.custom_structures &&
              currentCollection.custom_structures > 0 &&
              filter.length > 0 &&
              !currentCollection.custom_structures.find(
                (s) =>
                  filter.length <= 0 ||
                  s.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                  s.name.toLowerCase().includes(filter.trim().toLowerCase())
              ) && (
                <SubHeading color="error">
                  no custom structure match the filter.
                </SubHeading>
              )}

            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
              {currentCollection &&
                currentCollection.custom_structures &&
                currentCollection.custom_structures > 0 &&
                currentCollection.custom_structures
                  .filter(
                    (s) =>
                      filter.length <= 0 ||
                      s.id
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      s.name.toLowerCase().includes(filter.trim().toLowerCase())
                  )
                  .slice(
                    currentCustomPage * customLimit,
                    customLimit + currentCustomPage * customLimit
                  )
                  .map((s) => (
                    <div
                      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
                        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                      key={s.id}
                    >
                      <BigText
                        color="primary"
                        theme={theme}
                        nobreak
                        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
                      >
                        {s.name}
                      </BigText>

                      <Separator smaller />

                      <div className="w-full flex">
                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Edit Structure"
                              condition
                              noFill
                              theme={theme}
                              icon="pencil"
                              className="p-2 rounded-full w-10 h-10 mr-2"
                              color="primary"
                              click={() => {
                                setEditingCustomStructure(true);
                                // setCollectionID(c.id);
                                // setEditCollectionID(c.id);
                                // setCollectionName(c.name);
                              }}
                            />
                          )}

                        {profile.role &&
                          ['ROOT', 'ADMIN'].includes(profile.role) && (
                            <IconButton
                              title="Delete Structure"
                              condition
                              noFill
                              theme={theme}
                              icon="delete-bin-2"
                              className="p-2 rounded-full w-10 h-10"
                              color="primary"
                              click={() => {
                                setDeletingCustomStructure(true);
                                // setCollectionID(c.id);
                                // setCollectionName(c.name);
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
