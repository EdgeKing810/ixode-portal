import React from 'react';

import { Text } from '../../Components';
import { addFlowBlockProperty } from '../../../utils/routeProcessor';

import Object from './Object';
import Condition from './Condition';

export default function ReturnBlock({
  viewOnly,
  block,
  index,
  blockIndex,
  setCurrentBlocks,
}) {
  return (
    <div className="w-full">
      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left"
      >
        Object Pairs ({block.pairs.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Pair"
            onClick={() =>
              addFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'pairs',
                'OBJECT'
              )
            }
          >
            Add Pair
          </button>
        )}

        {block.pairs.map((pair, i) => (
          <div
            className="w-full"
            key={`${blockIndex}-${index}-object-pair-${i}`}
          >
            <Object
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="pairs"
              viewOnly={viewOnly}
              pair={pair}
              setCurrentBlocks={setCurrentBlocks}
            />
          </div>
        ))}
      </div>

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase mt-4 text-left"
      >
        Conditions ({block.conditions.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Condition"
            onClick={() =>
              addFlowBlockProperty(
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
