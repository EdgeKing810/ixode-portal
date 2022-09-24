import React from 'react';

import { Input, SmallText, Text } from '../../Components';
import {
  addFlowBlockProperty,
  setFlowBlockProperty,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

import Condition from './Condition';
import Data from './Data';

export default function TemplateBlock({
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
            ? setFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'template',
                e.target.value.trim()
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
              addFlowBlockProperty(
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
          <div className="w-full" key={`${blockIndex}-${index}-data-${i}`}>
            <Data
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
