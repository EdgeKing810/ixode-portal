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

import CustomStructureDisplay from '../components/custom_structures/CustomStructureDisplay';
import StructureMiniDisplay from '../components/structures/StructureMiniDisplay';
import StructureField from '../components/structures/StructureField';
import ViewCustomStructureIncludes from '../components/viewCustomStructure/ViewCustomStructureIncludes';

export default function ViewCustomStructure() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const { project_id, collection_id, custom_structure_id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const [currentProject, setCurrentProject] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentCustomStructure, setCurrentCustomStructure] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [editCustomStructureID, setEditCustomStructureID] = useState('');
  const [customStructureName, setCustomStructureName] = useState('');
  const [customStructureDescription, setCustomStructureDescription] =
    useState('');
  const [editingCustomStructureID, setEditingCustomStructureID] =
    useState(false);
  const [editingCustomStructureName, setEditingCustomStructureName] =
    useState(false);
  const [
    editingCustomStructureDescription,
    setEditingCustomStructureDescription,
  ] = useState(false);
  const [deletingCustomStructure, setDeletingCustomStructure] = useState(false);

  const [creatingStructure, setCreatingStructure] = useState(false);
  const [editingStructure, setEditingStructure] = useState(false);
  const [deletingStructure, setDeletingStructure] = useState(false);
  const [structureID, setStructureID] = useState('');
  const [editStructureID, setEditStructureID] = useState('');
  const [structureName, setStructureName] = useState('');
  const [structureDescription, setStructureDescription] = useState('');
  const [structureType, setStructureType] = useState('TEXT');
  const [structureDefault, setStructureDefault] = useState('');
  const [structureMin, setStructureMin] = useState(1);
  const [structureMax, setStructureMax] = useState(99);
  const [structureEncrypted, setStructureEncrypted] = useState(false);
  const [structureUnique, setStructureUnique] = useState(false);
  const [structureRegex, setStructureRegex] = useState('');
  const [structureArray, setStructureArray] = useState(false);
  const [structureRequired, setStructureRequired] = useState(false);

  const [customStructureStructures, setCustomStructureStructures] = useState(
    []
  );

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setEditingCustomStructureID(false);
      setEditingCustomStructureName(false);
      setEditingCustomStructureDescription(false);
      setDeletingCustomStructure(false);

      setCreatingStructure(false);
      setEditingStructure(false);
      setDeletingStructure(false);

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

              let current = foundCollection.custom_structures.find(
                (cs) => cs.id === custom_structure_id
              );

              if (current && current.id) {
                setCurrentCustomStructure(current);

                setEditCustomStructureID(current.id);
                setCustomStructureName(current.name);
                setCustomStructureDescription(current.description);
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
            !currentCollection.id ||
            !currentCustomStructure ||
            !currentCustomStructure.id ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : !currentProject ? (
                <Heading color="error">Project not found.</Heading>
              ) : !currentCollection ? (
                <Heading color="error">Collection not found.</Heading>
              ) : !currentCustomStructure ? (
                <Heading color="error">Custom Structure not found.</Heading>
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
              currentCustomStructure &&
              currentCustomStructure.id && (
                <CustomStructureDisplay
                  project_id={project_id}
                  collection_id={collection_id}
                  profile={profile}
                  currentProject={currentProject}
                  currentCollection={currentCollection}
                  currentCustomStructure={currentCustomStructure}
                  setEditingCustomStructureID={setEditingCustomStructureID}
                  setEditingCustomStructureName={setEditingCustomStructureName}
                  setEditingCustomStructureDescription={
                    setEditingCustomStructureDescription
                  }
                  setDeletingCustomStructure={setDeletingCustomStructure}
                  theme={theme}
                />
              )}

            <StructureMiniDisplay
              currentCollection={currentCustomStructure}
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
              theme={theme}
            />

            <div className="w-full lg:grid lg:grid-cols-3 lg:gap-4 flex flex-col">
              {currentCustomStructure &&
                currentCustomStructure.structures &&
                currentCustomStructure.structures.length > 0 &&
                currentCustomStructure.structures
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
                      theme={theme}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      <ViewCustomStructureIncludes
        API_URL={API_URL}
        profile={profile}
        currentProject={currentProject}
        currentCollection={currentCollection}
        setCurrentCollection={setCurrentCollection}
        collectionID={currentCollection && currentCollection.id}
        creatingStructure={creatingStructure}
        setCreatingStructure={setCreatingStructure}
        structureID={structureID}
        setStructureID={setStructureID}
        structureName={structureName}
        setStructureName={setStructureName}
        structureDescription={structureDescription}
        setStructureDescription={setStructureDescription}
        structureType={structureType}
        setStructureType={setStructureType}
        structureDefault={structureDefault}
        setStructureDefault={setStructureDefault}
        structureMin={structureMin}
        setStructureMin={setStructureMin}
        structureMax={structureMax}
        setStructureMax={setStructureMax}
        structureEncrypted={structureEncrypted}
        setStructureEncrypted={setStructureEncrypted}
        structureUnique={structureUnique}
        setStructureUnique={setStructureUnique}
        structureRegex={structureRegex}
        setStructureRegex={setStructureRegex}
        structureArray={structureArray}
        setStructureArray={setStructureArray}
        structureRequired={structureRequired}
        setStructureRequired={setStructureRequired}
        editingStructure={editingStructure}
        setEditingStructure={setEditingStructure}
        deletingStructure={deletingStructure}
        setDeletingStructure={setDeletingStructure}
        editStructureID={editStructureID}
        setEditStructureID={setEditStructureID}
        customStructureID={custom_structure_id}
        customStructureName={customStructureName}
        setCustomStructureName={setCustomStructureName}
        customStructureDescription={customStructureDescription}
        setCustomStructureDescription={setCustomStructureDescription}
        editCustomStructureID={editCustomStructureID}
        setEditCustomStructureID={setEditCustomStructureID}
        customStructureStructures={customStructureStructures}
        setCustomStructureStructures={setCustomStructureStructures}
        editingCustomStructureID={editingCustomStructureID}
        setEditingCustomStructureID={setEditingCustomStructureID}
        editingCustomStructureName={editingCustomStructureName}
        setEditingCustomStructureName={setEditingCustomStructureName}
        editingCustomStructureDescription={editingCustomStructureDescription}
        setEditingCustomStructureDescription={
          setEditingCustomStructureDescription
        }
        deletingCustomStructure={deletingCustomStructure}
        setDeletingCustomStructure={setDeletingCustomStructure}
        navigate={navigate}
        theme={theme}
        alert={alert}
      />
    </div>
  );
}
