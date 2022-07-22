import React from 'react';

import IncludeEditCustomStructure from '../../pages/includes/custom_structures/IncludeEditCustomStructure';
import IncludeDeleteCustomStructure from '../../pages/includes/custom_structures/IncludeDeleteCustomStructure';

import IncludeCreateStructure from '../../pages/includes/structures/IncludeCreateStructure';
import IncludeDeleteStructure from '../../pages/includes/structures/IncludeDeleteStructure';

import {
  submitDeleteCustomStructure,
  submitUpdateCustomStructure,
} from '../custom_structures/custom_structure.utils';

import {
  submitCreateStructure,
  submitDeleteStructure,
  submitUpdateStructure,
} from '../structures/structure.utils';

export default function ViewCustomStructureIncludes({
  API_URL,
  profile,
  currentProject,
  currentCollection,
  setCurrentCollection,
  collectionID,
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
  editingStructure,
  setEditingStructure,
  deletingStructure,
  setDeletingStructure,
  editStructureID,
  setEditStructureID,
  customStructureID,
  customStructureName,
  setCustomStructureName,
  customStructureDescription,
  setCustomStructureDescription,
  editCustomStructureID,
  setEditCustomStructureID,
  customStructureStructures,
  setCustomStructureStructures,
  editingCustomStructureID,
  setEditingCustomStructureID,
  editingCustomStructureName,
  setEditingCustomStructureName,
  editingCustomStructureDescription,
  setEditingCustomStructureDescription,
  deletingCustomStructure,
  setDeletingCustomStructure,
  navigate,
  theme,
  alert,
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
            () => null,
            customStructureStructures,
            setCustomStructureStructures,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        theme={theme}
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
            () => null,
            customStructureStructures,
            setCustomStructureStructures,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        theme={theme}
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
            () => null,
            customStructureStructures,
            setCustomStructureStructures,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        theme={theme}
        textarea
      />

      <IncludeCreateStructure
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
            setEditStructureID,
            setCreatingStructure,
            setCurrentCollection,
            alert,
            customStructureID
          )
        }
        theme={theme}
      />

      <IncludeCreateStructure
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
            editStructureID,
            setEditStructureID,
            setEditingStructure,
            setCurrentCollection,
            alert,
            customStructureID
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
            customStructureID
          )
        }
        name={structureName}
        theme={theme}
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
            setCustomStructureStructures,
            setDeletingCustomStructure,
            setCurrentCollection,
            alert,
            true,
            navigate
          )
        }
        name={customStructureName}
        theme={theme}
      />
    </div>
  );
}
