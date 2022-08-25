import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  InputTextArea,
  SubHeading,
} from '../../../components/Components';

export default function IncludeCreateProject({
  isCreating,
  setIsCreating,
  name,
  setName,
  projectID,
  setProjectID,
  description,
  setDescription,
  apiPath,
  setAPIPath,
  submitCreateProject,
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
          Create a Project
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
        placeholder="Enter Name... (e.g Konnect)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setProjectID(e.target.value.trim().toLowerCase());
        }}
        className="mt-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g konnect)"
        value={projectID}
        change={(e) => setProjectID(e.target.value.trim().toLowerCase())}
        className="mt-2 lg:w-1/2"
      />

      <InputTextArea
        title="Enter Description"
        placeholder="Enter Description... (e.g A next-gen Social Media Platform)"
        value={description}
        change={(e) => setDescription(e.target.value)}
        className="my-2 lg:w-1/2"
      />

      <Input
        title="Enter API Path"
        placeholder="Enter API Path... (e.g /api/v2/konnect)"
        value={apiPath}
        change={(e) => setAPIPath(e.target.value)}
        className="lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0 &&
            apiPath &&
            apiPath.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0 &&
            apiPath &&
            apiPath.trim().length > 0
              ? submitCreateProject()
              : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
