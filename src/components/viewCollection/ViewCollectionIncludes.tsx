import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import IncludeDeleteCollection from '../../pages/includes/collection/IncludeDeleteCollection';

import IncludeEditCollection from '../../pages/includes/collection/IncludeEditCollection';

import IncludeCreateCustomStructure from '../../pages/includes/custom_structures/IncludeCreateCustomStructure';
import IncludeDeleteCustomStructure from '../../pages/includes/custom_structures/IncludeDeleteCustomStructure';

import IncludeDeleteStructure from '../../pages/includes/structures/IncludeDeleteStructure';
import { ICollection } from '../../stores/useCollectionStore';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

import {
  submitDeleteCollection,
  submitUpdateCollectionDescription,
  submitUpdateCollectionID,
  submitUpdateCollectionName,
} from '../collections/collection.utils';

import {
  submitCreateCustomStructure,
  submitDeleteCustomStructure,
  submitUpdateCustomStructure,
} from '../custom_structures/custom_structure.utils';

import { submitDeleteStructure } from '../structures/structure.utils';

export default function ViewCollectionIncludes({
  API_URL,
  profile,
  currentProject,
  currentCollection,
  setCurrentCollection,
  editCollectionID,
  setEditCollectionID,
  collectionID,
  collectionName,
  setCollectionName,
  collectionDescription,
  setCollectionDescription,
  editingCollectionID,
  setEditingCollectionID,
  editingCollectionName,
  setEditingCollectionName,
  editingCollectionDescription,
  setEditingCollectionDescription,
  deletingCollection,
  setDeletingCollection,
  structureID,
  setStructureID,
  structureName,
  setStructureName,
  setStructureDescription,
  deletingStructure,
  setDeletingStructure,
  setEditStructureID,
  creatingCustomStructure,
  setCreatingCustomStructure,
  customStructureID,
  setCustomStructureID,
  customStructureName,
  setCustomStructureName,
  customStructureDescription,
  setCustomStructureDescription,
  editCustomStructureID,
  setEditCustomStructureID,
  editingCustomStructure,
  setEditingCustomStructure,
  deletingCustomStructure,
  setDeletingCustomStructure,
  navigate,
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  currentProject: IProject;
  currentCollection: ICollection;
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >;
  editCollectionID: string;
  setEditCollectionID: React.Dispatch<React.SetStateAction<string>>;
  collectionID: string;
  collectionName: string;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
  collectionDescription: string;
  setCollectionDescription: React.Dispatch<React.SetStateAction<string>>;
  editingCollectionID: boolean;
  setEditingCollectionID: React.Dispatch<React.SetStateAction<boolean>>;
  editingCollectionName: boolean;
  setEditingCollectionName: React.Dispatch<React.SetStateAction<boolean>>;
  editingCollectionDescription: boolean;
  setEditingCollectionDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  deletingCollection: boolean;
  setDeletingCollection: React.Dispatch<React.SetStateAction<boolean>>;
  structureID: string;
  setStructureID: React.Dispatch<React.SetStateAction<string>>;
  structureName: string;
  setStructureName: React.Dispatch<React.SetStateAction<string>>;
  setStructureDescription: React.Dispatch<React.SetStateAction<string>>;
  deletingStructure: boolean;
  setDeletingStructure: React.Dispatch<React.SetStateAction<boolean>>;
  setEditStructureID: React.Dispatch<React.SetStateAction<string>>;
  creatingCustomStructure: boolean;
  setCreatingCustomStructure: React.Dispatch<React.SetStateAction<boolean>>;
  customStructureID: string;
  setCustomStructureID: React.Dispatch<React.SetStateAction<string>>;
  customStructureName: string;
  setCustomStructureName: React.Dispatch<React.SetStateAction<string>>;
  customStructureDescription: string;
  setCustomStructureDescription: React.Dispatch<React.SetStateAction<string>>;
  editCustomStructureID: string;
  setEditCustomStructureID: React.Dispatch<React.SetStateAction<string>>;
  editingCustomStructure: boolean;
  setEditingCustomStructure: React.Dispatch<React.SetStateAction<boolean>>;
  deletingCustomStructure: boolean;
  setDeletingCustomStructure: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  alert: any;
}) {
  return (
    <div className="w-full">
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
            () => null,
            alert,
            true,
            setCurrentCollection,
            navigate
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
            () => null,
            alert,
            true,
            setCurrentCollection,
            navigate
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
            () => null,
            alert,
            true,
            setCurrentCollection,
            navigate
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
            () => null,
            alert,
            true,
            navigate
          )
        }
        name={collectionName}
      />

      <IncludeDeleteStructure
        isActive={deletingStructure}
        setIsActive={setDeletingStructure}
        submitDeleteStructure={() =>
          submitDeleteStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            structureID,
            setStructureID,
            setStructureName,
            setStructureDescription,
            setEditStructureID,
            setDeletingStructure,
            setCurrentCollection,
            alert,
            ''
          )
        }
        name={structureName}
      />

      <IncludeCreateCustomStructure
        isCreating={creatingCustomStructure}
        setIsCreating={setCreatingCustomStructure}
        collectionName={currentCollection && currentCollection.name}
        name={customStructureName}
        setName={setCustomStructureName}
        description={customStructureDescription}
        setDescription={setCustomStructureDescription}
        customStructureID={customStructureID}
        setCustomStructureID={setCustomStructureID}
        submitCustomStructure={() =>
          submitCreateCustomStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            customStructureID,
            setCustomStructureID,
            customStructureName,
            setCustomStructureName,
            customStructureDescription,
            setCustomStructureDescription,
            setEditCustomStructureID,
            setCreatingCustomStructure,
            setCurrentCollection,
            alert
          )
        }
        isEditing={false}
      />

      <IncludeCreateCustomStructure
        isCreating={editingCustomStructure}
        setIsCreating={setEditingCustomStructure}
        collectionName={currentCollection && currentCollection.name}
        name={customStructureName}
        setName={setCustomStructureName}
        description={customStructureDescription}
        setDescription={setCustomStructureDescription}
        customStructureID={editCustomStructureID}
        setCustomStructureID={setEditCustomStructureID}
        submitCustomStructure={() =>
          submitUpdateCustomStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            customStructureID,
            setCustomStructureID,
            customStructureName,
            setCustomStructureName,
            customStructureDescription,
            setCustomStructureDescription,
            editCustomStructureID,
            setEditCustomStructureID,
            setEditingCustomStructure,
            // @ts-ignore
            currentCollection.custom_structures.find(
              (cs) => cs.id === customStructureID
            ).structures,
            setCurrentCollection,
            alert,
            false,
            navigate
          )
        }
        isEditing
      />

      <IncludeDeleteCustomStructure
        isActive={deletingCustomStructure}
        setIsActive={setDeletingCustomStructure}
        submitDeleteCustomStructure={() =>
          submitDeleteCustomStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            customStructureID,
            setCustomStructureID,
            setCustomStructureName,
            setCustomStructureDescription,
            setEditCustomStructureID,
            setDeletingCustomStructure,
            setCurrentCollection,
            alert,
            false,
            navigate
          )
        }
        name={customStructureName}
      />
    </div>
  );
}
