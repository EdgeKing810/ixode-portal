import React from 'react';

import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';
import IncludeAddMembers from '../../pages/includes/projects/IncludeAddMembers';
import IncludeDeleteMembers from '../../pages/includes/projects/IncludeDeleteMembers';
import IncludeEditProject from '../../pages/includes/projects/IncludeEditProject';
import IncludeDeleteProject from '../../pages/includes/projects/IncludeDeleteProject';

import IncludeCreateCollection from '../../pages/includes/collection/IncludeCreateCollection';
import IncludeEditCollection from '../../pages/includes/collection/IncludeEditCollection';
import IncludeDeleteCollection from '../../pages/includes/collection/IncludeDeleteCollection';

import {
  submitUpdateProjectID,
  submitUpdateProjectName,
  submitUpdateProjectDescription,
  submitUpdateProjectAPIPath,
  submitAddMember,
  submitRemoveMember,
  submitDeleteProject,
} from './view.project.utils';

import {
  submitCreateCollection,
  submitUpdateCollectionID,
  submitUpdateCollectionName,
  submitUpdateCollectionDescription,
  submitDeleteCollection,
} from '../collections/collection.utils';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IProfile } from '../../stores/useProfileStore';
import { IProject } from '../../stores/useProjectStore';
import { ICollection } from '../../stores/useCollectionStore';
import { NavigateFunction } from 'react-router-dom';

export default function ViewProjectIncludes({
  API_URL,
  profile,
  allProfiles,
  currentProject,
  setCurrentProject,
  editingProject,
  setEditingProject,
  projectID,
  setProjectID,
  name,
  setName,
  description,
  setDescription,
  apiPath,
  setApiPath,
  addProject,
  updateProject,
  removeProject,
  showMembers,
  setShowMembers,
  members,
  memberLimit,
  memberCurrentPage,
  setMemberCurrentPage,
  addMember,
  setAddMember,
  addProjectMember,
  removeMember,
  setRemoveMember,
  removeProjectMember,
  deletingProject,
  setDeletingProject,
  creatingCollection,
  setCreatingCollection,
  collectionID,
  setCollectionID,
  collectionName,
  setCollectionName,
  collectionDescription,
  setCollectionDescription,
  setCollections,
  editingCollectionID,
  setEditingCollectionID,
  editCollectionID,
  setEditCollectionID,
  editingCollectionName,
  setEditingCollectionName,
  editingCollectionDescription,
  setEditingCollectionDescription,
  deletingCollection,
  setDeletingCollection,
  navigate,
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  allProfiles: Array<IProfile>;
  currentProject: IProject;
  setCurrentProject: React.Dispatch<React.SetStateAction<IProject | null>>;
  editingProject: string;
  setEditingProject: React.Dispatch<React.SetStateAction<string>>;
  projectID: string;
  setProjectID: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  apiPath: string;
  setApiPath: React.Dispatch<React.SetStateAction<string>>;
  addProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void;
  updateProject: (
    id: string,
    name: string,
    description: string,
    api_path: string,
    members: Array<string>
  ) => void;
  removeProject: (id: string) => void;
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  members: Array<string>;
  memberLimit: number;
  memberCurrentPage: number;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  addMember: boolean;
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  addProjectMember: (id: string, member: string) => void;
  removeMember: boolean;
  setRemoveMember: React.Dispatch<React.SetStateAction<boolean>>;
  removeProjectMember: (id: string, member: string) => void;
  deletingProject: boolean;
  setDeletingProject: React.Dispatch<React.SetStateAction<boolean>>;
  creatingCollection: boolean;
  setCreatingCollection: React.Dispatch<React.SetStateAction<boolean>>;
  collectionID: string;
  setCollectionID: React.Dispatch<React.SetStateAction<string>>;
  collectionName: string;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
  collectionDescription: string;
  setCollectionDescription: React.Dispatch<React.SetStateAction<string>>;
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>;
  editingCollectionID: boolean;
  setEditingCollectionID: React.Dispatch<React.SetStateAction<boolean>>;
  editCollectionID: string;
  setEditCollectionID: React.Dispatch<React.SetStateAction<string>>;
  editingCollectionName: boolean;
  setEditingCollectionName: React.Dispatch<React.SetStateAction<boolean>>;
  editingCollectionDescription: boolean;
  setEditingCollectionDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  deletingCollection: boolean;
  setDeletingCollection: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  alert: any;
}) {
  return (
    <div className="w-full">
      <IncludeEditProject
        isEditing={editingProject.length > 0}
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
        submitUpdate={() =>
          editingProject === 'ID'
            ? submitUpdateProjectID(
                API_URL,
                profile,
                currentProject,
                projectID,
                setEditingProject,
                name,
                description,
                apiPath,
                addProject,
                removeProject,
                navigate,
                alert
              )
            : editingProject === 'Name'
            ? submitUpdateProjectName(
                API_URL,
                profile,
                currentProject,
                name,
                setEditingProject,
                description,
                apiPath,
                updateProject,
                setCurrentProject,
                alert
              )
            : editingProject === 'Description'
            ? submitUpdateProjectDescription(
                API_URL,
                profile,
                currentProject,
                description,
                setEditingProject,
                name,
                apiPath,
                updateProject,
                setCurrentProject,
                alert
              )
            : submitUpdateProjectAPIPath(
                API_URL,
                profile,
                currentProject,
                apiPath,
                setEditingProject,
                name,
                description,
                updateProject,
                setCurrentProject,
                alert
              )
        }
        textarea={editingProject === 'Description'}
        format={editingProject === 'API Path'}
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
        submitAddMember={(uid) =>
          submitAddMember(
            API_URL,
            profile,
            uid,
            currentProject,
            setAddMember,
            addProjectMember,
            alert
          )
        }
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
        submitRemoveMember={(uid) =>
          submitRemoveMember(
            API_URL,
            profile,
            uid,
            currentProject,
            setRemoveMember,
            removeProjectMember,
            alert
          )
        }
      />

      <IncludeDeleteProject
        isActive={deletingProject}
        setIsActive={setDeletingProject}
        submitDeleteProject={() =>
          submitDeleteProject(
            API_URL,
            profile,
            currentProject,
            setDeletingProject,
            removeProject,
            navigate,
            alert
          )
        }
        name={name}
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
        submitCreateCollection={() =>
          submitCreateCollection(
            API_URL,
            profile,
            currentProject,
            collectionID,
            setCollectionID,
            collectionName,
            setCollectionName,
            collectionDescription,
            setCollectionDescription,
            setCreatingCollection,
            setCollections,
            alert
          )
        }
      />

      <IncludeEditCollection
        isEditing={editingCollectionID}
        setIsEditing={setEditingCollectionID}
        name={collectionName}
        type="ID"
        data={editCollectionID}
        setData={setEditCollectionID}
        submitUpdate={() =>
          submitUpdateCollectionID(
            API_URL,
            profile,
            currentProject,
            collectionID,
            editCollectionID,
            setEditingCollectionID,
            setCollections,
            alert,
            false,
            () => null,
            () => null
          )
        }
      />

      <IncludeEditCollection
        isEditing={editingCollectionName}
        setIsEditing={setEditingCollectionName}
        name={collectionName}
        type="Name"
        data={collectionName}
        setData={setCollectionName}
        submitUpdate={() =>
          submitUpdateCollectionName(
            API_URL,
            profile,
            currentProject,
            collectionID,
            collectionName,
            setEditingCollectionName,
            setCollections,
            alert,
            false,
            () => null,
            () => null
          )
        }
      />

      <IncludeEditCollection
        isEditing={editingCollectionDescription}
        setIsEditing={setEditingCollectionDescription}
        name={collectionName}
        type="Description"
        data={collectionDescription}
        setData={setCollectionDescription}
        submitUpdate={() =>
          submitUpdateCollectionDescription(
            API_URL,
            profile,
            currentProject,
            collectionID,
            collectionDescription,
            setEditingCollectionDescription,
            setCollections,
            alert,
            false,
            () => null,
            () => null
          )
        }
        textarea
      />

      <IncludeDeleteCollection
        isActive={deletingCollection}
        setIsActive={setDeletingCollection}
        submitDeleteCollection={() =>
          submitDeleteCollection(
            API_URL,
            profile,
            collectionID,
            currentProject,
            setDeletingCollection,
            setCollections,
            alert,
            false,
            () => null
          )
        }
        name={collectionName}
      />
    </div>
  );
}
