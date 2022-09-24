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

import ConditionType from './ConditionType';
import OperationType from './OperationType';

export default function Condition({
  index,
  blockIndex,
  currentIndex,
  property,
  viewOnly,
  condition,
  setCurrentBlocks,
  isOperation,
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left"
      >
        Left
      </Text>

      <div className="w-full mt-2 flex">
        <Checkbox
          noMargin
          title="Ref Var"
          value={condition.left.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'left.ref_var',
                  checked
                )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={condition.left.rtype}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'left.rtype',
                  e.target.value.trim()
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
          value={condition.left.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'left.data',
                  e.target.value.trim()
                )
              : null
          }
        />
      </div>

      {!validateDefaultRouteProperty(condition.left.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(condition.left.data, 'Data').message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase text-left mt-2"
      >
        Right
      </Text>

      <div className="w-full mt-2 flex">
        <Checkbox
          noMargin
          title="Ref Var"
          value={condition.right.ref_var}
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
                  checked
                )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={condition.right.rtype}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'right.rtype',
                  e.target.value.trim()
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
          value={condition.right.data}
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
                  e.target.value.trim()
                )
              : null
          }
        />
      </div>

      {!validateDefaultRouteProperty(condition.right.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(condition.right.data, 'Data').message}
        </SmallText>
      )}

      <div className="my-2 gap-2 grid grid-cols-5">
        {!isOperation ? (
          <ConditionType
            condition={condition}
            viewOnly={viewOnly}
            setCurrentBlocks={setCurrentBlocks}
            index={index}
            blockIndex={blockIndex}
            currentIndex={currentIndex}
            property={property}
          />
        ) : (
          <OperationType
            condition={condition}
            viewOnly={viewOnly}
            setCurrentBlocks={setCurrentBlocks}
            index={index}
            blockIndex={blockIndex}
            currentIndex={currentIndex}
            property={property}
          />
        )}

        <div className="flex flex-col items-center col-span-1">
          <Text color="secondary" smallerOnMobile className="text-center">
            Not
          </Text>

          <InputSelect
            className="mt-2"
            value={condition.not ? 'TRUE' : 'FALSE'}
            change={(e) =>
              !viewOnly
                ? setFlowBlockPropertySpecial(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    'not',
                    e.target.value.trim() === 'TRUE'
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
            value={condition.next}
            change={(e) =>
              !viewOnly
                ? setFlowBlockPropertySpecial(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    currentIndex,
                    property,
                    'next',
                    e.target.value.trim()
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
                property
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
