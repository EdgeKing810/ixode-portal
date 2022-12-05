import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-ignores
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { IProject, useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import ProjectDisplay from '../components/viewProject/ProjectDisplay';
import CollectionItem from '../components/collections/CollectionItem';
import ViewProjectIncludes from '../components/viewProject/ViewProjectIncludes';
import ViewProjectBulk from '../components/viewProject/ViewProjectBulk';
import { ICollection } from '../stores/useCollectionStore';

export default function ViewProject() {
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

  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [projectID, setProjectID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [apiPath, setApiPath] = useState('');
  const [members, setMembers] = useState<Array<string>>([]);

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
  const [collections, setCollections] = useState<Array<ICollection>>([]);

  const escFunction = useCallback((event: any) => {
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
        .get(
          `${API_URL}/collection/fetch?uid=${profile.uid}&project_id=${project_id}`,
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
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="projects" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="projects" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
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
              <ProjectDisplay
                currentProject={currentProject}
                profile={profile}
                setEditingProject={setEditingProject}
                setShowMembers={setShowMembers}
                setMembers={setMembers}
                setProjectID={setProjectID}
                setName={setName}
                setMemberCurrentPage={setMemberCurrentPage}
                setAddMember={setAddMember}
                setRemoveMember={setRemoveMember}
                setDeletingProject={setDeletingProject}
                allProfiles={allProfiles}
              />
            )}

            <ViewProjectBulk
              collections={collections}
              profile={profile}
              isLoading={isLoading}
              setCreatingCollection={setCreatingCollection}
              setCollectionID={setCollectionID}
              setCollectionName={setCollectionName}
              setCollectionDescription={setCollectionDescription}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
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
                    <CollectionItem
                      key={`cl-${c.id}`}
                      collection={c}
                      project_id={project_id ? project_id : ''}
                      profile={profile}
                      setCollectionID={setCollectionID}
                      setEditCollectionID={setEditCollectionID}
                      setEditingCollectionID={setEditingCollectionID}
                      setCollectionName={setCollectionName}
                      setEditingCollectionName={setEditingCollectionName}
                      setCollectionDescription={setCollectionDescription}
                      setEditingCollectionDescription={
                        setEditingCollectionDescription
                      }
                      setDeletingCollection={setDeletingCollection}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>

      {currentProject && (
        <ViewProjectIncludes
          API_URL={API_URL}
          profile={profile}
          allProfiles={allProfiles}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          projectID={projectID}
          setProjectID={setProjectID}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          apiPath={apiPath}
          setApiPath={setApiPath}
          addProject={addProject}
          updateProject={updateProject}
          removeProject={removeProject}
          showMembers={showMembers}
          setShowMembers={setShowMembers}
          members={members}
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
          creatingCollection={creatingCollection}
          setCreatingCollection={setCreatingCollection}
          collectionID={collectionID}
          setCollectionID={setCollectionID}
          collectionName={collectionName}
          setCollectionName={setCollectionName}
          collectionDescription={collectionDescription}
          setCollectionDescription={setCollectionDescription}
          setCollections={setCollections}
          editingCollectionID={editingCollectionID}
          setEditingCollectionID={setEditingCollectionID}
          editCollectionID={editCollectionID}
          setEditCollectionID={setEditCollectionID}
          editingCollectionName={editingCollectionName}
          setEditingCollectionName={setEditingCollectionName}
          editingCollectionDescription={editingCollectionDescription}
          setEditingCollectionDescription={setEditingCollectionDescription}
          deletingCollection={deletingCollection}
          setDeletingCollection={setDeletingCollection}
          navigate={navigate}
          alert={alert}
        />
      )}
    </div>
  );
}
