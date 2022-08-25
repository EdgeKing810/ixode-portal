import React from 'react';

import {
  FullAbsoluteContainer,
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
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        editingPassword ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setEditingPassword(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <SubHeading color="primary" smallerOnMobile>
          Change Password
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setEditingPassword(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <PasswordInput
        title={`Enter Password`}
        placeholder={`Enter Password...`}
        value={password}
        change={(e) => setPassword(e.target.value)}
        className="mt-2 lg:my-2 lg:w-1/2"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PasswordInput
        title={`Enter Password Again`}
        placeholder={`Enter Password Again...`}
        value={passwordCheck}
        change={(e) => setPasswordCheck(e.target.value)}
        className="my-2 lg:w-1/2"
        showPassword={showPasswordCheck}
        setShowPassword={setShowPasswordCheck}
      />

      <div className="w-full lg:w-1/2 flex justify-start">
        <button
          title="Submit"
          className={`btn w-full lg:w-1/2 gap-2 ${
            password &&
            password.trim().length > 0 &&
            passwordCheck &&
            passwordCheck.trim().length > 0
              ? 'no-animation btn-primary btn-outline'
              : 'btn-ghost btn-disabled'
          }`}
          onClick={() =>
            password &&
            password.trim().length > 0 &&
            passwordCheck &&
            passwordCheck.trim().length > 0
              ? submitUpdate(password)
              : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
