import axios from 'axios';
import {
  convertDateToBackendFormat,
  convertDateTimeToBackendFormat,
} from '../../utils/timestamp';

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
  structureRequired,
  setStructureRequired,
  setEditStructureID,
  setCreatingStructure,
  setCurrentCollection,
  alert,
  customStructureID
) => {
  let finalDefault = structureDefault;
  if (structureType === 'DATETIME') {
    finalDefault = convertDateTimeToBackendFormat(new Date(structureDefault));
  } else if (structureType === 'DATE') {
    finalDefault = convertDateToBackendFormat(new Date(structureDefault));
  }

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
      default_val:
        finalDefault === true
          ? 'true'
          : finalDefault === false
          ? 'false'
          : finalDefault,
      min: parseInt(structureMin),
      max: parseInt(structureMax),
      encrypted: structureEncrypted,
      unique: structureUnique,
      regex_pattern: structureRegex,
      array: structureArray,
      required: structureRequired,
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

        if (customStructureID.length <= 0) {
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.structures = [
              ...updatedCollection.structures,
              data.structure,
            ];
            return updatedCollection;
          });
        } else {
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.custom_structures =
              updatedCollection.custom_structures.map((cs) => {
                let updatedCustomStructure = { ...cs };
                if (updatedCustomStructure.id === customStructureID) {
                  updatedCustomStructure.structures = [
                    ...updatedCustomStructure.structures,
                    data.structure,
                  ];
                }
                return updatedCustomStructure;
              });
            return updatedCollection;
          });
        }

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
        setStructureRequired(false);
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
  structureRequired,
  setStructureRequired,
  editStructureID,
  setEditStructureID,
  setEditingStructure,
  setCurrentCollection,
  alert,
  customStructureID
) => {
  let finalDefault = structureDefault;
  if (structureType === 'DATETIME') {
    finalDefault = convertDateTimeToBackendFormat(new Date(structureDefault));
  } else if (structureType === 'DATE') {
    finalDefault = convertDateToBackendFormat(new Date(structureDefault));
  }

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
      default_val:
        finalDefault === true
          ? 'true'
          : finalDefault === false
          ? 'false'
          : finalDefault,
      min: parseInt(structureMin),
      max: parseInt(structureMax),
      encrypted: structureEncrypted,
      unique: structureUnique,
      regex_pattern: structureRegex,
      array: structureArray,
      required: structureRequired,
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

        if (customStructureID.length <= 0) {
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
        } else {
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.custom_structures =
              updatedCollection.custom_structures.map((cs) => {
                let updatedCustomStructure = { ...cs };
                if (updatedCustomStructure.id === customStructureID) {
                  updatedCustomStructure.structures = [
                    ...updatedCustomStructure.structures.filter(
                      (s) => s.id !== data.structure_id
                    ),
                    data.structure,
                  ];
                }
                return updatedCustomStructure;
              });
            return updatedCollection;
          });
        }

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
        setStructureRequired(false);
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
  alert,
  customStructureID
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

        if (customStructureID.length <= 0) {
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.structures = updatedCollection.structures.filter(
              (s) => s.id !== data.structure_id
            );
            return updatedCollection;
          });
        } else {
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.custom_structures =
              updatedCollection.custom_structures.map((cs) => {
                let updatedCustomStructure = { ...cs };
                if (updatedCustomStructure.id === customStructureID) {
                  updatedCustomStructure.structures = [
                    ...updatedCustomStructure.structures.filter(
                      (s) => s.id !== data.structure_id
                    ),
                  ];
                }
                return updatedCustomStructure;
              });
            return updatedCollection;
          });
        }

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
