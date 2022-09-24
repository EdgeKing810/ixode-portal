import React from 'react';

import { InputOption, InputSelect, Text } from '../../Components';
import { setFlowBlockPropertySpecial } from '../../../utils/routeProcessor';

export default function ConditionType({
  condition,
  viewOnly,
  setCurrentBlocks,
  index,
  blockIndex,
  currentIndex,
  property,
}) {
  return (
    <div className="flex flex-col items-center col-span-2">
      <Text color="secondary" smallerOnMobile className="text-center">
        Type
      </Text>

      <InputSelect
        className="mt-2"
        value={condition.condition_type}
        change={(e) =>
          !viewOnly
            ? setFlowBlockPropertySpecial(
                setCurrentBlocks,
                index,
                blockIndex,
                currentIndex,
                property,
                'condition_type',
                e.target.value.trim()
              )
            : null
        }
      >
        <InputOption title="GREATER_THAN" value="GREATER_THAN">
          GREATER_THAN
        </InputOption>
        <InputOption title="LESS_THAN" value="LESS_THAN">
          LESS_THAN
        </InputOption>
        <InputOption title="EQUAL_TO" value="EQUAL_TO">
          EQUAL_TO
        </InputOption>
        <InputOption title="NOT_EQUAL_TO" value="NOT_EQUAL_TO">
          NOT_EQUAL_TO
        </InputOption>
        <InputOption
          title="GREATER_THAN_OR_EQUAL_TO"
          value="GREATER_THAN_OR_EQUAL_TO"
        >
          GREATER_THAN_OR_EQUAL_TO
        </InputOption>
        <InputOption
          title="LESS_THAN_OR_EQUAL_TO"
          value="LESS_THAN_OR_EQUAL_TO"
        >
          LESS_THAN_OR_EQUAL_TO
        </InputOption>
        <InputOption title="INCLUDES" value="INCLUDES">
          INCLUDES
        </InputOption>
      </InputSelect>
    </div>
  );
}
