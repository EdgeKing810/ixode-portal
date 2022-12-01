import React from 'react';

import { BigText, FullAbsoluteContainer } from '../../../components/Components';

export default function IncludeViewMedia({ isActive, setIsActive, name, url }:{
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  url: string;
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen left-0 top-0 left-0 lg:pt-0 ${
        isActive ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsActive(false)}
    >
      <div className="flex w-full lg:w-1/2 h-1/2 justify-between items-center">
        <BigText color="primary">{name}</BigText>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsActive(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <div className="w-full h-full flex items-center justify-center lg:w-1/2 mt-4 lg:max-h-150">
        <img
          src={url}
          alt={name}
          className="w-full h-full object-contain lg:object-scale-down"
          // noRounded
          // noFillnn
        />
      </div>
    </FullAbsoluteContainer>
  );
}
