import axios from 'axios';

export const submitCreateStructure = (
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
  customStructureID,
  alert
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    custom_structure_id: customStructureID,
    structure: {
      id: structureID,
      name: structureName,
      description: structureDescription,
      stype: structureType,
      default_val: structureDefault,
      min: parseInt(structureMin),
      max: parseInt(structureMax),
      encrypted: structureEncrypted,
      unique: structureUnique,
      regex_pattern: structureRegex,
      array: structureArray,
    },
  };

  axios
    .post(
      `${API_URL}/structure/add`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Structure Created!');

        setCreatingStructure(false);

        setCurrentCollection((prev) => {
          let updatedCollection = { ...prev };
          updatedCollection.structures = [
            ...updatedCollection.structures,
            data.structure,
          ];
          return updatedCollection;
        });

        setStructureID('');
        setEditStructureID('');
        setStructureName('');
        setStructureDescription('');
        setStructureType('TEXT');
        setStructureDefault('');
        setStructureMin(1);
        setStructureMax(99);
        setStructureEncrypted(false);
        setStructureUnique(false);
        setStructureRegex('');
        setStructureArray(false);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateStructure = (
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
  customStructureID,
  alert
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    structure_id: structureID,
    custom_structure_id: customStructureID,
    structure: {
      id: editStructureID,
      name: structureName,
      description: structureDescription,
      stype: structureType,
      default_val: structureDefault,
      min: parseInt(structureMin),
      max: parseInt(structureMax),
      encrypted: structureEncrypted,
      unique: structureUnique,
      regex_pattern: structureRegex,
      array: structureArray,
    },
  };

  axios
    .post(
      `${API_URL}/structure/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Structure Updated!');

        setEditingStructure(false);

        setCurrentCollection((prev) => {
          let updatedCollection = { ...prev };
          updatedCollection.structures = [
            ...updatedCollection.structures.filter(
              (s) => s.id !== data.structure_id
            ),
            data.structure,
          ];
          return updatedCollection;
        });

        setStructureID('');
        setEditStructureID('');
        setStructureName('');
        setStructureDescription('');
        setStructureType('TEXT');
        setStructureDefault('');
        setStructureMin(1);
        setStructureMax(99);
        setStructureEncrypted(false);
        setStructureUnique(false);
        setStructureRegex('');
        setStructureArray(false);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteStructure = (
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
  customStructureID,
  alert
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    structure_id: structureID,
    custom_structure_id: customStructureID,
  };

  axios
    .post(
      `${API_URL}/structure/delete`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Structure Deleted!');

        setDeletingStructure(false);

        setCurrentCollection((prev) => {
          let updatedCollection = { ...prev };
          updatedCollection.structures = updatedCollection.structures.filter(
            (s) => s.id !== data.structure_id
          );
          return updatedCollection;
        });

        setStructureID('');
        setEditStructureID('');
        setStructureName('');
        setStructureDescription('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
