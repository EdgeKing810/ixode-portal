import React from 'react';

import { Input, SmallText, Text } from '../../Components';
import {
  addInbuiltBlockProperty,
  setBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';

import Condition from './Condition';
import RefData from './RefData';
import { IComplexBlock, ITemplateBlock } from '../../../utils/route';

export default function TemplateBlock({
  viewOnly,
  block,
  index,
  blockIndex,
  setCurrentBlocks,
}: {
  viewOnly: boolean;
  block: ITemplateBlock;
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
        className="mt-4 uppercase text-left w-full"
      >
        Template
      </Text>
      <Input
        title="Template"
        noPadding
        placeholder=""
        value={block.template}
        min={1}
        max={1000}
        change={(e) =>
          !viewOnly
            ? setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'template',
                e.target.value
              )
            : null
        }
        className="mt-2 mb-2"
      />

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="mt-4 w-full uppercase text-left"
      >
        Data ({block.data.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Data"
            onClick={() =>
              addInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'data',
                'DATA'
              )
            }
          >
            Add Data
          </button>
        )}

        {block.data.map((data, i) => (
          <div className="w-full mt-4" key={`${blockIndex}-${index}-data-${i}`}>
            <RefData
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="data"
              viewOnly={viewOnly}
              data={data}
              setCurrentBlocks={setCurrentBlocks}
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
