import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
  InputTextArea,
  SubHeading,
} from '../../../components/Components';

export default function IncludeEditProject({
  isEditing,
  setIsEditing,
  title,
  data,
  setData,
  submitUpdate,
  textarea,
  format,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isEditing ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsEditing('')}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Update {title}
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsEditing('')}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      {textarea ? (
        <InputTextArea
          title={`Enter ${title}`}
          placeholder={`Enter ${title}...`}
          value={data}
          change={(e) =>
            setData(
              !format ? e.target.value : e.target.value.trim().toLowerCase()
            )
          }
          className="my-2 lg:w-1/2"
        />
      ) : (
        <Input
          title={`Enter ${title}`}
          placeholder={`Enter ${title}...`}
          value={data}
          change={(e) =>
            setData(
              !format ? e.target.value : e.target.value.trim().toLowerCase()
            )
          }
          className="my-2 lg:w-1/2"
        />
      )}

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
