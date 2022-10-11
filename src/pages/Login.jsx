import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';

import { LocalContext } from '../wrappers/LocalContext';

import { Heading } from '../components/Components';
import LoginForm from '../components/login/LoginForm';

export default function Login() {
  const { theme, setTheme } = useThemeStore((state) => state);
  const { profile, setUserProfile } = useUserProfileStore((state) => state);

  const { API_URL, PUBLIC_URL } = useContext(LocalContext);
  const navigate = useNavigate();

  // -------------------- LOGIN --------------------
  const [loginInputs, setLoginInputs] = useState(['', '']);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // -------------------- SUBMISSION --------------------
  const [submit, setSubmit] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (profile && profile.uid) {
      navigate('/home');
    }

    // eslint-disable-next-line
  }, []);

  const errorMessage = (
    <div className="w-5/6 lg:w-full my-2 flex justify-center items-center">
      <div
        className={`${
          submitError ? 'text-error' : 'text-success'
        } text-2xl lg:text-3xl font-semibold text-center w-full font-noto`}
      >
        {submitMessage}
      </div>
    </div>
  );

  return (
    <div
      className={`w-full h-screenm lg:h-screen p-2 lg:px-56 lg:py-4 ease-in-out duration-300 overflow-none`}
      style={{
        backgroundImage: `url(${PUBLIC_URL}/public/background.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className={`w-full p-1 lg:p-0 h-full lg:h-full flex flex-col items-center justify-center`}
      >
        <div
          className={`w-full lg:w-1/2 flex flex-col rounded-lg items-center justify-center bg-base-200 bg-opacity-25 p-4 lg:p-16`}
        >
          <img
            src={`${PUBLIC_URL}/public/banner_purple.png`}
            alt="logo"
            className={`object-fill flex justify-center items-center w-2/3 lg:w-5/6 mb-4`}
          />

          {!submit && (
            <Heading className="text-center">Login to Portal</Heading>
          )}

          {!submit && (
            <LoginForm
              API_URL={API_URL}
              loginInputs={loginInputs}
              setLoginInputs={setLoginInputs}
              setSubmit={setSubmit}
              setSubmitMessage={setSubmitMessage}
              setSubmitError={setSubmitError}
              setUserProfile={setUserProfile}
              showLoginPassword={showLoginPassword}
              setShowLoginPassword={setShowLoginPassword}
              theme={theme}
              setTheme={setTheme}
              navigate={navigate}
            />
          )}

          {submit && errorMessage}
        </div>
      </div>
    </div>
  );
}
