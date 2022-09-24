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
  setFlowBlockProperty,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

export default function LoopBlock({
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
        notFull
        className="w-full mt-4 uppercase text-left"
      >
        Min
      </Text>

      <div className="w-full mt-2 flex">
        <Checkbox
          noMargin
          title="Min"
          value={block.min.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? setFlowBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'min.ref_var',
                  checked
                )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={block.min.rtype}
          change={(e) =>
            !viewOnly
              ? setFlowBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'min.rtype',
                  e.target.value.trim()
                )
              : null
          }
        >
          <InputOption title="INTEGER" value="INTEGER">
            INTEGER
          </InputOption>
        </InputSelect>

        <Input
          title="Data"
          placeholder={viewOnly ? '' : 'Enter Data'}
          value={block.min.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? setFlowBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'min.data',
                  e.target.value.trim()
                )
              : null
          }
        />
      </div>

      {!validateDefaultRouteProperty(block.min.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(block.min.data, 'Data').message}
        </SmallText>
      )}

      <Text
        color="secondary"
        smallerOnMobile
        notFull
        className="w-full mt-4 uppercase text-left"
      >
        Max
      </Text>

      <div className="w-full mt-2 flex">
        <Checkbox
          noMargin
          title="Max"
          value={block.max.ref_var}
          color="secondary"
          change={(checked) =>
            !viewOnly
              ? setFlowBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'max.ref_var',
                  checked
                )
              : null
          }
          className=""
        />

        <InputSelect
          className="mx-2"
          value={block.max.rtype}
          change={(e) =>
            !viewOnly
              ? setFlowBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'max.rtype',
                  e.target.value.trim()
                )
              : null
          }
        >
          <InputOption title="INTEGER" value="INTEGER">
            INTEGER
          </InputOption>
        </InputSelect>

        <Input
          title="Data"
          placeholder={viewOnly ? '' : 'Enter Data'}
          value={block.max.data}
          max={100}
          change={(e) =>
            !viewOnly
              ? setFlowBlockProperty(
                  setCurrentBlocks,
                  index,
                  blockIndex,
                  'max.data',
                  e.target.value.trim()
                )
              : null
          }
        />
      </div>

      {!validateDefaultRouteProperty(block.min.data, 'Data').valid && (
        <SmallText color="error" className="text-right my-1">
          * {validateDefaultRouteProperty(block.min.data, 'Data').message}
        </SmallText>
      )}
    </div>
  );
}
