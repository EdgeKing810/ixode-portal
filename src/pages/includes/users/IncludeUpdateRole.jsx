import React from 'react';

import {
  Button,
  FullAbsoluteContainer,
  IconButton,
  LinkerButton,
  SubHeading,
  //   Title,
} from '../../../components/Components';

export default function IncludeUpdateRole({
  isUpdating,
  setIsUpdating,
  username,
  role,
  setRole,
  submitUser,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isUpdating ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsUpdating(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" className="mb-2" smallerOnMobile nobreak>
          Update role for the user{' '}
          <span
            className={theme === 'light' ? 'text-main-dark' : 'text-main-light'}
          >
            {username}
          </span>
        </SubHeading>

        <IconButton
          click={() => setIsUpdating(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      {/* <Title color="primary" className="lg:w-1/2">
        Select a Role
      </Title> */}

      <div className="w-full lg:w-1/2 flex -mt-2">
        <Button
          className="w-full py-2 rounded-r-none"
          click={() => setRole('ROOT')}
          color={role === 'ROOT' ? 'secondary' : 'primary'}
          theme={theme}
        >
          ROOT
        </Button>
        <Button
          className="w-full py-2 rounded-r-none rounded-l-none"
          click={() => setRole('ADMIN')}
          color={role === 'ADMIN' ? 'secondary' : 'primary'}
          theme={theme}
        >
          ADMIN
        </Button>
        <Button
          className="w-full py-2 rounded-r-none rounded-l-none"
          click={() => setRole('AUTHOR')}
          color={role === 'AUTHOR' ? 'secondary' : 'primary'}
          theme={theme}
        >
          AUTHOR
        </Button>
        <Button
          className="w-full py-2 rounded-l-none"
          click={() => setRole('VIEWER')}
          color={role === 'VIEWER' ? 'secondary' : 'primary'}
          theme={theme}
        >
          VIEWER
        </Button>
      </div>

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={role && role.trim().length > 0 ? true : false}
          click={() => (role && role.trim().length > 0 ? submitUser() : null)}
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
