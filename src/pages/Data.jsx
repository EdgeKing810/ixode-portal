import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProjectStore } from '../stores/useProjectStore';
import { useMediaStore } from '../stores/useMediaStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import DataStructureDisplay from '../components/data/DataStructureDisplay';
import DataViewCollectionIncludes from '../components/data/DataViewCollectionIncludes';

import {
  generateDataFromCollection,
  generateDataFromRaw,
} from '../utils/dataProcessor';

export default function Data() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);
  const { addMedia } = useMediaStore((state) => state);

  const { API_URL, PUBLIC_URL } = useContext(LocalContext);
  const { project_id, collection_id, data_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const [currentProject, setCurrentProject] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [dataID, setDataID] = useState('');
  const [deletingData, setDeletingData] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setDeletingData(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    setIsLoading(true);
    let timer = setTimeout(() => setIsLoading(false), 6000);

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
        alert.error('Not Authorized to view Data in this Project');
        navigate('/home');
      }

      setCurrentProject(foundProject);

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
              foundCollection.structures = foundCollection.structures.map(
                (s) => {
                  let updatedStructure = s;
                  if (s.stype && s.stype.CUSTOM) {
                    updatedStructure.stype = 'TEXT';
                  }
                  return updatedStructure;
                }
              );

              foundCollection.custom_structures =
                foundCollection.custom_structures.map((cs) => {
                  let updatedCustomStructure = cs;

                  updatedCustomStructure.structures =
                    updatedCustomStructure.structures.map((s) => {
                      let updatedStructure = s;
                      if (s.stype && s.stype.CUSTOM) {
                        updatedStructure.stype = 'TEXT';
                      }
                      return updatedStructure;
                    });

                  return updatedCustomStructure;
                });

              setCurrentCollection(foundCollection);

              if (data_id) {
                axios
                  .post(
                    `${API_URL}/data/fetch/one`,
                    {
                      uid: profile.uid,
                      project_id: project_id,
                      collection_id: collection_id,
                      data_id: data_id,
                    },
                    {
                      headers: { Authorization: `Bearer ${profile.jwt}` },
                    }
                  )
                  .then(async (res) => {
                    if (res.data.status === 200) {
                      let pair = res.data.pair;
                      let dataID = res.data.data_id;

                      if (pair) {
                        let allCurrentData = generateDataFromRaw(
                          foundCollection,
                          pair,
                          dataID
                        );

                        setCurrentData({
                          id: allCurrentData[0].data_id,
                          pairs: [...allCurrentData],
                        });
                      }
                    } else {
                      console.log(res.data);
                      alert.error(res.data.message);
                    }

                    setIsLoading(false);
                  });
              } else {
                let allCurrentData =
                  generateDataFromCollection(foundCollection);

                setCurrentData({
                  id: allCurrentData[0].data_id,
                  pairs: [...allCurrentData],
                });

                setIsLoading(false);
              }
            }
          } else {
            console.log(res.data);
          }

          setIsLoading(false);
        });
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
            {!currentProject ||
            !currentProject.id ||
            !currentCollection ||
            !currentCollection.id ||
            !currentData ||
            !currentData.id ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : !currentProject ? (
                <Heading color="error">Project not found.</Heading>
              ) : !currentCollection ? (
                <Heading color="error">Collection not found.</Heading>
              ) : !currentData ? (
                <Heading color="error">Data not found.</Heading>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}

            {currentProject &&
              currentProject.id &&
              currentCollection &&
              currentCollection.id &&
              currentData &&
              currentData.id && (
                <DataStructureDisplay
                  API_URL={API_URL}
                  PUBLIC_URL={PUBLIC_URL}
                  profile={profile}
                  currentData={currentData}
                  setCurrentData={setCurrentData}
                  addMedia={addMedia}
                  project_id={project_id}
                  collection_id={collection_id}
                  data_id={data_id}
                  currentProject={currentProject}
                  currentCollection={currentCollection}
                  theme={theme}
                  alert={alert}
                  navigate={navigate}
                />
              )}
          </div>
        </div>
      </div>

      <DataViewCollectionIncludes
        API_URL={API_URL}
        profile={profile}
        currentProject={currentProject}
        setCurrentData={setCurrentData}
        collectionID={collection_id}
        dataID={dataID}
        setDataID={setDataID}
        deletingData={deletingData}
        setDeletingData={setDeletingData}
        theme={theme}
        alert={alert}
      />
    </div>
  );
}