import React from 'react';

import {
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

export default function Object({
  index,
  blockIndex,
  currentIndex,
  property,
  viewOnly,
  pair,
  setCurrentBlocks,
  isOperation,
}) {
  return (
    <div className="w-full mt-4 mb-2 bg-base-200 lg:p-2 p-1 rounded-lg">
      <Text
        color="secondary"
        smallerOnMobile
        className="uppercase text-left w-full"
      >
        ID
      </Text>

      <Input
        title="ID"
        noPadding
        placeholder=""
        value={pair.id}
        min={1}
        max={100}
        change={(e) =>
          !viewOnly
            ? setFlowBlockPropertySpecial(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property,
                'id',
                e.target.value.trim()
              )
            : null
        }
        className="mt-2 mb-2"
      />
      {!validateDefaultRouteProperty(pair.id, 'ID').valid && (
        <SmallText color="error">
          * {validateDefaultRouteProperty(pair.id, 'ID').message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full uppercase mt-4 text-left"
      >
        Data
      </Text>

      <div className="w-full mt-2 flex">
        <Checkbox
          noMargin
          title="Ref Var"
          value={pair.data.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'data.ref_var',
                  checked
                )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={pair.data.rtype}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'data.rtype',
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
          value={pair.data.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? setFlowBlockPropertySpecial(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  currentIndex,
                  property,
                  'data.data',
                  e.target.value.trim()
                )
              : null
          }
        />
      </div>

      {!validateDefaultRouteProperty(pair.data.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(pair.data.data, 'Data').message}
        </SmallText>
      )}
    </div>
  );
}
