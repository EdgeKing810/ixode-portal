import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  InputTextArea,
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
}: {
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  collectionID: string;
  setCollectionID: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  submitCreateCollection: () => void;
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
          Create a Collection
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsCreating(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <Input
        title="Enter Name"
        placeholder="Enter Name... (e.g Users)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setCollectionID(e.target.value.trim().toLowerCase());
        }}
        className="mt-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g users)"
        value={collectionID}
        change={(e) => setCollectionID(e.target.value.trim().toLowerCase())}
        className="mt-2 lg:w-1/2"
      />

      <InputTextArea
        title="Enter Description"
        placeholder="Enter Description... (e.g To store users created on the platform)"
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
            description &&
            description.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0
              ? submitCreateCollection()
              : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
