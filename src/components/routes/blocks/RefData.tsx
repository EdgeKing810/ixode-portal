import React from 'react';
import { IComplexBlock, IRefData } from '../../../utils/route';

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
}: {
  index: number;
  blockIndex: number;
  currentIndex?: number;
  currentIndex2?: number;
  property?: string;
  viewOnly: boolean;
  data: IRefData;
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>;
  prep?: string;
  noRemove?: boolean;
  normalSet?: boolean;
  onlyInt?: boolean;
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
              ? normalSet || !currentIndex || !property
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
              ? normalSet || !currentIndex || !property
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
            <InputOption title="FLOAT" value="FLOAT">
              FLOAT
            </InputOption>
          )}
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
            <InputOption title="ARRAY" value="ARRAY">
              ARRAY
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
              ? normalSet || !currentIndex || !property
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

        {!viewOnly && !noRemove && currentIndex && property && (
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

      {!validateProperty(
        data.rtype === 'FLOAT'
          ? data.data.split('.').join('')
          : data.rtype === 'ARRAY'
          ? data.data.split(',').join('')
          : data.data,
        'Data',
        false
      ).valid && (
        <SmallText color="error" className="text-right my-1">
          *{' '}
          {
            validateProperty(
              data.rtype === 'FLOAT'
                ? data.data.split('.').join('')
                : data.rtype === 'ARRAY'
                ? data.data.split(',').join('')
                : data.data,
              'Data',
              false
            ).message
          }
        </SmallText>
      )}
    </div>
  );
}
