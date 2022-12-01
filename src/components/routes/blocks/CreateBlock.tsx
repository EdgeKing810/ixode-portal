import React from 'react';

import { Checkbox, Input, SmallText, Text } from '../../Components';

import {
  addInbuiltBlockProperty,
  setBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';

import Condition from './Condition';
import { IComplexBlock, ICreateBlock } from '../../../utils/route';

export default function CreateBlock({
  viewOnly,
  block,
  index,
  blockIndex,
  setCurrentBlocks,
}: {
  viewOnly: boolean;
  block: ICreateBlock;
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
        Ref Col
      </Text>
      <Input
        title="Ref Col"
        noPadding
        placeholder=""
        value={block.ref_col}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'ref_col',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateProperty(block.ref_col, 'Ref Col', true).valid && (
        <SmallText color="error">
          * {validateProperty(block.ref_col, 'Ref Col', true).message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase mt-4 text-left w-full"
      >
        Ref Object
      </Text>
      <Input
        title="Ref Object"
        noPadding
        placeholder=""
        value={block.ref_object}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'ref_object',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateProperty(block.ref_object, 'Ref Object', true).valid && (
        <SmallText color="error">
          * {validateProperty(block.ref_object, 'Ref Object', true).message}
        </SmallText>
      )}

      <div className="w-full flex items-center mt-4">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left"
        >
          Save
        </Text>
        <Checkbox
          noMargin
          value={block.save}
          color="primary"
          change={(checked) =>
            !viewOnly
              ? setBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'save',
                  checked
                )
              : null
          }
          className="ml-2 mt-1"
        />
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
    </div>
  );
}
