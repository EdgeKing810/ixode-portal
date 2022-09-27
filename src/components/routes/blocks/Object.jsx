import React from 'react';

import {
  setFlowBlockPropertySpecial,
  validateDefaultRouteProperty,
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
  isOperation,
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
            ? setFlowBlockPropertySpecial(
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
      {!validateDefaultRouteProperty(pair.id, 'ID', true).valid && (
        <SmallText color="error">
          * {validateDefaultRouteProperty(pair.id, 'ID', true).message}
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
