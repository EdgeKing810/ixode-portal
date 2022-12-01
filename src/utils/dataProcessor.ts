import { ICollection } from '../stores/useCollectionStore';
import {
  convertDateTimeToBackendFormat,
  convertDateToBackendFormat,
  converToLocalDateTime,
} from './timestamp';

const uid = () => {
  let gen = Date.now().toString(36) + Math.random().toString(36);
  gen = gen.split('.').join('_');
  return gen;
};

export interface IDataOriginal {
  id: string;
  pairs: Array<IData>;
  published: boolean;
}

export interface IData {
  data_id: string;
  project_id: string;
  collection_id: string;
  pair_id: string;
  structure_id: string;
  structure_name: string;
  custom_structure_id: string;
  custom_structure_name: string;
  default_val: Date | string | boolean | number;
  value: Date | string | boolean | number;
  dtype: string;
  min: number;
  max: number;
  unique: boolean;
  required: boolean;
  regex_pattern: string;
  array: boolean;
  dummy_bool: boolean;
  published: boolean;
}

export interface IStructurePair {
  id: string;
  value: string;
  rtype: string;
}

export interface ICustomStructurePair {
  id: string;
  structures: Array<IStructurePair>;
}

export interface IRawPair {
  data_id: string;
  structures: Array<IStructurePair>;
  custom_structures: Array<ICustomStructurePair>;
  published: boolean;
}

export const getDataValue = (
  allData: Array<IData>,
  data_id: string,
  pair_id: string,
  structure_id: string,
  custom_structure_id: string
) => {
  let value: Date | string | boolean | number = '';
  for (let i = 0; i < allData.length; i++) {
    if (
      allData[i].data_id === data_id &&
      allData[i].pair_id === pair_id &&
      allData[i].structure_id === structure_id &&
      allData[i].custom_structure_id === custom_structure_id
    ) {
      value = allData[i].value;
      break;
    }
  }
  return value;
};

export const setDataValue = (
  allData: Array<IData>,
  data_id: string,
  pair_id: string,
  structure_id: string,
  custom_structure_id: string,
  value: string
) => {
  let updatedData = [...allData];
  for (let i = 0; i < updatedData.length; i++) {
    if (
      updatedData[i].data_id === data_id &&
      updatedData[i].pair_id === pair_id &&
      updatedData[i].structure_id === structure_id &&
      updatedData[i].custom_structure_id === custom_structure_id
    ) {
      updatedData[i].value = value;
      break;
    }
  }
  return updatedData;
};

export const getDummyBool = (
  allData: Array<IData>,
  data_id: string,
  pair_id: string,
  structure_id: string,
  custom_structure_id: string
) => {
  let dummyBool = false;
  for (let i = 0; i < allData.length; i++) {
    if (
      allData[i].data_id === data_id &&
      allData[i].pair_id === pair_id &&
      allData[i].structure_id === structure_id &&
      allData[i].custom_structure_id === custom_structure_id
    ) {
      dummyBool = allData[i].dummy_bool;
      break;
    }
  }
  return dummyBool;
};

export const switchDummyBool = (
  allData: Array<IData>,
  data_id: string,
  pair_id: string,
  structure_id: string,
  custom_structure_id: string
) => {
  let updatedData = [...allData];
  for (let i = 0; i < updatedData.length; i++) {
    if (
      updatedData[i].data_id === data_id &&
      updatedData[i].pair_id === pair_id &&
      updatedData[i].structure_id === structure_id &&
      updatedData[i].custom_structure_id === custom_structure_id
    ) {
      updatedData[i].dummy_bool = !updatedData[i].dummy_bool;
      break;
    }
  }
  return updatedData;
};

const processDefaultVal = (
  val: Date | string | boolean | number,
  dtype: string
) => {
  let value = val;

  if (['DATETIME'].includes(dtype.toUpperCase())) {
    value = converToLocalDateTime(value as Date);
  } else if (['BOOLEAN', 'BOOL'].includes(dtype.toUpperCase())) {
    if (value === true || value === 'true') {
      value = 'true';
    } else {
      value = 'false';
    }
  }

  return value;
};

export const generateDataFromCollection = (collection: ICollection): Array<IData> => {
  const dataID = uid();
  const projectID = collection.project_id;
  const collectionID = collection.id;

  let allData = [];

  for (let i = 0; i < collection.structures.length; i++) {
    const structure = collection.structures[i];

    allData.push({
      data_id: dataID,
      project_id: projectID,
      collection_id: collectionID,
      pair_id: uid(),
      structure_id: structure.id,
      structure_name: structure.name,
      custom_structure_id: '',
      custom_structure_name: '',
      default_val: structure.default_val,
      value: processDefaultVal(structure.default_val, structure.stype),
      dtype: structure.stype.toLowerCase(),
      min: structure.min,
      max: structure.max,
      unique: structure.unique,
      required: structure.required,
      regex_pattern: structure.regex_pattern,
      array: structure.array,
      dummy_bool: false,
      published: false,
    });
  }

  for (let i = 0; i < collection.custom_structures.length; i++) {
    const custom_structure = collection.custom_structures[i];

    for (let j = 0; j < custom_structure.structures.length; j++) {
      const structure = custom_structure.structures[j];

      allData.push({
        data_id: dataID,
        project_id: projectID,
        collection_id: collectionID,
        pair_id: uid(),
        structure_id: structure.id,
        structure_name: structure.name,
        custom_structure_id: custom_structure.id,
        custom_structure_name: custom_structure.name,
        default_val: structure.default_val,
        value: processDefaultVal(structure.default_val, structure.stype),
        dtype: structure.stype.toLowerCase(),
        min: structure.min,
        max: structure.max,
        unique: structure.unique,
        required: structure.required,
        regex_pattern: structure.regex_pattern,
        array: structure.array,
        dummy_bool: false,
        published: false,
      });
    }
  }

  return allData;
};

export const generateDataFromRaw = (
  collection: ICollection,
  rawPair: IRawPair,
  data_id: string
): Array<IData> => {
  const dataID = data_id;
  const projectID = collection.project_id;
  const collectionID = collection.id;

  let allData = [];

  for (let i = 0; i < collection.structures.length; i++) {
    const structure = collection.structures[i];
    let value: Date | string | boolean | number = '';

    for (let j = 0; j < rawPair.structures.length; j++) {
      const currentPair = rawPair.structures[j];
      if (currentPair.id === structure.id) {
        value = currentPair.value;
        break;
      }
    }

    allData.push({
      data_id: dataID,
      project_id: projectID,
      collection_id: collectionID,
      pair_id: uid(),
      structure_id: structure.id,
      structure_name: structure.name,
      custom_structure_id: '',
      custom_structure_name: '',
      default_val: structure.default_val,
      value: value
        ? processDefaultVal(value, structure.stype)
        : processDefaultVal(structure.default_val, structure.stype),
      dtype: structure.stype.toLowerCase(),
      min: structure.min,
      max: structure.max,
      unique: structure.unique,
      required: structure.required,
      regex_pattern: structure.regex_pattern,
      array: structure.array,
      dummy_bool: false,
      published: rawPair.published,
    });
  }

  for (let i = 0; i < collection.custom_structures.length; i++) {
    const custom_structure = collection.custom_structures[i];

    for (let j = 0; j < custom_structure.structures.length; j++) {
      const structure = custom_structure.structures[j];
      let value = '';

      for (let k = 0; k < rawPair.custom_structures.length; k++) {
        const currentCustomPair = rawPair.custom_structures[k];
        if (currentCustomPair.id === custom_structure.id) {
          for (let l = 0; l < currentCustomPair.structures.length; l++) {
            const currentPair = currentCustomPair.structures[l];
            if (currentPair.id === structure.id) {
              value = currentPair.value;
              break;
            }
          }
          break;
        }
      }

      allData.push({
        data_id: dataID,
        project_id: projectID,
        collection_id: collectionID,
        pair_id: uid(),
        structure_id: structure.id,
        structure_name: structure.name,
        custom_structure_id: custom_structure.id,
        custom_structure_name: custom_structure.name,
        default_val: structure.default_val,
        value: value
          ? processDefaultVal(value, structure.stype)
          : processDefaultVal(structure.default_val, structure.stype),
        dtype: structure.stype.toLowerCase(),
        min: structure.min,
        max: structure.max,
        unique: structure.unique,
        required: structure.required,
        regex_pattern: structure.regex_pattern,
        array: structure.array,
        dummy_bool: false,
        published: rawPair.published,
      });
    }
  }

  return allData;
};

export const convertDataToRaw = (allData: Array<IData>) => {
  let structures = [];
  let custom_structures = [];

  let tmpCustomStructureStore: any = {};

  for (let i = 0; i < allData.length; i++) {
    let data = allData[i];

    let finalValue = data.value;
    if (data.dtype.toUpperCase() === 'DATETIME') {
      // @ts-ignore
      finalValue = convertDateTimeToBackendFormat(new Date(data.value));
    } else if (data.dtype.toUpperCase() === 'DATE') {
      // @ts-ignore
      finalValue = convertDateToBackendFormat(new Date(data.value));
    }
    //  else if (['BOOLEAN', 'BOOL'].includes(data.dtype.toUpperCase())) {
    //   if (finalValue === true) {
    //     finalValue = 'true';
    //   } else {
    //     finalValue = 'false';
    //   }
    // }

    if (data.custom_structure_id.length <= 0) {
      structures.push({
        id: data.structure_id,
        value: finalValue,
        rtype: 'STRING',
      });
    } else {
      if (tmpCustomStructureStore[data.custom_structure_id] === undefined) {
        tmpCustomStructureStore[data.custom_structure_id] = [];
      }

      tmpCustomStructureStore[data.custom_structure_id] = [
        ...tmpCustomStructureStore[data.custom_structure_id],
        {
          id: data.structure_id,
          value: finalValue,
          rtype: 'STRING',
        },
      ];
    }
  }

  for (let i = 0; i < Object.keys(tmpCustomStructureStore).length; i++) {
    let key = Object.keys(tmpCustomStructureStore)[i];
    custom_structures.push({
      id: key,
      structures: [...tmpCustomStructureStore[key]],
    });
  }

  return {
    data_id: '',
    structures,
    custom_structures,
    published: allData[0].published,
  };
};

export const validateData = (currentData: IData, PUBLIC_URL: string) => {
  let value: Date | string | boolean | number = currentData.value;
  if (currentData.dtype.toUpperCase() === 'DATETIME') {
    // @ts-ignore
    value = convertDateTimeToBackendFormat(new Date(value));
  } else if (currentData.dtype.toUpperCase() === 'DATE') {
    // @ts-ignore
    value = convertDateToBackendFormat(new Date(value));
  }
  // else if (['BOOLEAN', 'BOOL'].includes(currentData.dtype.toUpperCase())) {
  //   if (value === true) {
  //     value = 'true';
  //   } else {
  //     value = 'false';
  //   }
  // }

  let usedDefault = false;
  let actualData: Array<string> = [];

  if (value.toString().length <= 0) {
    value = currentData.default_val;
    usedDefault = true;
  }

  let brokenData = [value];
  if (currentData.array) {
    brokenData = value.toString().split(',');
  }

  brokenData.forEach((d) => {
    if (d.toString().trim().length > 0) {
      actualData.push(d.toString().trim().toString());
    }
  });

  let finalData = actualData.join(',');

  if (finalData.length <= 0 && currentData.required) {
    return { valid: false, message: 'Value is required' };
  }

  for (let i = 0; i < actualData.length; i++) {
    let v = actualData[i];

    if (usedDefault) {
      continue;
    }

    if (v.length < currentData.min) {
      return { valid: false, message: 'Value is too short' };
    }

    if (v.length > currentData.max) {
      return { valid: false, message: 'Value is too long' };
    }

    if (currentData.regex_pattern.length > 1) {
      let re = new RegExp(currentData.regex_pattern);
      if (!re.test(v)) {
        return {
          valid: false,
          message: 'Value does not match regex pattern',
        };
      }
    }

    let dtypeResult = validateDataType(
      v,
      currentData.dtype,
      currentData.required,
      PUBLIC_URL
    );
    if (!dtypeResult.valid) {
      return dtypeResult;
    }
  }

  return { valid: true, message: '' };
};

const validateDataType = (
  data: string,
  dtype: string,
  required: boolean,
  PUBLIC_URL: string
) => {
  if (!required && data.length <= 0) {
    return { valid: true, message: '' };
  }

  if (dtype === 'email') {
    // eslint-disable-next-line
    let emailRegex = new RegExp(
      '^([a-z0-9_+]([a-z0-9_+.]*[a-z0-9_+])?)@([a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,6})'
    );

    if (!emailRegex.test(data)) {
      return { valid: false, message: 'Invalid email address' };
    }
  }

  if (dtype === 'number') {
    if (isNaN(parseFloat(data))) {
      return { valid: false, message: 'Invalid number' };
    }
  }

  if (dtype === 'media') {
    if (!data.trim().toLowerCase().startsWith(PUBLIC_URL)) {
      return { valid: false, message: 'Invalid media URL' };
    }
  }

  if (dtype === 'uid') {
    let uidRegex = new RegExp('^(?:[a-zA-Z0-9]{1,20}-){3}[a-zA-Z0-9]{1,20}$');

    if (!uidRegex.test(data)) {
      return { valid: false, message: 'Invalid UID' };
    }
  }

  if (dtype === 'json') {
    if (JSON.parse(data) === null) {
      return { valid: false, message: 'Invalid JSON' };
    }
  }

  return { valid: true, message: '' };
};
