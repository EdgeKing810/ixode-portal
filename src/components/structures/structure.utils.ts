import axios from 'axios';
import { ICollection } from '../../stores/useCollectionStore';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
import {
  convertDateToBackendFormat,
  convertDateTimeToBackendFormat,
} from '../../utils/timestamp';

export const submitCreateStructure = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  structureID: string,
  setStructureID: React.Dispatch<React.SetStateAction<string>>,
  structureName: string,
  setStructureName: React.Dispatch<React.SetStateAction<string>>,
  structureDescription: string,
  setStructureDescription: React.Dispatch<React.SetStateAction<string>>,
  structureType: string,
  setStructureType: React.Dispatch<React.SetStateAction<string>>,
  structureDefault: string | number | boolean | Date,
  setStructureDefault: React.Dispatch<
    React.SetStateAction<string | number | boolean | Date>
  >,
  structureMin: number,
  setStructureMin: React.Dispatch<React.SetStateAction<number>>,
  structureMax: number,
  setStructureMax: React.Dispatch<React.SetStateAction<number>>,
  structureEncrypted: boolean,
  setStructureEncrypted: React.Dispatch<React.SetStateAction<boolean>>,
  structureUnique: boolean,
  setStructureUnique: React.Dispatch<React.SetStateAction<boolean>>,
  structureRegex: string,
  setStructureRegex: React.Dispatch<React.SetStateAction<string>>,
  structureArray: boolean,
  setStructureArray: React.Dispatch<React.SetStateAction<boolean>>,
  structureRequired: boolean,
  setStructureRequired: React.Dispatch<React.SetStateAction<boolean>>,
  setEditStructureID: React.Dispatch<React.SetStateAction<string>>,
  setCreatingStructure: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCollection: React.Dispatch<React.SetStateAction<any>>,
  alert: any,
  customStructureID: string
) => {
  let finalDefault = structureDefault;
  if (structureType === 'DATETIME') {
    // @ts-ignore
    finalDefault = convertDateTimeToBackendFormat(new Date(structureDefault));
  } else if (structureType === 'DATE') {
    // @ts-ignore
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
      default_val: finalDefault,
      min: structureMin,
      max: structureMax,
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
          setCurrentCollection((prev: ICollection) => {
            let updatedCollection = { ...prev };
            updatedCollection.structures = [
              ...updatedCollection.structures,
              data.structure,
            ];
            return updatedCollection;
          });
        } else {
          setCurrentCollection((prev: ICollection) => {
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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  structureID: string,
  setStructureID: React.Dispatch<React.SetStateAction<string>>,
  structureName: string,
  setStructureName: React.Dispatch<React.SetStateAction<string>>,
  structureDescription: string,
  setStructureDescription: React.Dispatch<React.SetStateAction<string>>,
  structureType: string,
  setStructureType: React.Dispatch<React.SetStateAction<string>>,
  structureDefault: string | number | boolean | Date,
  setStructureDefault: React.Dispatch<
    React.SetStateAction<string | number | boolean | Date>
  >,
  structureMin: number,
  setStructureMin: React.Dispatch<React.SetStateAction<number>>,
  structureMax: number,
  setStructureMax: React.Dispatch<React.SetStateAction<number>>,
  structureEncrypted: boolean,
  setStructureEncrypted: React.Dispatch<React.SetStateAction<boolean>>,
  structureUnique: boolean,
  setStructureUnique: React.Dispatch<React.SetStateAction<boolean>>,
  structureRegex: string,
  setStructureRegex: React.Dispatch<React.SetStateAction<string>>,
  structureArray: boolean,
  setStructureArray: React.Dispatch<React.SetStateAction<boolean>>,
  structureRequired: boolean,
  setStructureRequired: React.Dispatch<React.SetStateAction<boolean>>,
  editStructureID: string,
  setEditStructureID: React.Dispatch<React.SetStateAction<string>>,
  setEditingStructure: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >,
  alert: any,
  customStructureID: string
) => {
  let finalDefault = structureDefault;
  if (structureType === 'DATETIME') {
    // @ts-ignore
    finalDefault = convertDateTimeToBackendFormat(new Date(structureDefault));
  } else if (structureType === 'DATE') {
    // @ts-ignore
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
      default_val: finalDefault,
      min: structureMin,
      max: structureMax,
      encrypted: structureEncrypted,
      unique: structureUnique,
      regex_pattern: structureRegex,
      array: structureArray,
      required: structureRequired,
    },
  };

  axios
    .patch(
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
          // @ts-ignore
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.structures = [
              // @ts-ignore
              ...updatedCollection.structures.filter(
                (s) => s.id !== data.structure_id
              ),
              data.structure,
            ];
            return updatedCollection;
          });
        } else {
          // @ts-ignore
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.custom_structures =
              // @ts-ignore
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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  structureID: string,
  setStructureID: React.Dispatch<React.SetStateAction<string>>,
  setStructureName: React.Dispatch<React.SetStateAction<string>>,
  setStructureDescription: React.Dispatch<React.SetStateAction<string>>,
  setEditStructureID: React.Dispatch<React.SetStateAction<string>>,
  setDeletingStructure: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >,
  alert: any,
  customStructureID: string
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    structure_id: structureID,
    custom_structure_id: customStructureID,
  };

  axios
    .delete(
      `${API_URL}/structure/delete?uid=${data.uid}&project_id=${data.project_id}&collection_id=${data.collection_id}&structure_id=${data.structure_id}&custom_structure_id=${data.custom_structure_id}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Structure Deleted!');

        setDeletingStructure(false);

        if (customStructureID.length <= 0) {
          // @ts-ignore
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            // @ts-ignore
            updatedCollection.structures = updatedCollection.structures.filter(
              (s) => s.id !== data.structure_id
            );
            return updatedCollection;
          });
        } else {
          // @ts-ignore
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection.custom_structures =
              // @ts-ignore
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
