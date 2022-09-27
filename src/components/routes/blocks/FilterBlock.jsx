import React from 'react';

import { Input, SmallText, Text } from '../../Components';
import {
  addFlowBlockProperty,
  setFlowBlockProperty,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';
import Filter from './Filter';

export default function FilterBlock({
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
      {!validateDefaultRouteProperty(block.local_name, 'Local Name', true)
        .valid && (
        <SmallText color="error">
          *{' '}
          {
            validateDefaultRouteProperty(block.local_name, 'Local Name', true)
              .message
          }
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase text-left w-full mt-4"
      >
        Ref Var
      </Text>
      <Input
        title="Ref Var"
        noPadding
        placeholder=""
        value={block.ref_var}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'ref_var',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateDefaultRouteProperty(block.ref_var, 'Ref Var', true).valid && (
        <SmallText color="error">
          *{' '}
          {validateDefaultRouteProperty(block.ref_var, 'Ref Var', true).message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase text-left w-full mt-4"
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

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="mt-4 w-full uppercase text-left"
      >
        Filters ({block.filters.length})
      </Text>

      <div className="w-full bg-base-300 rounded-lg lg:p-4 p-2 my-2">
        {!viewOnly && (
          <button
            className="btn btn-secondary btn-outline gap-2 w-full lg:w-1/3"
            title="Add Filter"
            onClick={() =>
              addFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'filters',
                'FILTER'
              )
            }
          >
            Add Filter
          </button>
        )}

        {block.filters.map((filter, i) => (
          <div className="w-full" key={`${blockIndex}-${index}-filter-${i}`}>
            <Filter
              index={index}
              blockIndex={blockIndex}
              currentIndex={i}
              property="filters"
              viewOnly={viewOnly}
              filter={filter}
              setCurrentBlocks={setCurrentBlocks}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
