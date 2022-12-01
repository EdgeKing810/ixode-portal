import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  SubHeading,
} from '../../../components/Components';

export default function IncludeEditConstraint({
  isEditing,
  setIsEditing,
  value,
  setValue,
  submitValue,
  valueType,
  keyname,
}: {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  submitValue: () => void;
  valueType: string;
  keyname: string;
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isEditing ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsEditing(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Enter a <span className="text-base-content">{valueType}</span> value
          for <span className="text-base-content">{keyname}</span>
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsEditing(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <Input
        title="Enter value"
        placeholder="Enter value..."
        value={value}
        change={(e) => setValue(e.target.value)}
        className="my-2 lg:w-1/2"
        type="number"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            value && value.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            value && value.trim().length > 0 ? submitValue() : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
