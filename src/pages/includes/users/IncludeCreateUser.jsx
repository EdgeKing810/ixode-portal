import React from 'react';

import {
  Button,
  FullAbsoluteContainer,
  IconButton,
  Input,
  LinkerButton,
  SubHeading,
  Text,
  Title,
} from '../../../components/Components';

export default function IncludeCreateUser({
  isCreating,
  setIsCreating,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  email,
  setEmail,
  role,
  setRole,
  submitUser,
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
          Create a new user
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
        title="Enter First Name"
        placeholder="Enter First Name..."
        value={firstName}
        change={(e) => setFirstName(e.target.value)}
        theme={theme}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Input
        title="Enter Last Name"
        placeholder="Enter Last Name..."
        value={lastName}
        change={(e) => setLastName(e.target.value)}
        theme={theme}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Input
        title="Enter Username"
        placeholder="Enter Username..."
        value={username}
        change={(e) => setUsername(e.target.value)}
        theme={theme}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Input
        title="Enter Email Address"
        placeholder="Enter Email Address..."
        value={email}
        change={(e) => setEmail(e.target.value)}
        theme={theme}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        nobreak
        className="lg:mt-0 lg:mb-2 my-2 text-left w-full lg:w-1/2 bg-main-primary bg-opacity-50 p-1 rounded"
        theme={theme}
      >
        The user will get an automatic email with details on how to login. No
        further action is required on your end.
      </Text>

      <Title color="primary" className="lg:w-1/2">
        Select a Role
      </Title>

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
          condition={
            firstName &&
            firstName.trim().length > 0 &&
            lastName &&
            lastName.trim().length > 0 &&
            username &&
            username.trim().length > 0 &&
            email &&
            email.trim().length > 0
              ? true
              : false
          }
          click={() =>
            firstName &&
            firstName.trim().length > 0 &&
            lastName &&
            lastName.trim().length > 0 &&
            username &&
            username.trim().length > 0 &&
            email &&
            email.trim().length > 0
              ? submitUser()
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
