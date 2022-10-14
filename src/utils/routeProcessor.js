import { fetchData } from './data';

const targets = fetchData().route.flow.targets;

export const processRouteBlocks = (route) => {
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
    let sharedMeta = {
      global_index: globalIndex,
      block_index: blockIndex,
    };

    for (let j = 0; j < blocks[i].blocks.length; j++) {
      let block = blocks[i].blocks[j];
      sharedMeta.global_index = globalIndex;

      if (block.id === 'fetchers') {
        fetchers = [
          ...fetchers,
          {
            ...sharedMeta,
            local_name: block.local_name,
            ref_col: block.ref_col,
          },
        ];
      } else if (block.id === 'assignments') {
        assignments = [
          ...assignments,
          {
            ...sharedMeta,
            local_name: block.local_name,
            conditions: [...block.conditions],
            operations: [...block.operations],
          },
        ];
      } else if (block.id === 'templates') {
        templates = [
          ...templates,
          {
            ...sharedMeta,
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
            ...sharedMeta,
            conditions: [...block.conditions],
            action: block.action,
            fail: block.fail,
          },
        ];
      } else if (block.id === 'loops') {
        loops = [
          ...loops,
          {
            ...sharedMeta,
            local_name: block.local_name,
            min: block.min,
            max: block.max,
          },
        ];
      } else if (block.id === 'filters') {
        filters = [
          ...filters,
          {
            ...sharedMeta,
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
            ...sharedMeta,
            local_name: block.local_name,
            property: block.property,
          },
        ];
      } else if (block.id === 'functions') {
        functions = [
          ...functions,
          {
            ...sharedMeta,
            local_name: block.local_name,
            func: block.func,
          },
        ];
      } else if (block.id === 'objects') {
        objects = [
          ...objects,
          {
            ...sharedMeta,
            local_name: block.local_name,
            pairs: [...block.pairs],
          },
        ];
      } else if (block.id === 'updates') {
        updates = [
          ...updates,
          {
            ...sharedMeta,
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
            ...sharedMeta,
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
            ...sharedMeta,
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

export const getRouteBlocksLength = (route) => {
  let length = 0;

  for (let i = 0; i < targets.length; i++) {
    let currentType = targets[i].id;
    length += route.flow[currentType].length;
  }

  return length;
};

export const addRouteBlock = (setCurrentBlocks, index) => {
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

export const removeRouteBlock = (setCurrentBlocks, index) => {
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
  // @ts-ignore
  let id = targets.find((t) => t.name === target).id;
  let name = target;

  let sharedMeta = {
    id,
    name,
    rand: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
  };

  if (target === 'FETCH') {
    return {
      ...sharedMeta,
      local_name: '',
      ref_col: '',
    };
  } else if (target === 'ASSIGN') {
    return {
      ...sharedMeta,
      local_name: '',
      conditions: [],
      operations: [],
    };
  } else if (target === 'TEMPLATE') {
    return {
      ...sharedMeta,
      local_name: '',
      template: '',
      data: [],
      conditions: [],
    };
  } else if (target === 'CONDITION') {
    return {
      ...sharedMeta,
      conditions: [],
      action: 'FAIL',
      fail: null,
    };
  } else if (target === 'LOOP') {
    return {
      ...sharedMeta,
      local_name: '',
      min: { ref_var: false, rtype: 'INTEGER', data: '0' },
      max: { ref_var: false, rtype: 'INTEGER', data: '10' },
    };
  } else if (target === 'FILTER') {
    return {
      ...sharedMeta,
      local_name: '',
      ref_var: '',
      ref_property: '',
      filters: [],
    };
  } else if (target === 'PROPERTY') {
    return {
      ...sharedMeta,
      local_name: '',
      property: {
        data: { ref_var: false, rtype: 'STRING', data: '' },
        apply: 'LENGTH',
        additional: '',
      },
    };
  } else if (target === 'FUNCTION') {
    return {
      ...sharedMeta,
      local_name: '',
      func: { id: 'V4', params: [] },
    };
  } else if (target === 'OBJECT') {
    return {
      ...sharedMeta,
      local_name: '',
      pairs: [],
    };
  } else if (target === 'UPDATE') {
    return {
      ...sharedMeta,
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
      ...sharedMeta,
      ref_col: '',
      ref_object: '',
      save: false,
      conditions: [],
    };
  } else if (target === 'RETURN') {
    return {
      ...sharedMeta,
      pairs: [],
      conditions: [],
    };
  }
};

export const addInbuiltBlock = (setCurrentBlocks, index, target) => {
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

export const removeInbuiltBlock = (setCurrentBlocks, index, blockIndex) => {
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

export const moveInbuiltBlock = (
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

export const setRouteProperty = (setRoute, property, value) => {
  setRoute((prev) => {
    let update = { ...prev };
    update[property] = value;
    return update;
  });
};

export const setBlockAuthJWTProperty = (setRoute, property, value) => {
  setRoute((prev) => {
    let update = { ...prev };
    update.auth_jwt[property] = value;
    return update;
  });
};

export const setBlockParamsProperty = (setRoute, property, value) => {
  setRoute((prev) => {
    let update = { ...prev };
    update.params[property] = value;
    return update;
  });
};

export const addBlockBodyData = (setRoute, param) => {
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

export const setBlockBodyDataProperty = (
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

export const removeBlockBodyData = (setRoute, index, param) => {
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

    if (!active) {
      update[property] = null;
      return update;
    }

    if (property === 'auth_jwt') {
      update[property] = {
        active: true,
        field: '',
        ref_col: '',
      };
    } else if (property === 'params') {
      update[property] = {
        delimiter: '&',
        pairs: [],
      };
    }

    return update;
  });
};

export const validateProperty = (data, name, minCheck) => {
  if (data === undefined) {
    return { valid: false, message: '' };
  }

  let stringified = data.toString();

  if (minCheck && stringified.trim().length < 1) {
    return { valid: false, message: `${name} is required` };
  }

  let regex = '^[0-9a-zA-Z_-]+$';
  if (stringified.trim().length > 0 && !stringified.match(regex)) {
    return { valid: false, message: `${name} contains invalid characters` };
  }

  return { valid: true, message: '' };
};

const obtainNewInbuiltBlockObject = (type) => {
  let refData = { ref_var: false, rtype: 'STRING', data: '' };

  if (type === 'CONDITION') {
    return {
      left: { ...refData },
      right: { ...refData },
      condition_type: 'EQUAL_TO',
      not: false,
      next: 'NONE',
    };
  } else if (type === 'OPERATION') {
    return {
      left: { ...refData },
      right: { ...refData },
      operation_type: 'NONE',
      not: false,
      next: 'NONE',
    };
  } else if (type === 'DATA') {
    return { ...refData };
  } else if (type === 'FILTER') {
    return {
      right: { ...refData },
      operation_type: 'NONE',
      not: false,
      next: 'NONE',
    };
  } else if (type === 'OBJECT') {
    return {
      id: '',
      data: { ...refData },
    };
  } else if (type === 'TARGET') {
    return {
      field: '',
      conditions: [],
    };
  }

  return {};
};

const updateBlockProperty = (block, properties, index, value) => {
  let newBlock = { ...block };
  if (newBlock[0]) {
    newBlock = newBlock[0];
  }

  if (index >= properties.length - 1) {
    newBlock[properties[index]] = value;
  } else {
    newBlock[properties[index]] = updateBlockProperty(
      newBlock[properties[index]],
      properties,
      index + 1,
      value
    );
  }

  return newBlock;
};

const fetchBlockProperty = (block, properties, index) => {
  if (index >= properties.length) {
    return block;
  } else {
    return fetchBlockProperty(block[properties[index]], properties, index + 1);
  }
};

export const setBlockProperty = (
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

            updatedBlock = updateBlockProperty(
              updatedBlock,
              targetProperties,
              0,
              value
            );
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

export const toggleBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  property,
  toggle
) => {
  setCurrentBlocks((prev) => {
    let update = [];
    let refData = {
      ref_var: false,
      rtype: 'STRING',
      data: '',
    };

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
              } else if (property === 'add') {
                updatedBlock[property] = {
                  ...refData,
                };
              } else if (property === 'set') {
                updatedBlock[property] = {
                  ...refData,
                };
              } else if (property === 'filter') {
                updatedBlock[property] = {
                  right: {
                    ...refData,
                  },
                  operation_type: 'NONE',
                  not: false,
                  next: 'NONE',
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

export const setInbuiltBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  currentIndex,
  property,
  target,
  value,
  currentIndex2
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
            let targetProperties = target.split('.');

            if (currentIndex2 !== undefined) {
              for (let k = 0; k < updatedBlock[targets[0]].length; k++) {
                if (k === currentIndex2) {
                  for (
                    let l = 0;
                    l < updatedBlock[targets[0]][k][targets[1]].length;
                    l++
                  ) {
                    if (l === currentIndex) {
                      updatedBlock[targets[0]][k][targets[1]][l] =
                        updateBlockProperty(
                          updatedBlock[targets[0]][k][targets[1]][l],
                          targetProperties,
                          0,
                          value
                        );
                    }
                  }
                }
              }
            } else {
              if (currentIndex !== undefined) {
                let updateTop = fetchBlockProperty(updatedBlock, targets, 0);

                for (let k = 0; k < updateTop.length; k++) {
                  if (k === currentIndex) {
                    let clonedUpdate = { ...updateTop[k] };
                    updateTop[k] = updateBlockProperty(
                      clonedUpdate,
                      targetProperties,
                      0,
                      value
                    );
                  }
                }

                updatedBlock = updateBlockProperty(
                  updatedBlock,
                  targets,
                  0,
                  updateTop
                );
              } else {
                updatedBlock[property] = updateBlockProperty(
                  updatedBlock[property],
                  targetProperties,
                  0,
                  value
                );
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

export const removeInbuiltBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  currentIndex,
  property,
  currentIndex2
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

            if (currentIndex2 !== undefined) {
              updatedBlock[targetProperties[0]] = updatedBlock[
                targetProperties[0]
              ].map((p, k) => {
                let update = { ...p };
                if (k === currentIndex2) {
                  update[targetProperties[1]] = update[
                    targetProperties[1]
                  ].filter((u, l) => l !== currentIndex);
                }
                return update;
              });
            } else {
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

export const addInbuiltBlockProperty = (
  setCurrentBlocks,
  index,
  blockIndex,
  property,
  type,
  currentIndex
) => {
  setCurrentBlocks((prev) => {
    let update = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          let targetProperties = property.split('.');

          if (j === blockIndex) {
            if (currentIndex !== undefined) {
              if (targetProperties.length > 1) {
                updatedBlock[targetProperties[0]] = updatedBlock[
                  targetProperties[0]
                ].map((t, k) => {
                  let update = { ...t };
                  if (k === currentIndex) {
                    const sliced = targetProperties.slice(
                      1,
                      targetProperties.length
                    );

                    update = updateBlockProperty(update, sliced, 0, [
                      ...fetchBlockProperty(update, sliced, 0),
                      obtainNewInbuiltBlockObject(type),
                    ]);
                  }
                  return update;
                });
              }
            } else {
              updatedBlock = updateBlockProperty(
                updatedBlock,
                targetProperties,
                0,
                [
                  ...fetchBlockProperty(updatedBlock, targetProperties, 0),
                  obtainNewInbuiltBlockObject(type),
                ]
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
