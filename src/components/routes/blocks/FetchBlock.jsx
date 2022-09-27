import React from 'react';

import { Input, SmallText, Text } from '../../Components';
import {
  setFlowBlockProperty,
  validateDefaultRouteProperty,
} from '../../../utils/routeProcessor';

export default function FetchBlock({
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
        className="mt-4 uppercase text-left w-full"
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
    </div>
  );
}
