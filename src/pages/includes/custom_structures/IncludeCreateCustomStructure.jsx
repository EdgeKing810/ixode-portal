import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  Input,
  LinkerButton,
  SubHeading,
} from '../../../components/Components';

export default function IncludeCreateCustomStructure({
  isCreating,
  setIsCreating,
  collectionName,
  name,
  setName,
  customStructureID,
  setCustomStructureID,
  submitCustomStructure,
  theme,
  isEditing,
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
        {!isEditing ? (
          <SubHeading color="primary" smallerOnMobile>
            Create a Custom Structure in{' '}
            <span
              className={
                theme === 'light' ? 'text-main-dark' : 'text-main-light'
              }
            >
              {collectionName}
            </span>
          </SubHeading>
        ) : (
          <SubHeading color="primary" smallerOnMobile>
            Edit{' '}
            <span
              className={
                theme === 'light' ? 'text-main-dark' : 'text-main-light'
              }
            >
              {name}
            </span>{' '}
            Custom Structure in{' '}
            <span
              className={
                theme === 'light' ? 'text-main-dark' : 'text-main-light'
              }
            >
              {collectionName}
            </span>
          </SubHeading>
        )}

        <IconButton
          click={() => setIsCreating(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <Input
        title="Enter Name"
        placeholder="Enter Name... (e.g comments)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setCustomStructureID(e.target.value.trim().toLowerCase());
        }}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g comments)"
        value={customStructureID}
        change={(e) =>
          setCustomStructureID(e.target.value.trim().toLowerCase())
        }
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={
            name &&
            name.trim().length > 0 &&
            customStructureID &&
            customStructureID.trim().length > 0
              ? true
              : false
          }
          click={() =>
            name &&
            name.trim().length > 0 &&
            customStructureID &&
            customStructureID.trim().length > 0
              ? submitCustomStructure()
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
