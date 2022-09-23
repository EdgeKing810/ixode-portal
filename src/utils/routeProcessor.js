const blockTypes = [
  'fetchers',
  'assignments',
  'templates',
  'conditions',
  'loops',
  'filters',
  'properties',
  'functions',
  'objects',
  'updates',
  'creates',
  'returns',
];

export const getRouteBlocks = (route) => {
  let allBlocks = [];

  if (!route) {
    return allBlocks;
  }

  for (let i = 0; i < blockTypes.length; i++) {
    let currentType = blockTypes[i];
    for (let j = 0; j < route.flow[currentType].length; j++) {
      allBlocks.push(route.flow[currentType][j]);
    }
  }

  allBlocks.sort((a, b) => a.global_index - b.global_index);

  let complexBlocks = [];
  for (let i = 0; i < allBlocks.length; i++) {
    if (
      complexBlocks.length <= 0 ||
      allBlocks[i].block_index >
        complexBlocks[complexBlocks.length - 1].block_index
    ) {
      complexBlocks = [
        ...complexBlocks,
        {
          block_index: allBlocks[i].block_index,
          blocks: [allBlocks[i]],
        },
      ];
    } else {
      complexBlocks[complexBlocks.length - 1].blocks = [
        ...complexBlocks[complexBlocks.length - 1].blocks,
        allBlocks[i],
      ];
    }
  }

  return complexBlocks;
};

export const getLengthRouteBlocks = (route) => {
  let length = 0;

  for (let i = 0; i < blockTypes.length; i++) {
    let currentType = blockTypes[i];
    length += route.flow[currentType].length;
  }

  return length;
};

export const setRouteProperty = (setRoute, property, value) => {
  setRoute((prev) => {
    let update = { ...prev };
    update[property] = value;
    return update;
  });
};

export const setAuthJWTProperty = (setRoute, property, value) => {
  setRoute((prev) => {
    let update = { ...prev };
    update.auth_jwt[property] = value;
    return update;
  });
};

export const setParamsProperty = (setRoute, property, value) => {
  setRoute((prev) => {
    let update = { ...prev };
    update.params[property] = value;
    return update;
  });
};

export const addRouteBodyData = (setRoute, param) => {
  setRoute((prev) => {
    let update = { ...prev };
    if (!param) {
      update.body = [
        ...update.body,
        {
          id: '',
          bdtype: 'STRING',
        },
      ];
    } else {
      let pairs = [...update.params.pairs];
      update.params = {
        delimiter: update.params.delimiter,
        pairs: [
          ...pairs,
          {
            id: '',
            bdtype: 'STRING',
          },
        ],
      };
    }
    return update;
  });
};

export const setRouteBodyProperty = (
  setRoute,
  property,
  value,
  index,
  param
) => {
  setRoute((prev) => {
    let update = { ...prev };

    if (!param) {
      for (let i = 0; i < update.body.length; i++) {
        if (i === index) {
          update.body[i][property] = value;
        }
      }
    } else {
      for (let i = 0; i < update.params.pairs.length; i++) {
        if (i === index) {
          update.params.pairs[i][property] = value;
        }
      }
    }

    return update;
  });
};

export const removeRouteBody = (setRoute, index, param) => {
  setRoute((prev) => {
    let update = { ...prev };
    if (!param) {
      const body = [...update.body];
      update.body = body.filter((b, i) => i !== index);
    } else {
      let pairs = [...update.params.pairs];
      update.params = {
        delimiter: update.params.delimiter,
        pairs: [...pairs.filter((p, i) => i !== index)],
      };
    }
    return update;
  });
};

export const toggleRouteProperty = (setRoute, property, active) => {
  setRoute((prev) => {
    let update = { ...prev };

    if (property === 'auth_jwt') {
      update[property] = active
        ? {
            active: true,
            field: '',
            ref_col: '',
          }
        : null;
    } else if (property === 'params') {
      update[property] = active
        ? {
            delimiter: '&',
            pairs: [],
          }
        : null;
    }

    return update;
  });
};

export const validateDefaultRouteProperty = (data, prop) => {
  let regex = '^[0-9a-zA-Z_-]+$';
  if (data.trim().length > 0 && !data.match(regex)) {
    return { valid: false, message: `${prop} contains invalid characters` };
  }

  return { valid: true, message: '' };
};

export const validateRouteProperty = (route, property) => {
  if (property === 'route_id') {
    if (route.route_id.length < 1) {
      return { valid: false, message: 'Route ID is required' };
    }

    return validateDefaultRouteProperty(route.route_id, 'Route ID');
  } else if (property === 'route_path') {
    if (route.route_path.length < 1) {
      return { valid: false, message: 'Route Path is required' };
    }

    return validateDefaultRouteProperty(
      route.route_path.split('/').join(''),
      'Route Path'
    );
  }

  return { valid: true, message: '' };
};
