import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import DataCollectionDisplay from '../components/data/DataCollectionDisplay';
import DataMiniDisplay from '../components/data/DataMiniDisplay';
import DataField from '../components/data/DataField';
import DataViewCollectionIncludes from '../components/data/DataViewCollectionIncludes';
import { generateDataFromRaw } from '../utils/dataProcessor';

export default function ViewDataCollection() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const { project_id, collection_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const [currentProject, setCurrentProject] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentData, setCurrentData] = useState([]);

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

              axios
                .post(
                  `${API_URL}/data/fetch`,
                  {
                    uid: profile.uid,
                    project_id: project_id,
                    collection_id: collection_id,
                  },
                  {
                    headers: { Authorization: `Bearer ${profile.jwt}` },
                  }
                )
                .then(async (res) => {
                  if (res.data.status === 200) {
                    let pairs = res.data.pairs;

                    if (pairs && pairs.length > 0) {
                      for (let i = 0; i < pairs.length; i++) {
                        let allCurrentData = generateDataFromRaw(
                          foundCollection,
                          pairs[i]
                        );
                        setCurrentData((prev) => [
                          ...prev,
                          {
                            id: allCurrentData[0].id,
                            pairs: [...allCurrentData],
                          },
                        ]);
                      }
                    }
                  } else {
                    console.log(res.data);
                    alert.error(res.data.message);
                  }

                  setIsLoading(false);
                });
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
                <DataCollectionDisplay
                  project_id={project_id}
                  currentProject={currentProject}
                  currentCollection={currentCollection}
                  theme={theme}
                />
              )}

            <DataMiniDisplay
              currentData={currentData}
              projectID={project_id}
              collectionID={collection_id}
              profile={profile}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              theme={theme}
              navigate={navigate}
            />

            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
              {currentData &&
                currentData.length > 0 &&
                currentData
                  .filter(
                    (d) =>
                      filter.length <= 0 ||
                      d.id.toLowerCase().includes(filter.trim().toLowerCase())
                  )
                  .slice(currentPage * limit, limit + currentPage * limit)
                  .map((d) => (
                    <DataField
                      key={`dfl-${d.id}`}
                      data={d}
                      project_id={project_id}
                      collection_id={collection_id}
                      setDataID={setDataID}
                      setDeletingData={setDeletingData}
                      theme={theme}
                      navigate={navigate}
                    />
                  ))}
            </div>
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
