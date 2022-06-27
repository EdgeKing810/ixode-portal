import React from 'react';

import {
  BigText,
  FullAbsoluteContainer,
  IconButton,
  Image,
} from '../../../components/Components';

export default function IncludeViewMedia({
  isActive,
  setIsActive,
  name,
  url,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen left-0 top-0 left-0 lg:pt-0 ${
        isActive ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsActive(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <BigText color="primary">{name}</BigText>

        <IconButton
          click={() => setIsActive(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <div className="w-full lg:w-1/2 mt-4">
        <Image
          src={url}
          alt={name}
          className="w-full object-scale-down"
          noRounded
          noFillnn
        />
      </div>
    </FullAbsoluteContainer>
  );
}
