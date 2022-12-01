import React from 'react';

import {
  FullAbsoluteContainer,
  SubHeading,
} from '../../../components/Components';

export default function IncludeDeleteCustomStructure({
  isActive,
  setIsActive,
  submitDeleteCustomStructure,
  name,
}:{
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  submitDeleteCustomStructure: () => void;
  name: string;
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen left-0 top-0 left-0 lg:pt-0 ${
        isActive ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsActive(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile nobreak>
          Are you sure that you want to delete the{' '}
          <span className="text-base-content">{name}</span> custom structure?
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsActive(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <div className="w-full lg:w-1/2 mt-4 flex justify-center">
        <button
          className={`btn w-1/2 gap-2 no-animation btn-error btn-outline`}
          onClick={() => submitDeleteCustomStructure()}
        >
          Yes
        </button>

        <button
          className={`btn w-1/2 gap-2 no-animation btn-success btn-outline ml-4`}
          onClick={() => setIsActive(false)}
        >
          No
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
