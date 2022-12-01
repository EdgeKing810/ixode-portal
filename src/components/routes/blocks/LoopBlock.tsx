import React from 'react';

import { Input, SmallText, Text } from '../../Components';

import {
  setBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';
import RefData from './RefData';
import { IComplexBlock, ILoopBlock } from '../../../utils/route';

export default function LoopBlock({
  viewOnly,
  block,
  index,
  blockIndex,
  setCurrentBlocks,
}: {
  viewOnly: boolean;
  block: ILoopBlock;
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
        className="w-full mt-4 uppercase text-left"
      >
        Min
      </Text>

      <RefData
        index={index}
        blockIndex={blockIndex}
        viewOnly={viewOnly}
        data={block.min}
        setCurrentBlocks={setCurrentBlocks}
        prep="min."
        noRemove
        normalSet
        onlyInt
      />

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full mt-4 uppercase text-left"
      >
        Max
      </Text>

      <RefData
        index={index}
        blockIndex={blockIndex}
        viewOnly={viewOnly}
        data={block.max}
        setCurrentBlocks={setCurrentBlocks}
        prep="max."
        noRemove
        normalSet
        onlyInt
      />
    </div>
  );
}
