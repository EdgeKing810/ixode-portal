import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  Input,
  InputTextArea,
  LinkerButton,
  SubHeading,
} from '../../../components/Components';

export default function IncludeCreateCollection({
  isCreating,
  setIsCreating,
  name,
  setName,
  collectionID,
  setCollectionID,
  description,
  setDescription,
  submitCreateCollection,
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
          Create a Collection
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
        title="Enter Name"
        placeholder="Enter Name... (e.g Users)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setCollectionID(e.target.value.trim().toLowerCase());
        }}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g users)"
        value={collectionID}
        change={(e) => setCollectionID(e.target.value.trim().toLowerCase())}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <InputTextArea
        title="Enter Description"
        placeholder="Enter Description... (e.g To store users created on the platform)"
        value={description}
        change={(e) => setDescription(e.target.value)}
        theme={theme}
        className="my-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0
              ? true
              : false
          }
          click={() =>
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0
              ? submitCreateCollection()
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
