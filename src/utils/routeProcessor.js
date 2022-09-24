import { fetchData } from './data';

const targets = fetchData().route.flow.targets;

export const getRouteBlocks = (route) => {
  let allBlocks = [];

  if (!route) {
    return allBlocks;
  }

  for (let i = 0; i < targets.length; i++) {
    let currentType = targets[i].id;
    for (let j = 0; j < route.flow[currentType].length; j++) {
      allBlocks.push({
        id: currentType,
        name: targets[i].name,
        ...route.flow[currentType][j],
      });
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

export const convertRouteBlocks = (blocks) => {
  let globalIndex = 0;

  let fetchers = [];
  let assignments = [];
  let templates = [];
  let conditions = [];
  let loops = [];
  let filters = [];
  let properties = [];
  let functions = [];
  let objects = [];
  let updates = [];
  let creates = [];
  let returns = [];

  for (let i = 0; i < blocks.length; i++) {
    let blockIndex = blocks[i].block_index;

    for (let j = 0; j < blocks[i].blocks.length; j++) {
      let block = blocks[i].blocks[j];

      if (block.id === 'fetchers') {
        fetchers = [
          ...fetchers,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            ref_col: block.ref_col,
          },
        ];
      } else if (block.id === 'assignments') {
        assignments = [
          ...assignments,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            conditions: [...block.conditions],
            operations: [...block.operations],
          },
        ];
      } else if (block.id === 'templates') {
        templates = [
          ...templates,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            template: block.template,
            data: [...block.data],
            conditions: [...block.conditions],
          },
        ];
      } else if (block.id === 'conditions') {
        conditions = [
          ...conditions,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            conditions: [...block.conditions],
            action: block.action,
            fail: block.fail,
          },
        ];
      } else if (block.id === 'loops') {
        loops = [
          ...loops,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            min: block.min,
            max: block.max,
          },
        ];
      } else if (block.id === 'filters') {
        filters = [
          ...filters,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            ref_var: block.ref_var,
            ref_property: block.ref_property,
            filters: [...block.filters],
          },
        ];
      } else if (block.id === 'properties') {
        properties = [
          ...properties,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            property: block.property,
          },
        ];
      } else if (block.id === 'functions') {
        functions = [
          ...functions,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            func: block.func,
          },
        ];
      } else if (block.id === 'objects') {
        objects = [
          ...objects,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            local_name: block.local_name,
            pairs: [...block.pairs],
          },
        ];
      } else if (block.id === 'updates') {
        updates = [
          ...updates,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            ref_col: block.ref_col,
            ref_property: block.ref_property,
            save: block.save,
            targets: [...block.targets],
            add: block.add,
            set: block.set,
            filter: block.filter,
            conditions: [...block.conditions],
          },
        ];
      } else if (block.id === 'creates') {
        creates = [
          ...creates,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            ref_col: block.ref_col,
            ref_object: block.ref_object,
            save: block.save,
            conditions: [...block.conditions],
          },
        ];
      } else if (block.id === 'returns') {
        returns = [
          ...returns,
          {
            global_index: globalIndex,
            block_index: blockIndex,
            pairs: [...block.pairs],
            conditions: [...block.conditions],
          },
        ];
      }

      globalIndex++;
    }
  }

  return {
    fetchers,
    assignments,
    templates,
    conditions,
    loops,
    filters,
    properties,
    functions,
    objects,
    updates,
    creates,
    returns,
  };
};

export const addRouteFlowBlock = (setCurrentBlocks, index) => {
  setCurrentBlocks((prev) => {
    let update = [...prev];

    if (!index) {
      update = [...update, { block_index: update.length, blocks: [] }];
    } else {
      update = [];
      for (let i = 0; i < prev.length; i++) {
        if (i <= index) {
          update = [...update, { block_index: i, blocks: prev[i].blocks }];
        } else if (i > index) {
          update = [...update, { block_index: i + 1, blocks: prev[i].blocks }];
        }

        if (i === index) {
          update = [...update, { block_index: i + 1, blocks: [] }];
        }
      }
    }

    return update;
  });
};

export const removeRouteFlowBlock = (setCurrentBlocks, index) => {
  setCurrentBlocks((prev) => {
    let update = [];
    for (let i = 0; i < prev.length; i++) {
      if (i < index) {
        update = [...update, prev[i]];
      } else if (i > index) {
        update = [...update, { block_index: i - 1, blocks: prev[i].blocks }];
      }
    }

    return update;
  });
};

const getDefaultBlockProperties = (target) => {
  let id = targets.find((t) => t.name === target).id;
  let name = target;

  if (target === 'FETCH') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      ref_col: '',
    };
  } else if (target === 'ASSIGN') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      conditions: [],
      operations: [],
    };
  } else if (target === 'TEMPLATE') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      template: '',
      data: [],
      conditions: [],
    };
  } else if (target === 'CONDITION') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      conditions: [],
      action: 'FAIL',
      fail: null,
    };
  } else if (target === 'LOOP') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      min: { ref_var: false, rtype: 'INTEGER', data: '0' },
      max: { ref_var: false, rtype: 'INTEGER', data: '10' },
    };
  } else if (target === 'FILTER') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      ref_var: '',
      ref_property: '',
      filters: [],
    };
  } else if (target === 'PROPERTY') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      property: {
        data: { ref_var: false, rtype: 'STRING', data: '' },
        apply: 'LENGTH',
        additional: '',
      },
    };
  } else if (target === 'FUNCTION') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      func: { id: 'V4', params: [] },
    };
  } else if (target === 'OBJECT') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      local_name: '',
      pairs: [],
    };
  } else if (target === 'UPDATE') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      ref_col: '',
      ref_property: '',
      save: false,
      targets: [],
      add: null,
      set: null,
      filter: null,
      conditions: [],
    };
  } else if (target === 'CREATE') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      ref_col: '',
      ref_object: '',
      save: false,
      conditions: [],
    };
  } else if (target === 'RETURN') {
    return {
      id,
      name,
      rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      pairs: [],
      conditions: [],
    };
  }
};

export const addRouteFlowBlockInbuilt = (setCurrentBlocks, index, target) => {
  setCurrentBlocks((prev) => {
    let update = [...prev];

    update = update.map((u, i) => {
      let blocks = [...u.blocks];
      if (i === index) {
        blocks = [...blocks, getDefaultBlockProperties(target)];
      }
      return {
        block_index: u.block_index,
        blocks: [...blocks],
      };
    });

    return update;
  });
};

export const removeRouteFlowBlockInbuilt = (
  setCurrentBlocks,
  index,
  blockIndex
) => {
  setCurrentBlocks((prev) => {
    let update = [...prev];

    update = update.map((u, i) => {
      let blocks = [...u.blocks];
      if (i === index) {
        blocks = blocks.filter((b, j) => j !== blockIndex);
      }
      return {
        block_index: u.block_index,
        blocks: [...blocks],
      };
    });

    return update;
  });
};

export const moveRouteFlowBlockInbuilt = (
  setCurrentBlocks,
  index,
  blockIndex,
  direction
) => {
  setCurrentBlocks((prev) => {
    let update = [...prev];

    update = update.map((u, i) => {
      let blocks = [...u.blocks];

      if (i === index) {
        let finalPosition =
          direction === 'up' ? blockIndex - 1 : blockIndex + 1;

        if (finalPosition < 0) {
          finalPosition = blocks.length - 1;
        } else if (finalPosition > blocks.length - 1) {
          finalPosition = 0;
        }

        let block = blocks[blockIndex];

        blocks.splice(blockIndex, 1);
        blocks.splice(finalPosition, 0, block);
      }

      return {
        block_index: u.block_index,
        blocks: [...blocks],
      };
    });

    return update;
  });
};

export const getLengthRouteBlocks = (route) => {
  let length = 0;

  for (let i = 0; i < targets.length; i++) {
    let currentType = targets[i].id;
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
  if (data === undefined) {
    return { valid: false, message: '' };
  }

  let stringified = data.toString();

  let regex = '^[0-9a-zA-Z_-]+$';
  if (stringified.trim().length > 0 && !stringified.match(regex)) {
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

export const setFlowBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  property,
  value
) => {
  setCurrentBlocks((prev) => {
    let update = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            let targetProperties = property.split('.');

            if (targetProperties.length > 2) {
              updatedBlock[targetProperties[0]][targetProperties[1]][
                targetProperties[2]
              ] = value;
            } else if (targetProperties.length > 1) {
              updatedBlock[targetProperties[0]][targetProperties[1]] = value;
            } else {
              updatedBlock[targetProperties[0]] = value;
            }
          }
          updatedBlocks = [...updatedBlocks, updatedBlock];
        }

        update = [
          ...update,
          { block_index: prev[i].block_index, blocks: [...updatedBlocks] },
        ];
      } else {
        update = [...update, prev[i]];
      }
    }

    return update;
  });
};

export const toggleFlowBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  property,
  toggle
) => {
  setCurrentBlocks((prev) => {
    let update = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            if (!toggle) {
              updatedBlock[property] = null;
            } else {
              if (property === 'fail') {
                updatedBlock[property] = {
                  status: 500,
                  message: 'Internal Server Error',
                };
              }
            }
          }
          updatedBlocks = [...updatedBlocks, updatedBlock];
        }

        update = [
          ...update,
          { block_index: prev[i].block_index, blocks: [...updatedBlocks] },
        ];
      } else {
        update = [...update, prev[i]];
      }
    }

    return update;
  });
};

export const setFlowBlockPropertySpecial = (
  setCurrentBlocks,
  index,
  blockIndex,
  currentIndex,
  property,
  target,
  value
) => {
  setCurrentBlocks((prev) => {
    let update = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            let targets = property.split('.');

            if (targets.length > 1) {
              let updateTop = [...updatedBlock[targets[0]][targets[1]]];

              updateTop = updateTop.map((upb, k) => {
                let update = { ...upb };
                let targetProperties = target.split('.');

                if (k === currentIndex) {
                  if (targetProperties.length > 1) {
                    update[targetProperties[0]][targetProperties[1]] = value;
                  } else {
                    update[targetProperties[0]] = value;
                  }
                }

                return update;
              });

              updatedBlock[targets[0]][targets[1]] = updateTop;
            } else {
              updatedBlock[property] = updatedBlock[property].map((upb, k) => {
                let update = { ...upb };
                let targetProperties = target.split('.');

                if (k === currentIndex) {
                  if (targetProperties.length > 1) {
                    update[targetProperties[0]][targetProperties[1]] = value;
                  } else {
                    update[targetProperties[0]] = value;
                  }
                }

                return update;
              });
            }
          }
          updatedBlocks = [...updatedBlocks, updatedBlock];
        }

        update = [
          ...update,
          { block_index: prev[i].block_index, blocks: [...updatedBlocks] },
        ];
      } else {
        update = [...update, prev[i]];
      }
    }

    return update;
  });
};

export const removeFlowBlockPropertySpecial = (
  setCurrentBlocks,
  index,
  blockIndex,
  currentIndex,
  property
) => {
  setCurrentBlocks((prev) => {
    let update = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            let targetProperties = property.split('.');

            if (targetProperties.length > 1) {
              let update = [
                ...updatedBlock[targetProperties[0]][targetProperties[1]],
              ];

              update = update.filter((upb, k) => k !== currentIndex);

              updatedBlock[targetProperties[0]][targetProperties[1]] = update;
            } else {
              updatedBlock[property] = updatedBlock[property].filter(
                (upb, k) => k !== currentIndex
              );
            }
          }
          updatedBlocks = [...updatedBlocks, updatedBlock];
        }

        update = [
          ...update,
          { block_index: prev[i].block_index, blocks: [...updatedBlocks] },
        ];
      } else {
        update = [...update, prev[i]];
      }
    }

    return update;
  });
};

const obtainNewObject = (type) => {
  if (type === 'CONDITION') {
    return {
      left: { ref_var: false, rtype: 'STRING', data: '' },
      right: { ref_var: false, rtype: 'STRING', data: '' },
      condition_type: 'EQUAL_TO',
      not: false,
      next: 'NONE',
    };
  } else if (type === 'OPERATION') {
    return {
      left: { ref_var: false, rtype: 'STRING', data: '' },
      right: { ref_var: false, rtype: 'STRING', data: '' },
      operation_type: 'NONE',
      not: false,
      next: 'NONE',
    };
  } else if (type === 'DATA') {
    return { ref_var: false, rtype: 'STRING', data: '' };
  } else if (type === 'FILTER') {
    return {
      right: { ref_var: false, rtype: 'STRING', data: '' },
      operation_type: 'NONE',
      not: false,
      next: 'NONE',
    };
  } else if (type === 'OBJECT') {
    return {
      id: '',
      data: { ref_var: false, rtype: 'STRING', data: '' },
    };
  }

  return {};
};

export const addFlowBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  property,
  type
) => {
  setCurrentBlocks((prev) => {
    let update = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            let targetProperties = property.split('.');

            if (targetProperties.length > 1) {
              updatedBlock[targetProperties[0]][targetProperties[1]] = [
                ...updatedBlock[targetProperties[0]][targetProperties[1]],
                {
                  ...obtainNewObject(type),
                },
              ];
            } else {
              updatedBlock[property] = [
                ...updatedBlock[property],
                obtainNewObject(type),
              ];
            }
          }
          updatedBlocks = [...updatedBlocks, updatedBlock];
        }

        update = [
          ...update,
          { block_index: prev[i].block_index, blocks: [...updatedBlocks] },
        ];
      } else {
        update = [...update, prev[i]];
      }
    }

    return update;
  });
};
