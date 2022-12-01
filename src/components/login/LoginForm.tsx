import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { Input, PasswordInput } from '../Components';
import { submitLogin } from './login.utils';

export default function LoginForm({
  API_URL,
  loginInputs,
  setLoginInputs,
  setSubmit,
  setSubmitMessage,
  setSubmitError,
  setUserProfile,
  showLoginPassword,
  setShowLoginPassword,
  theme,
  setTheme,
  navigate,
}: {
  API_URL: string;
  loginInputs: Array<string>;
  setLoginInputs: React.Dispatch<React.SetStateAction<Array<string>>>;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitMessage: React.Dispatch<React.SetStateAction<string>>;
  setSubmitError: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: (value: IUserProfile) => void;
  showLoginPassword: boolean;
  setShowLoginPassword: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  setTheme: (value: string) => void;
  navigate: NavigateFunction;
}) {
  return (
    <form
      className="w-5/6 lg:w-full"
      onSubmit={(e) =>
        loginInputs.every((v) => v.length > 0)
          ? submitLogin(
              e,
              API_URL,
              loginInputs,
              setLoginInputs,
              setSubmit,
              setSubmitMessage,
              setSubmitError,
              setUserProfile,
              theme,
              setTheme,
              navigate
            )
          : null
      }
    >
      <Input
        placeholder="Enter Username or Email Address..."
        value={loginInputs[0]}
        change={(e) => {
          e.persist();
          setLoginInputs((prev) => [e.target.value, prev[1]]);
        }}
        type="text"
        className="my-2"
        bigger
      />

      <PasswordInput
        placeholder="Enter Password..."
        value={loginInputs[1]}
        change={(e) => {
          e.persist();
          setLoginInputs((prev) => [prev[0], e.target.value]);
        }}
        showPassword={showLoginPassword}
        setShowPassword={setShowLoginPassword}
        className="mb-2"
        bigger
      />

      <button
        name="submit"
        type="submit"
        className={`btn w-full lg:w-1/3 gap-2 ${
          loginInputs.every((v) => v.length > 0)
            ? 'no-animation btn-primary btn-outline'
            : 'btn-ghost btn-disabled'
        }`}
      >
        Let's Go!
      </button>
    </form>
  );
}
