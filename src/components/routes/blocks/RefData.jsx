import React from 'react';

import {
  removeInbuiltBlockProperty,
  setBlockProperty,
  setInbuiltBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';

import {
  Checkbox,
  Input,
  InputOption,
  InputSelect,
  SmallText,
} from '../../Components';

export default function RefData({
  index,
  blockIndex,
  currentIndex,
  currentIndex2,
  property,
  viewOnly,
  data,
  setCurrentBlocks,
  prep,
  noRemove,
  normalSet,
  onlyInt,
}) {
  return (
    <div className="w-full bg-base-200 my-2 lg:p-2 p-1 rounded-lg">
      <div className="w-full flex items-center">
        <Checkbox
          noMargin
          title="Ref Var"
          value={data.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? normalSet
                ? setBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    `${prep ? prep : ''}ref_var`,
                    checked
                  )
                : setInbuiltBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    `${prep ? prep : ''}ref_var`,
                    checked,
                    currentIndex2
                  )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={data.rtype}
          change={(e) =>
            !viewOnly
              ? normalSet
                ? setBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    `${prep ? prep : ''}rtype`,
                    e.target.value.trim()
                  )
                : setInbuiltBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    `${prep ? prep : ''}rtype`,
                    e.target.value.trim(),
                    currentIndex2
                  )
              : null
          }
        >
          <InputOption title="INTEGER" value="INTEGER">
            INTEGER
          </InputOption>
          {!onlyInt && (
            <InputOption title="STRING" value="STRING">
              STRING
            </InputOption>
          )}
          {!onlyInt && (
            <InputOption title="BOOLEAN" value="BOOLEAN">
              BOOLEAN
            </InputOption>
          )}
          {!onlyInt && (
            <InputOption title="OTHER" value="OTHER">
              OTHER
            </InputOption>
          )}
        </InputSelect>

        <Input
          title="Data"
          placeholder={viewOnly ? '' : 'Enter Data'}
          value={data.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? normalSet
                ? setBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    `${prep ? prep : ''}data`,
                    e.target.value.trim()
                  )
                : setInbuiltBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    `${prep ? prep : ''}data`,
                    e.target.value.trim(),
                    currentIndex2
                  )
              : null
          }
        />

        {!viewOnly && !noRemove && (
          <button
            className="btn btn-sm btn-error btn-outline btn-circle ml-2"
            title="Remove"
            onClick={() =>
              removeInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property,
                currentIndex2
              )
            }
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>

      {!validateProperty(data.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateProperty(data.data, 'Data').message}
        </SmallText>
      )}
    </div>
  );
}
