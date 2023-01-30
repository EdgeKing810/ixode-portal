import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-ignore
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { IProject, useProjectStore } from '../stores/useProjectStore';
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
  IDataOriginal,
} from '../utils/dataProcessor';
import { ICollection } from '../stores/useCollectionStore';
import DataTableDisplay from '../components/data/DataTableDisplay';

export default function Data() {
  const { profile } = useUserProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);
  const { addMedia } = useMediaStore((state) => state);

  const { API_URL, PUBLIC_URL } = useContext(LocalContext);
  const { project_id, collection_id, data_id, mode } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [currentCollection, setCurrentCollection] =
    useState<ICollection | null>(null);
  const [currentData, setCurrentData] = useState<IDataOriginal | null>(null);
  const [currentTableData, setCurrentTableData] = useState<
    Array<IDataOriginal>
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [deletingData, setDeletingData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isEditing: boolean =
    mode !== undefined && ['edit', 'e'].includes(mode.toLowerCase());
  const tableView: boolean =
    mode !== undefined && ['table', 't'].includes(mode.toLowerCase());

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setDeletingData(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    setIsLoading(true);
    let timer = setTimeout(() => setIsLoading(false), 8000);

    if (!projects || !profile) {
      navigate('/home');
    }

    if (profile.role === 'VIEWER' && isEditing) {
      navigate(`/data/p/${project_id}/c/${collection_id}`);
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
        .get(
          `${API_URL}/collection/fetch?uid=${profile.uid}&project_id=${project_id}`,
          {
            headers: { Authorization: `Bearer ${profile.jwt}` },
          }
        )
        .then(async (res) => {
          if (res.data.status === 200) {
            let collections = res.data.collections;
            let foundCollection = collections.find(
              (c: ICollection) => c.id === collection_id
            );

            if (foundCollection) {
              // foundCollection.structures = foundCollection.structures.map(
              //   (s: IStructure) => {
              //     let updatedStructure = s;
              //     if (s.stype && s.stype.CUSTOM) {
              //       updatedStructure.stype = 'TEXT';
              //     }
              //     return updatedStructure;
              //   }
              // );

              // foundCollection.custom_structures =
              //   foundCollection.custom_structures.map(
              //     (cs: ICustomStructure) => {
              //       let updatedCustomStructure = cs;

              //       updatedCustomStructure.structures =
              //         updatedCustomStructure.structures.map((s) => {
              //           let updatedStructure = s;
              //           if (s.stype && s.stype.CUSTOM) {
              //             updatedStructure.stype = 'TEXT';
              //           }
              //           return updatedStructure;
              //         });

              //       return updatedCustomStructure;
              //     }
              //   );

              setCurrentCollection(foundCollection);

              if (data_id) {
                axios
                  .get(
                    `${API_URL}/data/fetch/one?uid=${profile.uid}&project_id=${project_id}&collection_id=${collection_id}&data_id=${data_id}`,
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
                          published: pair.published,
                        });
                      }
                    } else {
                      console.log(res.data);
                      alert.error(res.data.message);
                    }

                    setIsLoading(false);
                  });
              } else if (mode === 'table') {
                axios
                  .get(
                    `${API_URL}/data/fetch?uid=${profile.uid}&project_id=${project_id}&collection_id=${collection_id}`,
                    {
                      headers: { Authorization: `Bearer ${profile.jwt}` },
                    }
                  )
                  .then(async (res) => {
                    if (res.data.status === 200) {
                      let pairs = res.data.pairs;
                      let dataIDs = res.data.data_ids;

                      if (pairs && pairs.length > 0) {
                        for (let i = 0; i < pairs.length; i++) {
                          let allCurrentData = generateDataFromRaw(
                            foundCollection,
                            pairs[i],
                            dataIDs[i]
                          );

                          setCurrentTableData((prev) => [
                            ...prev,
                            {
                              id: allCurrentData[0].data_id,
                              pairs: [...allCurrentData],
                              published: pairs[i].published,
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
              } else {
                let allCurrentData =
                  generateDataFromCollection(foundCollection);

                setCurrentData({
                  id: allCurrentData[0].data_id,
                  pairs: [...allCurrentData],
                  published: false,
                });

                setIsLoading(false);
              }
            }
          } else {
            console.log(res.data);
          }
        });
    }

    // eslint-disable-next-line
  }, [project_id, projects]);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="data" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="data" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
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
              ) : !currentData && currentTableData.length === 0 ? (
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
              currentData.id &&
              !tableView && (
                <DataStructureDisplay
                  API_URL={API_URL}
                  PUBLIC_URL={PUBLIC_URL}
                  profile={profile}
                  currentData={currentData}
                  setCurrentData={setCurrentData}
                  addMedia={addMedia}
                  project_id={project_id ? project_id : ''}
                  collection_id={collection_id ? collection_id : ''}
                  data_id={data_id ? data_id : ''}
                  currentProject={currentProject}
                  currentCollection={currentCollection}
                  alert={alert}
                  navigate={navigate}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isEditing={isEditing}
                  isCreating={['undefined', undefined].includes(data_id)}
                />
              )}

            {currentProject &&
              currentProject.id &&
              currentCollection &&
              currentCollection.id &&
              currentTableData &&
              currentTableData.length > 0 &&
              tableView && (
                <DataTableDisplay
                  API_URL={API_URL}
                  PUBLIC_URL={PUBLIC_URL}
                  profile={profile}
                  currentTableData={currentTableData}
                  setCurrentTableData={setCurrentTableData}
                  addMedia={addMedia}
                  project_id={project_id ? project_id : ''}
                  collection_id={collection_id ? collection_id : ''}
                  data_id={data_id ? data_id : ''}
                  currentProject={currentProject}
                  currentCollection={currentCollection}
                  alert={alert}
                  navigate={navigate}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isEditing={isEditing}
                  isCreating={['undefined', undefined].includes(data_id)}
                />
              )}
          </div>
        </div>
      </div>

      {currentProject && (
        <DataViewCollectionIncludes
          API_URL={API_URL}
          profile={profile}
          currentProject={currentProject}
          setCurrentData={null}
          collectionID={collection_id ? collection_id : ''}
          dataID={data_id ? data_id : ''}
          setDataID={() => null}
          deletingData={deletingData}
          setDeletingData={setDeletingData}
          alert={alert}
        />
      )}
    </div>
  );
}
