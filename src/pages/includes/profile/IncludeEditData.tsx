import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  SubHeading,
} from '../../../components/Components';

export default function IncludeEditData({
  isEditing,
  setIsEditing,
  title,
  data,
  setData,
  submitUpdate,
}:{
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  submitUpdate: (s: string) => void;
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
          Update {title}
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsEditing(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <Input
        title={`Enter ${title}`}
        placeholder={`Enter ${title}...`}
        value={data}
        change={(e) => setData(e.target.value)}
        className="my-2 lg:w-1/2"
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            data && data.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            data && data.trim().length > 0 ? submitUpdate(data) : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
