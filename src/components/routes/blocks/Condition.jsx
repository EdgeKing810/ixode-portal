import React from 'react';

import {
  removeFlowBlockPropertySpecial,
  setFlowBlockPropertySpecial,
} from '../../../utils/routeProcessor';

import { InputOption, InputSelect, Text } from '../../Components';

import ConditionType from './ConditionType';
import OperationType from './OperationType';
import RefData from './RefData';

export default function Condition({
  index,
  blockIndex,
  currentIndex,
  property,
  viewOnly,
  condition,
  setCurrentBlocks,
  isOperation,
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left"
      >
        Left
      </Text>

      <RefData
        index={index}
        blockIndex={blockIndex}
        currentIndex={currentIndex}
        property={property}
        viewOnly={viewOnly}
        data={condition.left}
        setCurrentBlocks={setCurrentBlocks}
        prep="left."
        noRemove
      />

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left mt-2"
      >
        Right
      </Text>

      <RefData
        index={index}
        blockIndex={blockIndex}
        currentIndex={currentIndex}
        property={property}
        viewOnly={viewOnly}
        data={condition.right}
        setCurrentBlocks={setCurrentBlocks}
        prep="right."
        noRemove
      />

      <div className="my-2 gap-2 grid grid-cols-5">
        {!isOperation ? (
          <ConditionType
            condition={condition}
            viewOnly={viewOnly}
            setCurrentBlocks={setCurrentBlocks}
            index={index}
            blockIndex={blockIndex}
            currentIndex={currentIndex}
            property={property}
          />
        ) : (
          <OperationType
            condition={condition}
            viewOnly={viewOnly}
            setCurrentBlocks={setCurrentBlocks}
            index={index}
            blockIndex={blockIndex}
            currentIndex={currentIndex}
            property={property}
          />
        )}

        <div className="flex flex-col items-center col-span-1">
          <Text color="secondary" smallerOnMobile className="text-center">
            Not
          </Text>

          <InputSelect
            className="mt-2"
            value={condition.not ? 'TRUE' : 'FALSE'}
            change={(e) =>
              !viewOnly
                ? setFlowBlockPropertySpecial(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    'not',
                    e.target.value.trim() === 'TRUE'
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
            value={condition.next}
            change={(e) =>
              !viewOnly
                ? setFlowBlockPropertySpecial(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    'next',
                    e.target.value.trim()
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

      {!viewOnly && (
        <div className="w-full flex justify-end">
          <button
            className="btn btn-error btn-outline gap-2 mt-2 w-full lg:w-1/3"
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
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
