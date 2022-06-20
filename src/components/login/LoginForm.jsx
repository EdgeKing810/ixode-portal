import React from 'react';

import { Button, Input, PasswordInput } from '../Components';
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
        noBorder
        noPadding
        type="text"
        theme={theme}
        className="my-2"
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
        noBorder
        noPadding
        theme={theme}
        className="mb-2"
      />

      <Button
        type="submit"
        theme={theme}
        notHover={!loginInputs.every((v) => v.length > 0)}
        color={theme === 'light' ? 'dark' : 'primary'}
        bgcolor={theme}
        className={`w-full lg:w-auto sm:px-8 py-3 bg-opacity-50 uppercase ${
          loginInputs.every((v) => v.length > 0)
            ? 'hover:bg-opacity-90 focus:bg-opacity-90'
            : 'opacity-50'
        }`}
      >
        Let's Go!
      </Button>
    </form>
  );
}
