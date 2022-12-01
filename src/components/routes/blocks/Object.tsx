import React from 'react';
import { IComplexBlock, IObjectPair } from '../../../utils/route';

import {
  setInbuiltBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';

import { Input, SmallText, Text } from '../../Components';
import RefData from './RefData';

export default function Object({
  index,
  blockIndex,
  currentIndex,
  property,
  viewOnly,
  pair,
  setCurrentBlocks,
}: {
  index: number;
  blockIndex: number;
  currentIndex: number;
  property: string;
  viewOnly: boolean;
  pair: IObjectPair;
  setCurrentBlocks: React.Dispatch<React.SetStateAction<Array<IComplexBlock>>>;
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase text-left w-full"
      >
        ID
      </Text>

      <Input
        title="ID"
        noPadding
        placeholder=""
        value={pair.id}
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
                'id',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateProperty(pair.id, 'ID', true).valid && (
        <SmallText color="error">
          * {validateProperty(pair.id, 'ID', true).message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase mt-4 text-left"
      >
        Data
      </Text>

      <RefData
        index={index}
        blockIndex={blockIndex}
        currentIndex={currentIndex}
        property={property}
        viewOnly={viewOnly}
        data={pair.data}
        setCurrentBlocks={setCurrentBlocks}
        prep="data."
        noRemove
      />
    </div>
  );
}
