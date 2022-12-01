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

import CollectionDisplay from '../components/collections/CollectionDisplay';
import StructureMiniDisplay from '../components/structures/StructureMiniDisplay';
import StructureField from '../components/structures/StructureField';
import CustomStructureMiniDisplay from '../components/custom_structures/CustomStructureMiniDisplay';
import CustomStructureField from '../components/custom_structures/CustomStructureField';
import ViewCollectionIncludes from '../components/viewCollection/ViewCollectionIncludes';

import {
  submitCreateStructure,
  submitUpdateStructure,
} from '../components/structures/structure.utils';

import StructurePicker from '../components/structures/StructurePicker';
import { ICollection } from '../stores/useCollectionStore';

export default function ViewCollection() {
  const { profile } = useUserProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);
  const { addMedia } = useMediaStore((state) => state);

  const { API_URL, PUBLIC_URL } = useContext(LocalContext);
  const { project_id, collection_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const customLimit = 6;
  const [currentCustomPage, setCustomCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [customFilter, setCustomFilter] = useState('');

  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [currentCollection, setCurrentCollection] =
    useState<ICollection | null>(null);

  const [isLoading, setIsLoading] = useState(true);

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

  const [structureID, setStructureID] = useState('');
  const [editStructureID, setEditStructureID] = useState('');
  const [structureName, setStructureName] = useState('');
  const [structureDescription, setStructureDescription] = useState('');
  const [structureType, setStructureType] = useState('TEXT');
  const [structureDefault, setStructureDefault] = useState<
    string | number | boolean | Date
  >('');
  const [structureMin, setStructureMin] = useState(1);
  const [structureMax, setStructureMax] = useState(99);
  const [structureEncrypted, setStructureEncrypted] = useState(false);
  const [structureUnique, setStructureUnique] = useState(false);
  const [structureRegex, setStructureRegex] = useState('');
  const [structureArray, setStructureArray] = useState(false);
  const [structureRequired, setStructureRequired] = useState(false);

  const [customStructureID, setCustomStructureID] = useState('');
  const [editCustomStructureID, setEditCustomStructureID] = useState('');
  const [customStructureName, setCustomStructureName] = useState('');
  const [customStructureDescription, setCustomStructureDescription] =
    useState('');

  const escFunction = useCallback((event: any) => {
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
        alert.error('Not Authorized to view this Project');
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
              //   (s) => {
              //     let updatedStructure = s;
              //     if (s.stype && s.stype.CUSTOM) {
              //       updatedStructure.stype = 'TEXT';
              //     }
              //     return updatedStructure;
              //   }
              // );

              // foundCollection.custom_structures =
              //   foundCollection.custom_structures.map((cs) => {
              //     let updatedCustomStructure = cs;

              //     updatedCustomStructure.structures =
              //       updatedCustomStructure.structures.map((s) => {
              //         let updatedStructure = s;
              //         if (s.stype && s.stype.CUSTOM) {
              //           updatedStructure.stype = 'TEXT';
              //         }
              //         return updatedStructure;
              //       });

              //     return updatedCustomStructure;
              //   });

              setCurrentCollection(foundCollection);

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

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="projects" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="projects" />
        {!creatingStructure && !editingStructure ? (
          <div className="w-full lg:p-8 flex flex-col h-full">
            <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
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
                  <CollectionDisplay
                    project_id={project_id ? project_id : ''}
                    profile={profile}
                    currentProject={currentProject}
                    currentCollection={currentCollection}
                    setEditingCollectionID={setEditingCollectionID}
                    setEditingCollectionName={setEditingCollectionName}
                    setEditingCollectionDescription={
                      setEditingCollectionDescription
                    }
                    setDeletingCollection={setDeletingCollection}
                  />
                )}

              <StructureMiniDisplay
                currentCollection={currentCollection}
                profile={profile}
                setCreatingStructure={setCreatingStructure}
                setStructureID={setStructureID}
                setStructureName={setStructureName}
                setStructureDescription={setStructureDescription}
                setStructureType={setStructureType}
                setStructureDefault={setStructureDefault}
                setStructureMin={setStructureMin}
                setStructureMax={setStructureMax}
                setStructureEncrypted={setStructureEncrypted}
                setStructureUnique={setStructureUnique}
                setStructureRegex={setStructureRegex}
                setStructureArray={setStructureArray}
                setStructureRequired={setStructureRequired}
                filter={filter}
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
                limit={limit}
              />

              <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
                {currentCollection &&
                  currentCollection.structures &&
                  currentCollection.structures.length > 0 &&
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
                      <StructureField
                        key={`sl-${s.id}`}
                        structure={s}
                        profile={profile}
                        setEditingStructure={setEditingStructure}
                        setStructureID={setStructureID}
                        setEditStructureID={setEditStructureID}
                        setStructureName={setStructureName}
                        setStructureDescription={setStructureDescription}
                        setStructureType={setStructureType}
                        setStructureDefault={setStructureDefault}
                        setStructureMin={setStructureMin}
                        setStructureMax={setStructureMax}
                        setStructureEncrypted={setStructureEncrypted}
                        setStructureUnique={setStructureUnique}
                        setStructureRegex={setStructureRegex}
                        setStructureArray={setStructureArray}
                        setStructureRequired={setStructureRequired}
                        setDeletingStructure={setDeletingStructure}
                      />
                    ))}
              </div>

              <CustomStructureMiniDisplay
                currentCollection={currentCollection}
                profile={profile}
                setCreatingCustomStructure={setCreatingCustomStructure}
                setCustomStructureID={setCustomStructureID}
                setEditCustomStructureID={setEditCustomStructureID}
                setCustomStructureName={setCustomStructureName}
                setCustomStructureDescription={setCustomStructureDescription}
                filter={customFilter}
                setFilter={setCustomFilter}
                setCustomCurrentPage={setCustomCurrentPage}
                customLimit={customLimit}
              />

              <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
                {currentCollection &&
                  currentCollection.custom_structures &&
                  currentCollection.custom_structures.length > 0 &&
                  currentCollection.custom_structures
                    .filter(
                      (s) =>
                        customFilter.length <= 0 ||
                        s.id
                          .toLowerCase()
                          .includes(customFilter.trim().toLowerCase()) ||
                        s.name
                          .toLowerCase()
                          .includes(customFilter.trim().toLowerCase())
                    )
                    .slice(
                      currentCustomPage * customLimit,
                      customLimit + currentCustomPage * customLimit
                    )
                    .map((s) => (
                      <CustomStructureField
                        key={`csl-${s.id}`}
                        structure={s}
                        profile={profile}
                        project_id={project_id ? project_id : ''}
                        collection_id={collection_id ? collection_id : ''}
                        setEditingCustomStructure={setEditingCustomStructure}
                        setCustomStructureID={setCustomStructureID}
                        setEditCustomStructureID={setEditCustomStructureID}
                        setCustomStructureName={setCustomStructureName}
                        setCustomStructureDescription={
                          setCustomStructureDescription
                        }
                        setDeletingCustomStructure={setDeletingCustomStructure}
                      />
                    ))}
              </div>
            </div>
          </div>
        ) : currentProject ? (
          <StructurePicker
            API_URL={API_URL}
            PUBLIC_URL={PUBLIC_URL}
            addMedia={addMedia}
            // isCreating={
            //   creatingStructure ? creatingStructure : editingStructure
            // }
            setIsCreating={
              creatingStructure ? setCreatingStructure : setEditingStructure
            }
            collectionName={currentCollection ? currentCollection.name : ''}
            name={structureName}
            setName={setStructureName}
            description={structureDescription}
            setDescription={setStructureDescription}
            structureID={creatingStructure ? structureID : editStructureID}
            setStructureID={
              creatingStructure ? setStructureID : setEditStructureID
            }
            type={structureType}
            setType={setStructureType}
            defaultVal={structureDefault}
            setDefaultVal={setStructureDefault}
            min={structureMin}
            setMin={setStructureMin}
            max={structureMax}
            setMax={setStructureMax}
            encrypted={structureEncrypted}
            setEncrypted={setStructureEncrypted}
            unique={structureUnique}
            setUnique={setStructureUnique}
            regex={structureRegex}
            setRegex={setStructureRegex}
            array={structureArray}
            setArray={setStructureArray}
            required={structureRequired}
            setRequired={setStructureRequired}
            alert={alert}
            submitStructure={() =>
              creatingStructure
                ? submitCreateStructure(
                    API_URL,
                    profile,
                    currentProject,
                    collection_id ? collection_id : '',
                    structureID,
                    setStructureID,
                    structureName,
                    setStructureName,
                    structureDescription,
                    setStructureDescription,
                    structureType,
                    setStructureType,
                    structureDefault,
                    setStructureDefault,
                    structureMin,
                    setStructureMin,
                    structureMax,
                    setStructureMax,
                    structureEncrypted,
                    setStructureEncrypted,
                    structureUnique,
                    setStructureUnique,
                    structureRegex,
                    setStructureRegex,
                    structureArray,
                    setStructureArray,
                    structureRequired,
                    setStructureRequired,
                    setEditStructureID,
                    setCreatingStructure,
                    setCurrentCollection,
                    alert,
                    ''
                  )
                : submitUpdateStructure(
                    API_URL,
                    profile,
                    currentProject,
                    collection_id ? collection_id : '',
                    structureID,
                    setStructureID,
                    structureName,
                    setStructureName,
                    structureDescription,
                    setStructureDescription,
                    structureType,
                    setStructureType,
                    structureDefault,
                    setStructureDefault,
                    structureMin,
                    setStructureMin,
                    structureMax,
                    setStructureMax,
                    structureEncrypted,
                    setStructureEncrypted,
                    structureUnique,
                    setStructureUnique,
                    structureRegex,
                    setStructureRegex,
                    structureArray,
                    setStructureArray,
                    structureRequired,
                    setStructureRequired,
                    editStructureID,
                    setEditStructureID,
                    setEditingStructure,
                    setCurrentCollection,
                    alert,
                    ''
                  )
            }
            isEditing={!creatingStructure}
            customStructureName={customStructureName}
          />
        ) : (
          <div></div>
        )}
      </div>

      {currentProject && currentCollection && (
        <ViewCollectionIncludes
          API_URL={API_URL}
          profile={profile}
          currentProject={currentProject}
          currentCollection={currentCollection}
          setCurrentCollection={setCurrentCollection}
          editCollectionID={editCollectionID}
          setEditCollectionID={setEditCollectionID}
          collectionID={collection_id ? collection_id : ''}
          collectionName={collectionName}
          setCollectionName={setCollectionName}
          collectionDescription={collectionDescription}
          setCollectionDescription={setCollectionDescription}
          editingCollectionID={editingCollectionID}
          setEditingCollectionID={setEditingCollectionID}
          editingCollectionName={editingCollectionName}
          setEditingCollectionName={setEditingCollectionName}
          editingCollectionDescription={editingCollectionDescription}
          setEditingCollectionDescription={setEditingCollectionDescription}
          deletingCollection={deletingCollection}
          setDeletingCollection={setDeletingCollection}
          structureID={structureID}
          setStructureID={setStructureID}
          structureName={structureName}
          setStructureName={setStructureName}
          setStructureDescription={setStructureDescription}
          deletingStructure={deletingStructure}
          setDeletingStructure={setDeletingStructure}
          setEditStructureID={setEditStructureID}
          creatingCustomStructure={creatingCustomStructure}
          setCreatingCustomStructure={setCreatingCustomStructure}
          customStructureID={customStructureID}
          setCustomStructureID={setCustomStructureID}
          customStructureName={customStructureName}
          setCustomStructureName={setCustomStructureName}
          customStructureDescription={customStructureDescription}
          setCustomStructureDescription={setCustomStructureDescription}
          editCustomStructureID={editCustomStructureID}
          setEditCustomStructureID={setEditCustomStructureID}
          editingCustomStructure={editingCustomStructure}
          setEditingCustomStructure={setEditingCustomStructure}
          deletingCustomStructure={deletingCustomStructure}
          setDeletingCustomStructure={setDeletingCustomStructure}
          navigate={navigate}
          alert={alert}
        />
      )}
    </div>
  );
}
