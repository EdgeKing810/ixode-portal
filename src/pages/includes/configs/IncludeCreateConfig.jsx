import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  Input,
  LinkerButton,
  SubHeading,
} from '../../../components/Components';

export default function IncludeCreateConfig({
  isCreating,
  setIsCreating,
  keyname,
  setKey,
  value,
  setValue,
  submitValue,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isCreating ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsCreating(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Create a Config
        </SubHeading>

        <IconButton
          click={() => setIsCreating(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <Input
        title="Enter key"
        placeholder="Enter key..."
        value={keyname}
        change={(e) => setKey(e.target.value.trim().split(' ').join('_'))}
        theme={theme}
        className="lg:my-2 lg:w-1/2"
      />

      <Input
        title="Enter value"
        placeholder="Enter value..."
        value={value}
        change={(e) => setValue(e.target.value)}
        theme={theme}
        className="my-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={
            keyname &&
            keyname.trim().length > 0 &&
            value &&
            value.trim().length > 0
              ? true
              : false
          }
          click={() =>
            keyname &&
            keyname.trim().length > 0 &&
            value &&
            value.trim().length > 0
              ? submitValue()
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
