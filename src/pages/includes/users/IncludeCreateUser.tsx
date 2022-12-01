import React from 'react';

import {
  FullAbsoluteContainer,
  Input,
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
}:{
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  submitUser: () => void;
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        isCreating ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setIsCreating(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Create a new user
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setIsCreating(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <Input
        title="Enter First Name"
        placeholder="Enter First Name..."
        value={firstName}
        change={(e) => setFirstName(e.target.value)}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Input
        title="Enter Last Name"
        placeholder="Enter Last Name..."
        value={lastName}
        change={(e) => setLastName(e.target.value)}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Input
        title="Enter Username"
        placeholder="Enter Username..."
        value={username}
        change={(e) => setUsername(e.target.value)}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Input
        title="Enter Email Address"
        placeholder="Enter Email Address..."
        value={email}
        change={(e) => setEmail(e.target.value)}
        className="lg:my-2 my-1 lg:w-1/2"
      />

      <Text
        nobreak
        className="lg:mt-0 lg:mb-2 my-2 text-left w-full lg:w-1/2 bg-primary bg-opacity-50 p-1 rounded"
      >
        The user will get an automatic email with details on how to login. No
        further action is required on your end.
      </Text>

      <Title color="primary" className="lg:w-1/2">
        Select a Role
      </Title>

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
            firstName &&
            firstName.trim().length > 0 &&
            lastName &&
            lastName.trim().length > 0 &&
            username &&
            username.trim().length > 0 &&
            email &&
            email.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
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
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
