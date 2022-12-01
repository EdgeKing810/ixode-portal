import axios from 'axios';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { automaticLogin, fetchCurrentProfile } from '../../utils/fetcher';

export const submitLogin = (
  e: any,
  API_URL: string,
  loginInputs: Array<string>,
  setLoginInputs: React.Dispatch<React.SetStateAction<Array<string>>>,
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>,
  setSubmitMessage: React.Dispatch<React.SetStateAction<string>>,
  setSubmitError: React.Dispatch<React.SetStateAction<boolean>>,
  setUserProfile: (value: IUserProfile) => void,
  theme: string,
  setTheme: (value: string) => void,
  navigate: NavigateFunction
) => {
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
