import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  Input,
  InputTextArea,
  LinkerButton,
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
          Create a Project
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
        placeholder="Enter Name... (e.g Konnect)"
        value={name}
        change={(e) => {
          setName(e.target.value);
          setProjectID(e.target.value.trim().toLowerCase());
        }}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <Input
        title="Enter ID"
        placeholder="Enter ID... (e.g konnect)"
        value={projectID}
        change={(e) => setProjectID(e.target.value.trim().toLowerCase())}
        theme={theme}
        className="mt-2 lg:w-1/2"
      />

      <InputTextArea
        title="Enter Description"
        placeholder="Enter Description... (e.g A next-gen Social Media Platform)"
        value={description}
        change={(e) => setDescription(e.target.value)}
        theme={theme}
        className="my-2 lg:w-1/2"
      />

      <Input
        title="Enter API Path"
        placeholder="Enter API Path... (e.g /api/v2/konnect)"
        value={apiPath}
        change={(e) => setAPIPath(e.target.value)}
        theme={theme}
        className="lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0 &&
            apiPath &&
            apiPath.trim().length > 0
              ? true
              : false
          }
          click={() =>
            name &&
            name.trim().length > 0 &&
            description &&
            description.trim().length > 0 &&
            apiPath &&
            apiPath.trim().length > 0
              ? submitCreateProject()
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
