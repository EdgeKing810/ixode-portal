import React from 'react';

import {
  removeInbuiltBlockProperty,
  setBlockProperty,
  setInbuiltBlockProperty,
} from '../../../utils/routeProcessor';

import { InputOption, InputSelect, Text } from '../../Components';

import OperationType from './OperationType';
import ConditionType from './ConditionType';
import RefData from './RefData';
import { IComplexBlock, IConditionPlain, IFilter } from '../../../utils/route';

export default function Filter({
  index,
  blockIndex,
  currentIndex,
  currentIndex2,
  property,
  viewOnly,
  filter,
  setCurrentBlocks,
  normalSet,
  prep,
  useConditionType,
}: {
  index: number;
  blockIndex: number;
  currentIndex?: number;
  currentIndex2?: number;
  property: string;
  viewOnly: boolean;
  filter: IFilter | IConditionPlain;
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>;
  normalSet?: boolean;
  prep?: string;
  useConditionType?: boolean;
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left"
      >
        Right
      </Text>

      <RefData
        index={index}
        blockIndex={blockIndex}
        currentIndex={currentIndex}
        currentIndex2={currentIndex2}
        property={property}
        viewOnly={viewOnly}
        data={filter.right}
        setCurrentBlocks={setCurrentBlocks}
        noRemove
        normalSet={normalSet}
        prep={`${prep ? prep : ''}right.`}
        onlyInt={false}
      />

      <div className="my-2 gap-2 grid grid-cols-5">
        {useConditionType ? (
          <ConditionType
            // @ts-ignore
            condition={filter}
            viewOnly={viewOnly}
            setCurrentBlocks={setCurrentBlocks}
            index={index}
            blockIndex={blockIndex}
            currentIndex={currentIndex}
            currentIndex2={currentIndex2}
            property={property}
            normalSet={normalSet}
            prep={prep}
          />
        ) : (
          <OperationType
            // @ts-ignore
            condition={filter}
            viewOnly={viewOnly}
            setCurrentBlocks={setCurrentBlocks}
            index={index}
            blockIndex={blockIndex}
            currentIndex={currentIndex}
            currentIndex2={currentIndex2}
            property={property}
            normalSet={normalSet}
            prep={prep}
          />
        )}

        <div className="flex flex-col items-center col-span-1">
          <Text color="secondary" smallerOnMobile className="text-center">
            Not
          </Text>

          <InputSelect
            className="mt-2"
            value={filter.not ? 'TRUE' : 'FALSE'}
            change={(e) =>
              !viewOnly
                ? normalSet || !currentIndex
                  ? setBlockProperty(
                      setCurrentBlocks,
                      index,
                      blockIndex,
                      `${prep ? prep : ''}not`,
                      e.target.value.trim() === 'TRUE'
                    )
                  : setInbuiltBlockProperty(
                      setCurrentBlocks,
                      index,
                      blockIndex,
                      currentIndex,
                      property,
                      'not',
                      e.target.value.trim() === 'TRUE',
                      currentIndex2
                    )
                : null
            }
          >
            <InputOption title="TRUE" value="TRUE">
              TRUE
            </InputOption>
            <InputOption title="FALSE" value="FALSE">
              FALSE
            </InputOption>
          </InputSelect>
        </div>

        <div className="flex flex-col items-center col-span-2">
          <Text color="secondary" smallerOnMobile className="text-center">
            Next
          </Text>

          <InputSelect
            className="mt-2"
            value={filter.next}
            change={(e) =>
              !viewOnly
                ? normalSet || !currentIndex
                  ? setBlockProperty(
                      setCurrentBlocks,
                      index,
                      blockIndex,
                      `${prep ? prep : ''}next`,
                      e.target.value.trim()
                    )
                  : setInbuiltBlockProperty(
                      setCurrentBlocks,
                      index,
                      blockIndex,
                      currentIndex,
                      property,
                      'next',
                      e.target.value.trim(),
                      currentIndex2
                    )
                : null
            }
          >
            <InputOption title="AND" value="AND">
              AND
            </InputOption>
            <InputOption title="OR" value="OR">
              OR
            </InputOption>
            <InputOption title="NONE" value="NONE">
              NONE
            </InputOption>
          </InputSelect>
        </div>
      </div>

      {!viewOnly && currentIndex && (
        <div className="w-full flex justify-end">
          <button
            className="btn btn-error btn-outline gap-2 mt-2 w-full lg:w-1/3"
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
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
