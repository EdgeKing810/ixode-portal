import React from 'react';
import IncludeDeleteCollection from '../../pages/includes/collection/IncludeDeleteCollection';

import IncludeEditCollection from '../../pages/includes/collection/IncludeEditCollection';

import IncludeCreateCustomStructure from '../../pages/includes/custom_structures/IncludeCreateCustomStructure';
import IncludeDeleteCustomStructure from '../../pages/includes/custom_structures/IncludeDeleteCustomStructure';

import IncludeCreateStructure from '../../pages/includes/structures/IncludeCreateStructure';
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

import {
  submitCreateStructure,
  submitDeleteStructure,
  submitUpdateStructure,
} from '../structures/structure.utils';

export default function ViewCollectionIncludes({
  API_URL,
  PUBLIC_URL,
  addMedia,
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
  creatingStructure,
  setCreatingStructure,
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
  editingStructure,
  setEditingStructure,
  deletingStructure,
  setDeletingStructure,
  editStructureID,
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

      <IncludeCreateStructure
        API_URL={API_URL}
        PUBLIC_URL={PUBLIC_URL}
        addMedia={addMedia}
        isCreating={creatingStructure}
        setIsCreating={setCreatingStructure}
        collectionName={currentCollection && currentCollection.name}
        name={structureName}
        setName={setStructureName}
        description={structureDescription}
        setDescription={setStructureDescription}
        structureID={structureID}
        setStructureID={setStructureID}
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
          submitCreateStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
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
            '',
            alert
          )
        }
        theme={theme}
      />

      <IncludeCreateStructure
        API_URL={API_URL}
        PUBLIC_URL={PUBLIC_URL}
        addMedia={addMedia}
        isCreating={editingStructure}
        setIsCreating={setEditingStructure}
        collectionName={currentCollection && currentCollection.name}
        name={structureName}
        setName={setStructureName}
        description={structureDescription}
        setDescription={setStructureDescription}
        structureID={editStructureID}
        setStructureID={setEditStructureID}
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
          submitUpdateStructure(
            API_URL,
            profile,
            currentProject,
            collectionID,
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
            '',
            alert
          )
        }
        theme={theme}
        isEditing
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
