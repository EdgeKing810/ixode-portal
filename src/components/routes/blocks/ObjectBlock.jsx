import React from 'react';

import { Input, SmallText, Text } from '../../Components';
import {
  addFlowBlockProperty,
  setFlowBlockProperty,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

import Object from './Object';

export default function ObjectBlock({
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
            ? setFlowBlockProperty(
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
      {!validateDefaultRouteProperty(block.local_name, 'Local Name').valid && (
        <SmallText color="error">
          *{' '}
          {validateDefaultRouteProperty(block.local_name, 'Local Name').message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full mt-4 uppercase text-left"
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
    </div>
  );
}
