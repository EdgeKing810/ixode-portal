// FRONTEND:

// {
//     data_id: String,
//     project_id: String,
//     collection_id: String,
//     pair_id: String,
//     structure_id: String,
//     custom_structure_id: String,
//     default_val: String,
//     value: String,
//     dtype: String,
//     min: Number,
//     max: Number,
//     unique: Boolean,
//     required: Boolean,
//     regex_pattern: String,
//     array: Boolean,
// }

// BACKEND:

// RawPair {
//     structures: {
//         id: String,
//         value: String,
//     }[],
//     custom_structures: {
//         id: String,
//         structures: {
//             id: String,
//             value: String,
//         }[],
//     }[],
// }

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36);
};

export const getDataValue = (
    allData,
    data_id,
    pair_id,
    structure_id,
    custom_structure_id
) => {
    let value = '';
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
    allData,
    data_id,
    pair_id,
    structure_id,
    custom_structure_id,
    value
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

export const generateDataFromStructure = (collection) => {
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
            custom_structure_id: '',
            default_val: structure.default_val,
            value: '',
            dtype: structure.stype.toLowerCase(),
            min: structure.min,
            max: structure.max,
            unique: structure.unique,
            required: structure.required,
            regex_pattern: structure.regex_pattern,
            array: structure.array,
        });
    }

    for (let i = 0; i < collection.custom_structures.length; i++) {
        const custom_structure = collection.custom_structures[i];

        for (let j = 0; j < custom_structure.structures.length; j++) {
            const structure = custom_structure.structures.structures[j];

            allData.push({
                data_id: dataID,
                project_id: projectID,
                collection_id: collectionID,
                pair_id: uid(),
                structure_id: structure.id,
                custom_structure_id: custom_structure.id,
                default_val: structure.default_val,
                value: '',
                dtype: structure.stype.toLowerCase(),
                min: structure.min,
                max: structure.max,
                unique: structure.unique,
                required: structure.required,
                regex_pattern: structure.regex_pattern,
                array: structure.array,
            });
        }
    }

    return allData;
};

export const generateDataFromRaw = (collection, rawPair) => {
    const dataID = uid();
    const projectID = collection.project_id;
    const collectionID = collection.id;

    let allData = [];

    for (let i = 0; i < collection.structures.length; i++) {
        const structure = collection.structures[i];
        let value = '';

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
            custom_structure_id: '',
            default_val: structure.default_val,
            value: value,
            dtype: structure.stype.toLowerCase(),
            min: structure.min,
            max: structure.max,
            unique: structure.unique,
            required: structure.required,
            regex_pattern: structure.regex_pattern,
            array: structure.array,
        });
    }

    for (let i = 0; i < collection.custom_structures.length; i++) {
        const custom_structure = collection.custom_structures[i];

        for (let j = 0; j < custom_structure.structures.length; j++) {
            const structure = custom_structure.structures.structures[j];
            let value = '';

            for (let k = 0; k < rawPair.custom_structures.length; k++) {
                const currentCustomPair = rawPair.custom_structures[j];
                if (currentCustomPair.id === custom_structure.id) {
                    for (
                        let l = 0;
                        l < currentCustomPair.structures.length;
                        l++
                    ) {
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
                custom_structure_id: custom_structure.id,
                default_val: structure.default_val,
                value: value,
                dtype: structure.stype.toLowerCase(),
                min: structure.min,
                max: structure.max,
                unique: structure.unique,
                required: structure.required,
                regex_pattern: structure.regex_pattern,
                array: structure.array,
            });
        }
    }

    return allData;
};

export const convertDataToRaw = (allData) => {
    let structures = [];
    let custom_structures = [];

    let tmpCustomStructureStore = {};

    for (let i = 0; i < allData.length; i++) {
        let data = allData[i];

        if (data.custom_structure_id.length <= 0) {
            structures.push({
                id: data.structure_id,
                value: data.value,
            });
        } else {
            if (
                tmpCustomStructureStore[data.custom_structure_id] === undefined
            ) {
                tmpCustomStructureStore[data.custom_structure_id] = [];
            }

            tmpCustomStructureStore[data.custom_structure_id] = [
                ...tmpCustomStructureStore[data.custom_structure_id],
                {
                    id: data.structure_id,
                    value: data.value,
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
        structures,
        custom_structures,
    };
};

export const validateData = (currentData, PUBLIC_URL) => {
    let value = currentData.value;
    let usedDefault = false;
    let actualData = [];

    if (value.length <= 0) {
        value = currentData.default_val;
        usedDefault = true;
    }

    let brokenData = [value];
    if (currentData.array) {
        brokenData = value.split(',');
    }

    brokenData.forEach((d) => {
        if (d.trim().length > 0) {
            actualData.push(d.trim().toString());
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
            if (!re.match(v)) {
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

const validateDataType = (data, dtype, required, PUBLIC_URL) => {
    if (!required && data.length <= 0) {
        return { valid: true, message: '' };
    }

    if (dtype === 'email') {
        // eslint-disable-next-line
        let emailRegex = new RegExp(
            '^([a-z0-9_+]([a-z0-9_+.]*[a-z0-9_+])?)@([a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,6})'
        );

        if (!emailRegex.match(data)) {
            return { valid: false, message: 'Invalid email address' };
        }
    }

    if (dtype === 'number') {
        if (isNaN(data)) {
            return { valid: false, message: 'Invalid number' };
        }
    }

    if (dtype === 'media') {
        if (!data.trim().toLowerCase().startsWith(PUBLIC_URL)) {
            return { valid: false, message: 'Invalid media URL' };
        }
    }

    if (dtype === 'uid') {
        let uidRegex = new RegExp(
            '^(?:[a-zA-Z0-9]{1,20}-){3}[a-zA-Z0-9]{1,20}$'
        );

        if (!uidRegex.match(data)) {
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
