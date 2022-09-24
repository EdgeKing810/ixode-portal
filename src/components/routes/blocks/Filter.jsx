import React from 'react';

import {
  removeFlowBlockPropertySpecial,
  setFlowBlockPropertySpecial,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

import {
  Checkbox,
  Input,
  InputOption,
  InputSelect,
  SmallText,
  Text,
} from '../../Components';

import OperationType from './OperationType';

export default function Filter({
  index,
  blockIndex,
  currentIndex,
  currentIndex2,
  property,
  viewOnly,
  filter,
  setCurrentBlocks,
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left"
      >
        Right
      </Text>

      <div className="w-full mt-2 flex">
        <Checkbox
          noMargin
          title="Ref Var"
          value={filter.right.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'right.ref_var',
                  checked,
                  currentIndex2
                )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={filter.right.rtype}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'right.rtype',
                  e.target.value.trim(),
                  currentIndex2
                )
              : null
          }
        >
          <InputOption title="INTEGER" value="INTEGER">
            INTEGER
          </InputOption>
          <InputOption title="STRING" value="STRING">
            STRING
          </InputOption>
          <InputOption title="BOOLEAN" value="BOOLEAN">
            BOOLEAN
          </InputOption>
          <InputOption title="OTHER" value="OTHER">
            OTHER
          </InputOption>
        </InputSelect>

        <Input
          title="Data"
          placeholder={viewOnly ? '' : 'Enter Data'}
          value={filter.right.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'right.data',
                  e.target.value.trim(),
                  currentIndex2
                )
              : null
          }
        />
      </div>

      {!validateDefaultRouteProperty(filter.right.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(filter.right.data, 'Data').message}
        </SmallText>
      )}

      <div className="my-2 gap-2 grid grid-cols-5">
        <OperationType
          condition={filter}
          viewOnly={viewOnly}
          setCurrentBlocks={setCurrentBlocks}
          index={index}
          blockIndex={blockIndex}
          currentIndex={currentIndex}
          currentIndex2={currentIndex2}
          property={property}
        />

        <div className="flex flex-col items-center col-span-1">
          <Text color="secondary" smallerOnMobile className="text-center">
            Not
          </Text>

          <InputSelect
            className="mt-2"
            value={filter.not ? 'TRUE' : 'FALSE'}
            change={(e) =>
              !viewOnly
                ? setFlowBlockPropertySpecial(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    'not',
                    e.target.value.trim() === 'TRUE',
                    currentIndex2
                  )
                : null
            }
          >
            <InputOption title="TRUE" value="TRUE">
              TRUE
            </InputOption>
            <InputOption title="FALSE" value="FALSE">
              FALSE
            </InputOption>
          </InputSelect>
        </div>

        <div className="flex flex-col items-center col-span-2">
          <Text color="secondary" smallerOnMobile className="text-center">
            Next
          </Text>

          <InputSelect
            className="mt-2"
            value={filter.next}
            change={(e) =>
              !viewOnly
                ? setFlowBlockPropertySpecial(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    'next',
                    e.target.value.trim(),
                    currentIndex2
                  )
                : null
            }
          >
            <InputOption title="AND" value="AND">
              AND
            </InputOption>
            <InputOption title="OR" value="OR">
              OR
            </InputOption>
            <InputOption title="NONE" value="NONE">
              NONE
            </InputOption>
          </InputSelect>
        </div>
      </div>

      {!viewOnly && (
        <div className="w-full flex justify-end">
          <button
            className="btn btn-error btn-outline gap-2 mt-2 w-full lg:w-1/3"
            title="Remove"
            onClick={() =>
              removeFlowBlockPropertySpecial(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property,
                currentIndex2
              )
            }
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
