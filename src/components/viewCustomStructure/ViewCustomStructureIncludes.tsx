import React from 'react';

import IncludeEditCustomStructure from '../../pages/includes/custom_structures/IncludeEditCustomStructure';
import IncludeDeleteCustomStructure from '../../pages/includes/custom_structures/IncludeDeleteCustomStructure';

import IncludeDeleteStructure from '../../pages/includes/structures/IncludeDeleteStructure';

import {
  submitDeleteCustomStructure,
  submitUpdateCustomStructure,
} from '../custom_structures/custom_structure.utils';

import { submitDeleteStructure } from '../structures/structure.utils';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IProject } from '../../stores/useProjectStore';
import { ICollection } from '../../stores/useCollectionStore';
import { NavigateFunction } from 'react-router-dom';

export default function ViewCustomStructureIncludes({
  API_URL,
  profile,
  currentProject,
  currentCollection,
  setCurrentCollection,
  collectionID,
  structureID,
  setStructureID,
  structureName,
  setStructureName,
  setStructureDescription,
  deletingStructure,
  setDeletingStructure,
  setEditStructureID,
  customStructureID,
  customStructureName,
  setCustomStructureName,
  customStructureDescription,
  setCustomStructureDescription,
  editCustomStructureID,
  setEditCustomStructureID,
  editingCustomStructureID,
  setEditingCustomStructureID,
  editingCustomStructureName,
  setEditingCustomStructureName,
  editingCustomStructureDescription,
  setEditingCustomStructureDescription,
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
  collectionID: string;
  structureID: string;
  setStructureID: React.Dispatch<React.SetStateAction<string>>;
  structureName: string;
  setStructureName: React.Dispatch<React.SetStateAction<string>>;
  setStructureDescription: React.Dispatch<React.SetStateAction<string>>;
  deletingStructure: boolean;
  setDeletingStructure: React.Dispatch<React.SetStateAction<boolean>>;
  setEditStructureID: React.Dispatch<React.SetStateAction<string>>;
  customStructureID: string;
  customStructureName: string;
  setCustomStructureName: React.Dispatch<React.SetStateAction<string>>;
  customStructureDescription: string;
  setCustomStructureDescription: React.Dispatch<React.SetStateAction<string>>;
  editCustomStructureID: string;
  setEditCustomStructureID: React.Dispatch<React.SetStateAction<string>>;
  editingCustomStructureID: boolean;
  setEditingCustomStructureID: React.Dispatch<React.SetStateAction<boolean>>;
  editingCustomStructureName: boolean;
  setEditingCustomStructureName: React.Dispatch<React.SetStateAction<boolean>>;
  editingCustomStructureDescription: boolean;
  setEditingCustomStructureDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  deletingCustomStructure: boolean;
  setDeletingCustomStructure: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  alert: any;
}) {
  return (
    <div className="w-full">
      <IncludeEditCustomStructure
        isEditing={editingCustomStructureID}
        setIsEditing={setEditingCustomStructureID}
        name={customStructureName}
        type="ID"
        data={editCustomStructureID}
        setData={setEditCustomStructureID}
        submitUpdate={() =>
          submitUpdateCustomStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            customStructureID,
            () => null,
            customStructureName,
            setCustomStructureName,
            customStructureDescription,
            setCustomStructureDescription,
            editCustomStructureID,
            setEditCustomStructureID,
            setEditingCustomStructureID,
            // @ts-ignore
            currentCollection.custom_structures.find(
              (cs) => cs.id === customStructureID
            ).structures,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        textarea={false}
      />

      <IncludeEditCustomStructure
        isEditing={editingCustomStructureName}
        setIsEditing={setEditingCustomStructureName}
        name={customStructureName}
        type="Name"
        data={customStructureName}
        setData={setCustomStructureName}
        submitUpdate={() =>
          submitUpdateCustomStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            customStructureID,
            () => null,
            customStructureName,
            setCustomStructureName,
            customStructureDescription,
            setCustomStructureDescription,
            editCustomStructureID,
            setEditCustomStructureID,
            setEditingCustomStructureName,
            // @ts-ignore
            currentCollection.custom_structures.find(
              (cs) => cs.id === customStructureID
            ).structures,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        textarea={false}
      />

      <IncludeEditCustomStructure
        isEditing={editingCustomStructureDescription}
        setIsEditing={setEditingCustomStructureDescription}
        name={customStructureName}
        type="Description"
        data={customStructureDescription}
        setData={setCustomStructureDescription}
        submitUpdate={() =>
          submitUpdateCustomStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
            customStructureID,
            () => null,
            customStructureName,
            setCustomStructureName,
            customStructureDescription,
            setCustomStructureDescription,
            editCustomStructureID,
            setEditCustomStructureID,
            setEditingCustomStructureDescription,
            // @ts-ignore
            currentCollection.custom_structures.find(
              (cs) => cs.id === customStructureID
            ).structures,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        textarea
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
            customStructureID
          )
        }
        name={structureName}
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
            () => null,
            setCustomStructureName,
            setCustomStructureDescription,
            setEditCustomStructureID,
            setDeletingCustomStructure,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        name={customStructureName}
      />
    </div>
  );
}
