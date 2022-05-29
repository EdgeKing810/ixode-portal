import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  Input,
  LinkerButton,
  SubHeading,
} from '../../../components/Components';

export default function IncludeEditData({
  isEditing,
  setIsEditing,
  title,
  data,
  setData,
  submitUpdate,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isEditing ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsEditing(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Update {title}
        </SubHeading>

        <IconButton
          click={() => setIsEditing(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <Input
        title={`Enter ${title}`}
        placeholder={`Enter ${title}...`}
        value={data}
        change={(e) => setData(e.target.value)}
        theme={theme}
        className="my-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={data && data.trim().length > 0 ? true : false}
          click={() =>
            data && data.trim().length > 0 ? submitUpdate(data) : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
