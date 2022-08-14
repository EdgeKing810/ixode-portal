import React from 'react';
import IncludeDeleteCollection from '../../pages/includes/collection/IncludeDeleteCollection';

import IncludeEditCollection from '../../pages/includes/collection/IncludeEditCollection';

import IncludeCreateCustomStructure from '../../pages/includes/custom_structures/IncludeCreateCustomStructure';
import IncludeDeleteCustomStructure from '../../pages/includes/custom_structures/IncludeDeleteCustomStructure';

import IncludeDeleteStructure from '../../pages/includes/structures/IncludeDeleteStructure';

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
  theme,
  alert,
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
        theme={theme}
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
        theme={theme}
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
        theme={theme}
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
        theme={theme}
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
        theme={theme}
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
        theme={theme}
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
            currentCollection.custom_structures.find(
              (cs) => cs.id === customStructureID
            ).structures,
            setCurrentCollection,
            alert
          )
        }
        theme={theme}
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
            alert
          )
        }
        name={customStructureName}
        theme={theme}
      />
    </div>
  );
}
