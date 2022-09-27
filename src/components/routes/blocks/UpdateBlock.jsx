import React from 'react';

import { Checkbox, Input, SmallText, Text } from '../../Components';

import {
  addFlowBlockProperty,
  setFlowBlockProperty,
  toggleFlowBlockProperty,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

import RefData from './RefData';
import Condition from './Condition';
import Filter from './Filter';
import Target from './Target';

export default function UpdateBlock({
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
            ? setFlowBlockProperty(
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
      {!validateDefaultRouteProperty(block.ref_col, 'Ref Col', true).valid && (
        <SmallText color="error">
          *{' '}
          {validateDefaultRouteProperty(block.ref_col, 'Ref Col', true).message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase mt-4 text-left w-full"
      >
        Ref Property
      </Text>
      <Input
        title="Ref Property"
        noPadding
        placeholder=""
        value={block.ref_property}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'ref_property',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateDefaultRouteProperty(block.ref_property, 'Ref Property', true)
        .valid && (
        <SmallText color="error">
          *{' '}
          {
            validateDefaultRouteProperty(
              block.ref_property,
              'Ref Property',
              true
            ).message
          }
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
              ? setFlowBlockProperty(
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
        Targets ({block.targets.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Target"
            onClick={() =>
              addFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'targets',
                'TARGET'
              )
            }
          >
            Add Target
          </button>
        )}

        {block.targets.map((target, i) => (
          <div className="w-full" key={`${blockIndex}-${index}-target-${i}`}>
            <Target
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="targets"
              viewOnly={viewOnly}
              target={target}
              setCurrentBlocks={setCurrentBlocks}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex items-center mt-4">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left"
        >
          Add
        </Text>

        {!viewOnly && (
          <Checkbox
            noMargin
            value={block.add !== null}
            color="primary"
            change={(checked) =>
              !viewOnly
                ? toggleFlowBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'add',
                    checked
                  )
                : null
            }
            className="ml-2 mt-1"
          />
        )}
      </div>

      {block.add !== null && (
        <div className="w-full bg-base-300 rounded-lg p-4 my-2">
          <RefData
            index={index}
            blockIndex={blockIndex}
            currentIndex={null}
            property="add"
            viewOnly={viewOnly}
            data={block.add}
            setCurrentBlocks={setCurrentBlocks}
          />
        </div>
      )}

      <div className="w-full flex items-center mt-4">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left"
        >
          Set
        </Text>

        {!viewOnly && (
          <Checkbox
            noMargin
            value={block.set !== null}
            color="primary"
            change={(checked) =>
              !viewOnly
                ? toggleFlowBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'set',
                    checked
                  )
                : null
            }
            className="ml-2 mt-1"
          />
        )}
      </div>

      {block.set !== null && (
        <div className="w-full bg-base-300 rounded-lg p-4 my-2">
          <RefData
            index={index}
            blockIndex={blockIndex}
            currentIndex={null}
            property="set"
            viewOnly={viewOnly}
            data={block.set}
            setCurrentBlocks={setCurrentBlocks}
          />
        </div>
      )}

      <div className="w-full flex items-center mt-4">
        <Text
          color="secondary"
          smallerOnMobile
          notFull
          className="uppercase text-left"
        >
          Filter
        </Text>

        {!viewOnly && (
          <Checkbox
            noMargin
            value={block.filter !== null}
            color="primary"
            change={(checked) =>
              !viewOnly
                ? toggleFlowBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'filter',
                    checked
                  )
                : null
            }
            className="ml-2 mt-1"
          />
        )}
      </div>

      {block.filter !== null && (
        <div className="w-full bg-base-300 rounded-lg p-4 my-2">
          <Filter
            index={index}
            blockIndex={blockIndex}
            currentIndex={null}
            property="filter"
            viewOnly={viewOnly}
            filter={block.filter}
            setCurrentBlocks={setCurrentBlocks}
          />
        </div>
      )}

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
