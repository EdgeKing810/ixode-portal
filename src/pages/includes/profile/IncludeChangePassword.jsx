import React from 'react';

import {
  FullAbsoluteContainer,
  IconButton,
  LinkerButton,
  PasswordInput,
  SubHeading,
} from '../../../components/Components';

export default function IncludeChangePassword({
  editingPassword,
  setEditingPassword,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
  showPassword,
  setShowPassword,
  showPasswordCheck,
  setShowPasswordCheck,
  submitUpdate,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        editingPassword ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setEditingPassword(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Change Password
        </SubHeading>

        <IconButton
          click={() => setEditingPassword(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <PasswordInput
        title={`Enter Password`}
        placeholder={`Enter Password...`}
        value={password}
        change={(e) => setPassword(e.target.value)}
        theme={theme}
        className="mt-2 lg:my-2 lg:w-1/2"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PasswordInput
        title={`Enter Password Again`}
        placeholder={`Enter Password Again...`}
        value={passwordCheck}
        change={(e) => setPasswordCheck(e.target.value)}
        theme={theme}
        className="my-2 lg:w-1/2"
        showPassword={showPasswordCheck}
        setShowPassword={setShowPasswordCheck}
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <LinkerButton
          title="Submit"
          condition={
            password &&
            password.trim().length > 0 &&
            passwordCheck &&
            passwordCheck.trim().length > 0
              ? true
              : false
          }
          click={() =>
            password &&
            password.trim().length > 0 &&
            passwordCheck &&
            passwordCheck.trim().length > 0
              ? submitUpdate(password)
              : null
          }
          className="uppercase p-2 rounded-lg lg:w-1/2 w-full"
          theme={theme}
        />
      </div>
    </FullAbsoluteContainer>
  );
}
