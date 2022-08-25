import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  InputTextArea,
  SubHeading,
} from '../../../components/Components';

export default function IncludeCreateCustomStructure({
  isCreating,
  setIsCreating,
  collectionName,
  name,
  setName,
  description,
  setDescription,
  customStructureID,
  setCustomStructureID,
  submitCustomStructure,
  isEditing,
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
        {!isEditing ? (
          <SubHeading color="primary" smallerOnMobile>
            Create a Custom Structure in{' '}
            <span className="text-base-content">{collectionName}</span>
          </SubHeading>
        ) : (
          <SubHeading color="primary" smallerOnMobile>
            Edit <span className="text-base-content">{name}</span> Custom
            Structure in{' '}
            <span className="text-base-content">{collectionName}</span>
          </SubHeading>
        )}

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsCreating(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <Input
        title="Enter Name"
        placeholder="Enter Name... (e.g comments)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setCustomStructureID(e.target.value.trim().toLowerCase());
        }}
        className="mt-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g comments)"
        value={customStructureID}
        change={(e) =>
          setCustomStructureID(e.target.value.trim().toLowerCase())
        }
        className="mt-2 lg:w-1/2"
      />

      <InputTextArea
        title="Enter Description"
        placeholder="Enter Description... (optional)"
        value={description}
        change={(e) => setDescription(e.target.value)}
        className="my-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            name &&
            name.trim().length > 0 &&
            customStructureID &&
            customStructureID.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            name &&
            name.trim().length > 0 &&
            customStructureID &&
            customStructureID.trim().length > 0
              ? submitCustomStructure()
              : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
