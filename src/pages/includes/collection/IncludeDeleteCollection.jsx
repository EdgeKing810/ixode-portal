import React from 'react';

import {
  Button,
  FullAbsoluteContainer,
  IconButton,
  SubHeading,
} from '../../../components/Components';

export default function IncludeDeleteCollection({
  isActive,
  setIsActive,
  submitDeleteCollection,
  name,
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
        <SubHeading color="primary" smallerOnMobile nobreak>
          Are you sure that you want to delete the{' '}
          <span
            className={theme === 'light' ? 'text-main-dark' : 'text-main-light'}
          >
            {name}
          </span>{' '}
          collection?
        </SubHeading>

        <IconButton
          click={() => setIsActive(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <div className="w-full lg:w-1/2 mt-4 flex justify-center">
        <Button
          color="error"
          theme={theme}
          className="py-2 lg:py-3 w-1/2 justify-center uppercase"
          click={() => submitDeleteCollection()}
        >
          Yes
        </Button>

        <Button
          color="success"
          theme={theme}
          className="py-2 lg:py-3 w-1/2 justify-center uppercase ml-4"
          click={() => setIsActive(false)}
        >
          No
        </Button>
      </div>
    </FullAbsoluteContainer>
  );
}
