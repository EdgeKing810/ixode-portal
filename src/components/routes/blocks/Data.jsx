import React from 'react';

import {
  removeFlowBlockPropertySpecial,
  setFlowBlockPropertySpecial,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

import {
  Checkbox,
  Input,
  InputOption,
  InputSelect,
  SmallText,
} from '../../Components';

export default function Data({
  index,
  blockIndex,
  currentIndex,
  property,
  viewOnly,
  data,
  setCurrentBlocks,
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <div className="w-full flex items-center">
        <Checkbox
          noMargin
          title="Ref Var"
          value={data.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'ref_var',
                  checked
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
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'rtype',
                  e.target.value.trim()
                )
              : null
          }
        >
          <InputOption title="INTEGER" value="INTEGER">
            INTEGER
          </InputOption>
          <InputOption title="STRING" value="STRING">
            STRING
          </InputOption>
          <InputOption title="BOOLEAN" value="BOOLEAN">
            BOOLEAN
          </InputOption>
          <InputOption title="OTHER" value="OTHER">
            OTHER
          </InputOption>
        </InputSelect>

        <Input
          title="Data"
          placeholder={viewOnly ? '' : 'Enter Data'}
          value={data.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'data',
                  e.target.value.trim()
                )
              : null
          }
        />

        {!viewOnly && (
          <button
            className="btn btn-sm btn-error btn-outline btn-circle ml-2"
            title="Remove"
            onClick={() =>
              removeFlowBlockPropertySpecial(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property
              )
            }
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>

      {!validateDefaultRouteProperty(data.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(data.data, 'Data').message}
        </SmallText>
      )}
    </div>
  );
}
