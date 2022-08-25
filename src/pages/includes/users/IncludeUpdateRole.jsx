import React from 'react';

import {
  FullAbsoluteContainer,
  SubHeading,
} from '../../../components/Components';

export default function IncludeUpdateRole({
  isUpdating,
  setIsUpdating,
  username,
  role,
  setRole,
  submitUser,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isUpdating ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsUpdating(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" className="mb-2" smallerOnMobile nobreak>
          Update role for the user{' '}
          <span className="text-base-content">{username}</span>
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsUpdating(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <div className="w-full lg:w-1/2 flex my-2">
        <button
          className={`btn w-1/4 gap-2 no-animation ${
            role === 'ROOT' ? 'btn-secondary' : 'btn-primary'
          } btn-outline rounded-r-none`}
          onClick={() => setRole('ROOT')}
        >
          ROOT
        </button>
        <button
          className={`btn w-1/4 gap-2 no-animation ${
            role === 'ADMIN' ? 'btn-secondary' : 'btn-primary'
          } btn-outline rounded-r-none rounded-l-none`}
          onClick={() => setRole('ADMIN')}
        >
          ADMIN
        </button>
        <button
          className={`btn w-1/4 gap-2 no-animation ${
            role === 'AUTHOR' ? 'btn-secondary' : 'btn-primary'
          } btn-outline rounded-r-none rounded-l-none`}
          onClick={() => setRole('AUTHOR')}
        >
          AUTHOR
        </button>

        <button
          className={`btn w-1/4 gap-2 no-animation ${
            role === 'VIEWER' ? 'btn-secondary' : 'btn-primary'
          } btn-outline rounded-l-none`}
          onClick={() => setRole('VIEWER')}
        >
          VIEWER
        </button>
      </div>

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            role && role.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() => (role && role.trim().length > 0 ? submitUser() : null)}
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
