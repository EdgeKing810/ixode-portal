import React from 'react';

import {
  Checkbox,
  Input,
  InputOption,
  InputSelect,
  SmallText,
  Text,
} from '../../Components';
import {
  addInbuiltBlockProperty,
  setBlockProperty,
  toggleBlockProperty,
  validateProperty,
} from '../../../utils/routeProcessor';
import Condition from './Condition';

export default function ConditionBlock({
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
        notFull
        className="w-full uppercase text-left"
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
            />
          </div>
        ))}
      </div>

      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase text-left mt-4 w-full"
      >
        Action
      </Text>

      <InputSelect
        className="mt-2"
        value={block.action}
        change={(e) =>
          !viewOnly
            ? setBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'action',
                e.target.value.trim()
              )
            : null
        }
      >
        <InputOption title="FAIL" value="FAIL">
          FAIL
        </InputOption>
        <InputOption title="BREAK" value="BREAK">
          BREAK
        </InputOption>
        <InputOption title="CONTINUE" value="CONTINUE">
          CONTINUE
        </InputOption>
      </InputSelect>

      <div className="w-full flex items-center mt-4">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left"
        >
          Fail Object
        </Text>

        {!viewOnly && (
          <Checkbox
            noMargin
            value={block.fail !== null}
            color="primary"
            change={(checked) =>
              !viewOnly
                ? toggleBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'fail',
                    checked
                  )
                : null
            }
            className="ml-2 mt-1"
          />
        )}
      </div>

      {block.fail !== null && (
        <div className="w-full bg-base-300 rounded-lg p-4 my-2">
          <Text
            color="secondary"
            smallerOnMobile
            className="uppercase text-left w-full"
          >
            Status
          </Text>
          <Input
            title="Status"
            type="number"
            noPadding
            placeholder=""
            value={block.fail.status}
            min={1}
            max={1000}
            change={(e) =>
              !viewOnly
                ? setBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'fail.status',
                    parseInt(e.target.value.trim())
                  )
                : null
            }
            className="mt-2 mb-2"
          />

          <Text
            color="secondary"
            smallerOnMobile
            className="uppercase text-left w-full"
          >
            Message
          </Text>
          <Input
            title="Message"
            noPadding
            placeholder=""
            value={block.fail.message}
            min={1}
            max={200}
            change={(e) =>
              !viewOnly
                ? setBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'fail.message',
                    e.target.value
                  )
                : null
            }
            className="mt-2 mb-2"
          />
          {!validateProperty(
            block.fail.message
              .split(':')
              .join('')
              .split(';')
              .join('')
              .split(' ')
              .join('')
              .split('.')
              .join('')
              .split('/')
              .join(''),
            'Message'
          ).valid && (
            <SmallText color="error">
              *{' '}
              {
                validateProperty(
                  block.fail.message
                    .split(':')
                    .join('')
                    .split(';')
                    .join('')
                    .split(' ')
                    .join('')
                    .split('.')
                    .join('')
                    .split('/')
                    .join(''),
                  'Message'
                ).message
              }
            </SmallText>
          )}
        </div>
      )}
    </div>
  );
}
