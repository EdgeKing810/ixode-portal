import React from 'react';

import {
  Input,
  InputOption,
  InputSelect,
  SmallText,
  Text,
} from '../../Components';
import {
  setBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';
import RefData from './RefData';
import { IComplexBlock, IPropertyBlock } from '../../../utils/route';

export default function PropertyBlock({
  viewOnly,
  block,
  index,
  blockIndex,
  setCurrentBlocks,
}: {
  viewOnly: boolean;
  block: IPropertyBlock;
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
        className="uppercase text-left mt-4 w-full"
      >
        Property
      </Text>

      <div className="w-full bg-base-300 rounded-lg p-4 my-2">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left w-full"
        >
          Data
        </Text>

        <RefData
          index={index}
          blockIndex={blockIndex}
          viewOnly={viewOnly}
          data={block.property.data}
          setCurrentBlocks={setCurrentBlocks}
          prep="property.data."
          noRemove
          normalSet
        />

        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left w-full mt-4"
        >
          Apply
        </Text>

        <InputSelect
          className="mt-2"
          value={block.property.apply}
          change={(e) => {
            if (!viewOnly) {
              setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'property.apply',
                e.target.value.trim()
              );
              setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'property.additional',
                ''
              );
            }
          }}
        >
          <InputOption title="GET_FIRST" value="GET_FIRST">
            GET_FIRST
          </InputOption>
          <InputOption title="GET_LAST" value="GET_LAST">
            GET_LAST
          </InputOption>
          <InputOption title="LENGTH" value="LENGTH">
            LENGTH
          </InputOption>
          <InputOption title="GET_INDEX" value="GET_INDEX">
            GET_INDEX
          </InputOption>
          <InputOption title="GET_PROPERTY" value="GET_PROPERTY">
            GET_PROPERTY
          </InputOption>
        </InputSelect>

        {['GET_INDEX', 'GET_PROPERTY'].includes(block.property.apply) && (
          <div className="w-full">
            <Text
              color="secondary"
              smallerOnMobile
              className="uppercase text-left w-full mt-2"
            >
              Additional Argument
            </Text>

            <Input
              title="Additional Argument"
              type={block.property.apply === 'GET_INDEX' ? 'number' : 'text'}
              noPadding
              placeholder=""
              value={block.property.additional}
              min={1}
              max={100}
              change={(e) =>
                !viewOnly
                  ? setBlockProperty(
                      setCurrentBlocks,
                      index,
                      blockIndex,
                      'property.additional',
                      e.target.value
                    )
                  : null
              }
              className="mt-2 mb-2"
            />

            {!validateProperty(block.property.additional, 'Argument', false)
              .valid && (
              <SmallText color="error">
                *{' '}
                {
                  validateProperty(block.property.additional, 'Argument', false)
                    .message
                }
              </SmallText>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
