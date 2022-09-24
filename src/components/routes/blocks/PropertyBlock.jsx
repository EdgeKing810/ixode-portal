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

export default function PropertyBlock({
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

        <div className="w-full mt-2 flex">
          <Checkbox
            noMargin
            title="Ref Var"
            value={block.property.data.ref_var}
            color="secondary"
            change={(checked) =>
              !viewOnly
                ? setFlowBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'property.data.ref_var',
                    checked
                  )
                : null
            }
            className=""
          />

          <InputSelect
            className="mx-2"
            value={block.property.data.rtype}
            change={(e) =>
              !viewOnly
                ? setFlowBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'property.data.rtype',
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
            value={block.property.data.data}
            max={100}
            change={(e) =>
              !viewOnly
                ? setFlowBlockProperty(
                    setCurrentBlocks,
                    index,
                    blockIndex,
                    'property.data.data',
                    e.target.value.trim()
                  )
                : null
            }
          />
        </div>

        {!validateDefaultRouteProperty(block.property.data.data, 'Data')
          .valid && (
          <SmallText color="error" className="text-right my-1">
            *{' '}
            {
              validateDefaultRouteProperty(block.property.data.data, 'Data')
                .message
            }
          </SmallText>
        )}

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
              setFlowBlockProperty(
                setCurrentBlocks,
                index,
                blockIndex,
                'property.apply',
                e.target.value.trim()
              );
              setFlowBlockProperty(
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
                  ? setFlowBlockProperty(
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

            {!validateDefaultRouteProperty(
              block.property.additional,
              'Argument'
            ).valid && (
              <SmallText color="error">
                *{' '}
                {
                  validateDefaultRouteProperty(
                    block.property.additional,
                    'Argument'
                  ).message
                }
              </SmallText>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
