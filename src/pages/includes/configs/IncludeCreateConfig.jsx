import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
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
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isCreating ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsCreating(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Create a Config
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsCreating(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <Input
        title="Enter key"
        placeholder="Enter key..."
        value={keyname}
        change={(e) => setKey(e.target.value.trim().split(' ').join('_'))}
        className="mt-2 lg:my-2 lg:w-1/2"
      />

      <Input
        title="Enter value"
        placeholder="Enter value..."
        value={value}
        change={(e) => setValue(e.target.value)}
        className="my-2 lg:mb-2 lg:mt-0 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            keyname &&
            keyname.trim().length > 0 &&
            value &&
            value.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            keyname &&
            keyname.trim().length > 0 &&
            value &&
            value.trim().length > 0
              ? submitValue()
              : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
