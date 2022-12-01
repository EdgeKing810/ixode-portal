import React from 'react';
import { IComplexBlock, IUpdateTarget } from '../../../utils/route';

import {
  addInbuiltBlockProperty,
  removeInbuiltBlockProperty,
  setInbuiltBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';

import { Input, SmallText, Text } from '../../Components';

import Filter from './Filter';

export default function Target({
  index,
  blockIndex,
  currentIndex,
  property,
  viewOnly,
  target,
  setCurrentBlocks,
}: {
  index: number;
  blockIndex: number;
  currentIndex: number;
  property: string;
  viewOnly: boolean;
  target: IUpdateTarget;
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>;
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <div className="w-full flex items-center">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left"
        >
          Field {currentIndex + 1}
        </Text>

        {!viewOnly && (
          <button
            className="btn btn-sm btn-error btn-outline btn-circle ml-2"
            title="Remove Target"
            onClick={() => {
              removeInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property
              );
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>

      <Input
        title="Field"
        noPadding
        placeholder=""
        value={target.field}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property,
                'field',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateProperty(target.field, 'Field', true).valid && (
        <SmallText color="error">
          * {validateProperty(target.field, 'Field', true).message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase mt-4 text-left"
      >
        Conditions ({target.conditions.length})
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
                'targets.conditions',
                'FILTER',
                currentIndex
              )
            }
          >
            Add Condition
          </button>
        )}

        {target.conditions.map((filter, i) => (
          <div
            className="w-full"
            key={`${blockIndex}-${index}-${currentIndex}-filter-${i}`}
          >
            <Filter
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              currentIndex2={currentIndex}
              property="targets.conditions"
              viewOnly={viewOnly}
              filter={filter}
              setCurrentBlocks={setCurrentBlocks}
              useConditionType
            />
          </div>
        ))}
      </div>
    </div>
  );
}
