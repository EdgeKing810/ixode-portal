import { fetchData } from './data';
import {
  IAssignmentBlock,
  IComplexBlock,
  IConditionBlock,
  ICreateBlock,
  IFetchBlock,
  IFilterBlock,
  IFunctionBlock,
  ILoopBlock,
  IObjectBlock,
  IProcessAssignmentBlock,
  IProcessConditionBlock,
  IProcessCreateBlock,
  IProcessFetchBlock,
  IProcessFilterBlock,
  IProcessFunctionBlock,
  IProcessLoopBlock,
  IProcessObjectBlock,
  IProcessPropertyBlock,
  IProcessReturnBlock,
  IProcessTemplateBlock,
  IProcessUpdateBlock,
  IPropertyBlock,
  IReturnBlock,
  IRoute,
  ITemplateBlock,
  IUpdateBlock,
  TMixedBlocks,
} from './route';

const targets = fetchData().route.flow.targets;

export const processRouteBlocks = (route: IRoute): Array<IComplexBlock> => {
  let allBlocks: Array<TMixedBlocks> = [];
  let complexBlocks: Array<IComplexBlock> = [];

  if (!route) {
    return complexBlocks;
  }

  for (let i = 0; i < targets.length; i++) {
    let currentType = targets[i].id;
    // @ts-ignore
    for (let j = 0; j < route.flow[currentType].length; j++) {
      allBlocks.push({
        id: currentType,
        name: targets[i].name,
        // @ts-ignore
        ...route.flow[currentType][j],
      });
    }
  }

  allBlocks.sort((a, b) => a.global_index - b.global_index);

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

export const convertRouteBlocks = (blocks: Array<IComplexBlock>) => {
  let globalIndex = 0;

  let fetchers: Array<IFetchBlock> = [];
  let assignments: Array<IAssignmentBlock> = [];
  let templates: Array<ITemplateBlock> = [];
  let conditions: Array<IConditionBlock> = [];
  let loops: Array<ILoopBlock> = [];
  let filters: Array<IFilterBlock> = [];
  let properties: Array<IPropertyBlock> = [];
  let functions: Array<IFunctionBlock> = [];
  let objects: Array<IObjectBlock> = [];
  let updates: Array<IUpdateBlock> = [];
  let creates: Array<ICreateBlock> = [];
  let returns: Array<IReturnBlock> = [];

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
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            ref_col: block.ref_col,
          },
        ];
      } else if (block.id === 'assignments') {
        assignments = [
          ...assignments,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            conditions: [...block.conditions],
            // @ts-ignore
            operations: [...block.operations],
          },
        ];
      } else if (block.id === 'templates') {
        templates = [
          ...templates,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            template: block.template,
            // @ts-ignore
            data: [...block.data],
            // @ts-ignore
            conditions: [...block.conditions],
          },
        ];
      } else if (block.id === 'conditions') {
        conditions = [
          ...conditions,
          {
            ...sharedMeta,
            // @ts-ignore
            conditions: [...block.conditions],
            // @ts-ignore
            action: block.action,
            // @ts-ignore
            fail: block.fail,
          },
        ];
      } else if (block.id === 'loops') {
        loops = [
          ...loops,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            min: block.min,
            // @ts-ignore
            max: block.max,
          },
        ];
      } else if (block.id === 'filters') {
        filters = [
          ...filters,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            ref_var: block.ref_var,
            // @ts-ignore
            ref_property: block.ref_property,
            // @ts-ignore
            filters: [...block.filters],
          },
        ];
      } else if (block.id === 'properties') {
        properties = [
          ...properties,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            property: block.property,
          },
        ];
      } else if (block.id === 'functions') {
        functions = [
          ...functions,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            func: block.func,
          },
        ];
      } else if (block.id === 'objects') {
        objects = [
          ...objects,
          {
            ...sharedMeta,
            // @ts-ignore
            local_name: block.local_name,
            // @ts-ignore
            pairs: [...block.pairs],
          },
        ];
      } else if (block.id === 'updates') {
        updates = [
          ...updates,
          {
            ...sharedMeta,
            // @ts-ignore
            ref_col: block.ref_col,
            // @ts-ignore
            ref_property: block.ref_property,
            // @ts-ignore
            save: block.save,
            // @ts-ignore
            targets: [...block.targets],
            // @ts-ignore
            add: block.add,
            // @ts-ignore
            set: block.set,
            // @ts-ignore
            filter: block.filter,
            // @ts-ignore
            conditions: [...block.conditions],
          },
        ];
      } else if (block.id === 'creates') {
        creates = [
          ...creates,
          {
            ...sharedMeta,
            // @ts-ignore
            ref_col: block.ref_col,
            // @ts-ignore
            ref_object: block.ref_object,
            // @ts-ignore
            save: block.save,
            // @ts-ignore
            conditions: [...block.conditions],
          },
        ];
      } else if (block.id === 'returns') {
        returns = [
          ...returns,
          {
            ...sharedMeta,
            // @ts-ignore
            pairs: [...block.pairs],
            // @ts-ignore
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

export const getRouteBlocksLength = (route: IRoute) => {
  let length = 0;

  for (let i = 0; i < targets.length; i++) {
    let currentType = targets[i].id;
    // @ts-ignore
    length += route.flow[currentType].length;
  }

  return length;
};

export const addRouteBlock = (
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index?: number
) => {
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

export const removeRouteBlock = (
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number
) => {
  setCurrentBlocks((prev) => {
    let update: Array<IComplexBlock> = [];
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

const getDefaultBlockProperties = (
  target: string
): TMixedBlocks | undefined => {
  // @ts-ignore
  let id = targets.find((t) => t.name === target).id;
  let name = target;

  let sharedMeta = {
    id,
    name,
    global_index: 999,
    block_index: 999,
  };

  if (target === 'FETCH') {
    let fetch_block: IProcessFetchBlock = {
      ...sharedMeta,
      local_name: '',
      ref_col: '',
    };
    return fetch_block;
  } else if (target === 'ASSIGN') {
    let assign_block: IProcessAssignmentBlock = {
      ...sharedMeta,
      local_name: '',
      conditions: [],
      operations: [],
    };
    return assign_block;
  } else if (target === 'TEMPLATE') {
    let template_block: IProcessTemplateBlock = {
      ...sharedMeta,
      local_name: '',
      template: '',
      data: [],
      conditions: [],
    };
    return template_block;
  } else if (target === 'CONDITION') {
    let condition_block: IProcessConditionBlock = {
      ...sharedMeta,
      conditions: [],
      action: 'FAIL',
      fail: null,
    };
    return condition_block;
  } else if (target === 'LOOP') {
    let loop_block: IProcessLoopBlock = {
      ...sharedMeta,
      local_name: '',
      min: { ref_var: false, rtype: 'INTEGER', data: '0' },
      max: { ref_var: false, rtype: 'INTEGER', data: '10' },
    };
    return loop_block;
  } else if (target === 'FILTER') {
    let filter_block: IProcessFilterBlock = {
      ...sharedMeta,
      local_name: '',
      ref_var: '',
      ref_property: '',
      filters: [],
    };
    return filter_block;
  } else if (target === 'PROPERTY') {
    let property_block: IProcessPropertyBlock = {
      ...sharedMeta,
      local_name: '',
      property: {
        data: { ref_var: false, rtype: 'STRING', data: '' },
        apply: 'LENGTH',
        additional: '',
      },
    };
    return property_block;
  } else if (target === 'FUNCTION') {
    let function_block: IProcessFunctionBlock = {
      ...sharedMeta,
      local_name: '',
      func: { id: 'V4', params: [] },
    };
    return function_block;
  } else if (target === 'OBJECT') {
    let object_block: IProcessObjectBlock = {
      ...sharedMeta,
      local_name: '',
      pairs: [],
    };
    return object_block;
  } else if (target === 'UPDATE') {
    let update_block: IProcessUpdateBlock = {
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
    return update_block;
  } else if (target === 'CREATE') {
    let create_block: IProcessCreateBlock = {
      ...sharedMeta,
      ref_col: '',
      ref_object: '',
      save: false,
      conditions: [],
    };
    return create_block;
  } else if (target === 'RETURN') {
    let return_block: IProcessReturnBlock = {
      ...sharedMeta,
      pairs: [],
      conditions: [],
    };
    return return_block;
  }
};

export const addInbuiltBlock = (
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  target: string
) => {
  setCurrentBlocks((prev) => {
    let update = [...prev];

    update = update.map((u, i) => {
      let blocks = [...u.blocks];

      if (i === index) {
        let default_block = getDefaultBlockProperties(target);
        if (default_block) {
          blocks = [...blocks, default_block];
        }
      }

      return {
        block_index: u.block_index,
        blocks: [...blocks],
      };
    });

    return update;
  });
};

export const removeInbuiltBlock = (
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number
) => {
  setCurrentBlocks((prev) => {
    let update = [...prev];

    update = update.map((u, i) => {
      let blocks: Array<TMixedBlocks> = [...u.blocks];

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
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number,
  direction: 'up' | 'down'
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

export const setRouteProperty = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  property: string,
  value: any
) => {
  // @ts-ignore
  setRoute((prev) => {
    let update = { ...prev };
    // @ts-ignore
    update[property] = value;
    return update;
  });
};

export const setBlockAuthJWTProperty = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  property: string,
  value: any
) => {
  // @ts-ignore
  setRoute((prev) => {
    let update = { ...prev };
    if (!update.auth_jwt) {
      update.auth_jwt = {
        active: false,
        field: '',
        ref_col: '',
      };
    }
    // @ts-ignore
    update.auth_jwt[property] = value;
    return update;
  });
};

export const setBlockParamsProperty = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  property: string,
  value: any
) => {
  // @ts-ignore
  setRoute((prev) => {
    let update = { ...prev };
    if (!update.params) {
      update.params = {
        delimiter: '',
        pairs: [],
      };
    }
    // @ts-ignore
    update.params[property] = value;
    return update;
  });
};

export const addBlockBodyData = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  param: boolean
) => {
  // @ts-ignore
  setRoute((prev) => {
    let update = { ...prev };

    if (!param) {
      if (update.body) {
        update.body = [
          ...update.body,
          {
            id: '',
            bdtype: 'STRING',
          },
        ];
      }
    } else {
      if (update.params) {
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
    }
    return update;
  });
};

export const setBlockBodyDataProperty = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  property: string,
  value: string,
  index: number,
  param: boolean
) => {
  // @ts-ignore
  setRoute((prev) => {
    let update = { ...prev };

    if (!param) {
      if (update.body) {
        for (let i = 0; i < update.body.length; i++) {
          if (i === index) {
            // @ts-ignore
            update.body[i][property] = value;
          }
        }
      }
    } else {
      if (update.params) {
        for (let i = 0; i < update.params.pairs.length; i++) {
          if (i === index) {
            // @ts-ignore
            update.params.pairs[i][property] = value;
          }
        }
      }
    }

    return update;
  });
};

export const removeBlockBodyData = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  index: number,
  param: boolean
) => {
  // @ts-ignore
  setRoute((prev) => {
    let update = { ...prev };
    if (!param) {
      if (update.body) {
        const body = [...update.body];
        update.body = body.filter((b, i) => i !== index);
      }
    } else {
      if (update.params) {
        let pairs = [...update.params.pairs];
        update.params = {
          delimiter: update.params.delimiter,
          pairs: [...pairs.filter((p, i) => i !== index)],
        };
      }
    }
    return update;
  });
};

export const toggleRouteProperty = (
  setRoute: React.Dispatch<React.SetStateAction<IRoute | null>>,
  property: 'auth_jwt' | 'params',
  active: boolean
) => {
  // @ts-ignore
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

export const validateProperty = (
  data: string,
  name: string,
  minCheck: boolean,
  specialChar?: boolean
) => {
  if (data === undefined) {
    return { valid: false, message: '' };
  }

  let stringified = data.toString();

  if (minCheck && stringified.trim().length < 1) {
    return { valid: false, message: `${name} is required` };
  }

  let regex = '^[0-9a-zA-Z_-]+$';
  if (
    stringified.trim().length > 0 &&
    !stringified.match(regex) &&
    !specialChar
  ) {
    return { valid: false, message: `${name} contains invalid characters` };
  }

  return { valid: true, message: '' };
};

const obtainNewInbuiltBlockObject = (type: string) => {
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

const updateBlockProperty = (
  block: TMixedBlocks,
  properties: Array<string>,
  index: number,
  value: string | number | boolean | Date
) => {
  let newBlock = { ...block };
  // @ts-ignore
  if (newBlock[0]) {
    // @ts-ignore
    newBlock = newBlock[0];
  }

  if (index >= properties.length - 1) {
    // @ts-ignore
    newBlock[properties[index]] = value;
  } else {
    // @ts-ignore
    newBlock[properties[index]] = updateBlockProperty(
      // @ts-ignore
      newBlock[properties[index]],
      properties,
      index + 1,
      value
    );
  }

  return newBlock;
};

const fetchBlockProperty = (
  block: TMixedBlocks,
  properties: Array<string>,
  index: number
): any => {
  if (index >= properties.length) {
    return block;
  } else {
    return fetchBlockProperty(
      // @ts-ignore
      block[properties[index]],
      properties,
      index + 1
    );
  }
};

export const setBlockProperty = (
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number,
  property: string,
  value: string | number | boolean | Date
) => {
  setCurrentBlocks((prev) => {
    let update: Array<IComplexBlock> = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks: Array<TMixedBlocks> = [];

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
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number,
  property: string,
  toggle: boolean
) => {
  setCurrentBlocks((prev) => {
    let update: Array<IComplexBlock> = [];
    let refData = {
      ref_var: false,
      rtype: 'STRING',
      data: '',
    };

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks: Array<TMixedBlocks> = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            if (!toggle) {
              // @ts-ignore
              updatedBlock[property] = null;
            } else {
              if (property === 'fail') {
                // @ts-ignore
                updatedBlock[property] = {
                  status: 500,
                  message: 'Internal Server Error',
                };
              } else if (property === 'add') {
                // @ts-ignore
                updatedBlock[property] = {
                  ...refData,
                };
              } else if (property === 'set') {
                // @ts-ignore
                updatedBlock[property] = {
                  ...refData,
                };
              } else if (property === 'filter') {
                // @ts-ignore
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
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number,
  currentIndex: number,
  property: string,
  target: string,
  value: string | boolean | number | Date,
  currentIndex2?: number
) => {
  setCurrentBlocks((prev) => {
    let update: Array<IComplexBlock> = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks: Array<TMixedBlocks> = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            let targets = property.split('.');
            let targetProperties = target.split('.');

            if (currentIndex2 !== undefined) {
              // @ts-ignore
              for (let k = 0; k < updatedBlock[targets[0]].length; k++) {
                if (k === currentIndex2) {
                  for (
                    let l = 0;
                    // @ts-ignore
                    l < updatedBlock[targets[0]][k][targets[1]].length;
                    l++
                  ) {
                    if (l === currentIndex) {
                      // @ts-ignore
                      updatedBlock[targets[0]][k][targets[1]][l] =
                        updateBlockProperty(
                          // @ts-ignore
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
                // @ts-ignore
                updatedBlock[property] = updateBlockProperty(
                  // @ts-ignore
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
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number,
  currentIndex: number,
  property: string,
  currentIndex2?: number
) => {
  setCurrentBlocks((prev) => {
    let update: Array<IComplexBlock> = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks: Array<TMixedBlocks> = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          if (j === blockIndex) {
            let targetProperties = property.split('.');

            if (currentIndex2 !== undefined) {
              // @ts-ignore
              updatedBlock[targetProperties[0]] = updatedBlock[
                targetProperties[0]
                // @ts-ignore
              ].map((p, k) => {
                let update = { ...p };
                if (k === currentIndex2) {
                  update[targetProperties[1]] = update[
                    targetProperties[1]
                    // @ts-ignore
                  ].filter((u, l) => l !== currentIndex);
                }
                return update;
              });
            } else {
              if (targetProperties.length > 1) {
                let update = [
                  // @ts-ignore
                  ...updatedBlock[targetProperties[0]][targetProperties[1]],
                ];

                update = update.filter((upb, k) => k !== currentIndex);

                // @ts-ignore
                updatedBlock[targetProperties[0]][targetProperties[1]] = update;
              } else {
                // @ts-ignore
                updatedBlock[property] = updatedBlock[property].filter(
                  // @ts-ignore
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
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>,
  index: number,
  blockIndex: number,
  property: string,
  type: string,
  currentIndex?: number
) => {
  setCurrentBlocks((prev) => {
    let update: Array<IComplexBlock> = [];

    for (let i = 0; i < prev.length; i++) {
      if (i === index) {
        let updatedBlocks: Array<TMixedBlocks> = [];

        for (let j = 0; j < prev[i].blocks.length; j++) {
          let updatedBlock = { ...prev[i].blocks[j] };
          let targetProperties = property.split('.');

          if (j === blockIndex) {
            if (currentIndex !== undefined) {
              if (targetProperties.length > 1) {
                // @ts-ignore
                updatedBlock[targetProperties[0]] = updatedBlock[
                  targetProperties[0]
                  // @ts-ignore
                ].map((t, k) => {
                  let update = { ...t };
                  if (k === currentIndex) {
                    const sliced = targetProperties.slice(
                      1,
                      targetProperties.length
                    );

                    // @ts-ignore
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
                // @ts-ignore
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
