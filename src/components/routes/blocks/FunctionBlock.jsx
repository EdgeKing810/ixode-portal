import React from 'react';

import {
  Input,
  InputOption,
  InputSelect,
  SmallText,
  Text,
} from '../../Components';

import {
  addInbuiltBlockProperty,
  setBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';

import RefData from './RefData';

export default function FunctionBlock({
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
      {!validateProperty(block.local_name, 'Local Name', true)
        .valid && (
        <SmallText color="error">
          *{' '}
          {
            validateProperty(block.local_name, 'Local Name', true)
              .message
          }
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="uppercase text-left mt-4 w-full"
      >
        Function
      </Text>

      <div className="w-full bg-base-300 rounded-lg p-4 my-2">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left w-full"
        >
          ID
        </Text>

        <InputSelect
          className="mt-2"
          value={block.func.id}
          change={(e) =>
            !viewOnly
              ? setBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'func.id',
                  e.target.value.trim()
                )
              : null
          }
        >
          <InputOption title="V4" value="V4">
            V4
          </InputOption>
          <InputOption title="GENERATE_TIMESTAMP" value="GENERATE_TIMESTAMP">
            GENERATE_TIMESTAMP
          </InputOption>
          <InputOption title="PAGINATE" value="PAGINATE">
            PAGINATE
          </InputOption>
        </InputSelect>

        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase mt-4 text-left w-full"
        >
          Params
        </Text>

        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Data"
            onClick={() =>
              addInbuiltBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'func.params',
                'DATA'
              )
            }
          >
            Add Param
          </button>
        )}

        {block.func.params.map((param, i) => (
          <div className="w-full" key={`${blockIndex}-${index}-param-${i}`}>
            <RefData
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="func.params"
              viewOnly={viewOnly}
              data={param}
              setCurrentBlocks={setCurrentBlocks}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
