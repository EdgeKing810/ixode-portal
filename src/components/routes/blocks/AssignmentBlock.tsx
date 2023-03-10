import React from 'react';

import { Input, SmallText, Text } from '../../Components';
import {
  addInbuiltBlockProperty,
  setBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';
import Condition from './Condition';
import { IAssignmentBlock, IComplexBlock } from '../../../utils/route';

export default function AssignmentBlock({
  viewOnly,
  block,
  index,
  blockIndex,
  setCurrentBlocks,
}: {
  viewOnly: boolean;
  block: IAssignmentBlock;
  index: number;
  blockIndex: number;
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>;
}) {
  return (
    <div className="w-full">
      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase text-left w-full"
      >
        Local Name
      </Text>
      <Input
        title="Local Name"
        noPadding
        placeholder=""
        value={block.local_name}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'local_name',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateProperty(block.local_name, 'Local Name', true).valid && (
        <SmallText color="error">
          * {validateProperty(block.local_name, 'Local Name', true).message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="mt-4 w-full uppercase text-left"
      >
        Conditions ({block.conditions.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Condition"
            onClick={() =>
              addInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'conditions',
                'CONDITION'
              )
            }
          >
            Add Condition
          </button>
        )}

        {block.conditions.map((condition, i) => (
          <div className="w-full" key={`${blockIndex}-${index}-condition-${i}`}>
            <Condition
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="conditions"
              viewOnly={viewOnly}
              condition={condition}
              setCurrentBlocks={setCurrentBlocks}
              isOperation={false}
            />
          </div>
        ))}
      </div>

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="mt-4 w-full uppercase text-left"
      >
        Operations ({block.operations.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Operation"
            onClick={() =>
              addInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'operations',
                'OPERATION'
              )
            }
          >
            Add Operation
          </button>
        )}

        {block.operations.map((operation, i) => (
          <div className="w-full" key={`${blockIndex}-${index}-operation-${i}`}>
            <Condition
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="operations"
              viewOnly={viewOnly}
              condition={operation}
              setCurrentBlocks={setCurrentBlocks}
              isOperation
            />
          </div>
        ))}
      </div>
    </div>
  );
}
