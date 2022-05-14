import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';

import { LocalContext } from '../wrappers/LocalContext';

import logo from '../assets/images/banner_purple.png';
import background from '../assets/images/background.jpg';

import { automaticLogin, fetchCurrentProfile } from '../utils/fetcher';
import {
  Button,
  Heading,
  Image,
  Input,
  PasswordInput,
} from '../components/Components';

export default function Login() {
  const { theme, setTheme } = useThemeStore((state) => state);
  const { profile, setUserProfile } = useUserProfileStore((state) => state);

  const { API_URL } = useContext(LocalContext);
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

  const submitLogin = (e) => {
    e.preventDefault();

    const data = {
      auth_data: loginInputs[0].trim(),
      password: loginInputs[1],
    };

    setLoginInputs(['', '']);
    setSubmit(true);
    setSubmitMessage('Submitting...');

    axios
      .post(`${API_URL}/user/login`, data)
      .then(async (resp) => {
        if (resp.data.status === 200) {
          setSubmitMessage('Logging in...');
          setSubmitError(false);

          localStorage.setItem(
            '_userData',
            JSON.stringify({
              uid: resp.data.uid,
              jwt: resp.data.jwt,
              theme: theme ? theme : 'dark',
            })
          );

          const data = await fetchCurrentProfile(
            API_URL,
            resp.data.uid,
            resp.data.jwt
          );

          const { uid, jwt } = resp.data;

          if (data.status === 200) {
            setUserProfile({ ...data.user, uid: uid, jwt: jwt });

            await automaticLogin(API_URL, uid, jwt);

            setTheme(theme ? theme : 'dark');
          } else {
            console.log(data);
          }
        } else {
          setSubmitMessage(resp.data.message);
          setSubmitError(true);
        }

        setTimeout(() => {
          setSubmit(false);
          setSubmitMessage('Submitting...');
          setSubmitError(false);

          if (resp.data.status === 200) {
            navigate('/home');
          }
        }, 1000);
      })
      .catch((e) => {
        console.log(e);
        setSubmitMessage('Request Failed :(');
        setSubmitError(true);

        setTimeout(() => {
          setSubmit(false);
          setSubmitMessage('Submitting...');
          setSubmitError(false);
        }, 500);
      });
  };

  const loginForm = () =>
    !submit ? (
      <form
        className="w-5/6 lg:w-full"
        onSubmit={(e) =>
          loginInputs.every((v) => v.length > 0) ? submitLogin(e) : null
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
    ) : (
      <></>
    );

  const errorMessage = (
    <div className="w-5/6 lg:w-full my-2 flex justify-center items-center">
      <div
        className={`${
          submitError ? 'text-main-error' : 'text-main-success'
        } text-2xl lg:text-3xl font-semibold text-center w-full font-noto`}
      >
        {submitMessage}
      </div>
    </div>
  );

  return (
    <div
      className={`w-full h-screenm lg:h-screen p-2 lg:px-56 lg:py-4 ease-in-out duration-400 overflow-none`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className={`w-full h-screen lg:h-full flex flex-col items-center justify-center`}
      >
        <div
          className={`w-full lg:w-1/2 flex flex-col rounded-lg items-center justify-center ${
            theme === 'light'
              ? 'bg-gray-200 bg-opacity-25'
              : 'bg-gray-800 bg-opacity-50'
          } p-4 lg:p-16`}
        >
          <Image
            src={logo}
            alt="logo"
            noRounded
            className="w-2/3 lg:w-5/6 mb-4"
          />

          {!submit && (
            <Heading className="text-center">Login to Portal</Heading>
          )}

          {loginForm()}

          {submit && errorMessage}
        </div>
      </div>
    </div>
  );
}
