import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';

import { LocalContext } from '../wrappers/LocalContext';

import { submitProfileRequest } from '../components/profile/profile.utils';
import ProfileField from '../components/profile/ProfileField';

import ProfileIncludes from '../components/profile/ProfileIncludes';

export default function Profile() {
  const {
    profile,
    setProfileFirstName,
    setProfileLastName,
    setProfileUsername,
    setProfileEmail,
  } = useUserProfileStore((state) => state);

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const [data, setData] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const [editingUser, setEditingUser] = useState(false);
  const [editString, setEditString] = useState('');
  const [editingPassword, setEditingPassword] = useState(false);
  const [nextCallback, setNextCallback] = useState<(d: null | string) => void>(
    () => null
  );

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setEditingUser(false);
      setEditString('');
      setEditingPassword(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    if (!profile) {
      navigate('/home');
    }

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  const submitFirstName = (data: string | null) => {
    submitProfileRequest(
      API_URL,
      'FIRSTNAME',
      (d) => setProfileFirstName(d),
      data ? data : profile.first_name,
      profile,
      setData,
      () => setNextCallback,
      setEditingUser,
      setEditString,
      setEditingPassword,
      alert
    );
  };

  const submitLastName = (data: string | null) => {
    submitProfileRequest(
      API_URL,
      'LASTNAME',
      (d) => setProfileLastName(d),
      data ? data : profile.last_name,
      profile,
      setData,
      () => setNextCallback,
      setEditingUser,
      setEditString,
      setEditingPassword,
      alert
    );
  };

  const submitUsername = (data: string | null) => {
    submitProfileRequest(
      API_URL,
      'USERNAME',
      (d) => setProfileUsername(d),
      data ? data : profile.username,
      profile,
      setData,
      () => setNextCallback,
      setEditingUser,
      setEditString,
      setEditingPassword,
      alert
    );
  };

  const submitEmail = (data: string | null) => {
    submitProfileRequest(
      API_URL,
      'EMAIL',
      (d) => setProfileEmail(d),
      data ? data : profile.email,
      profile,
      setData,
      () => setNextCallback,
      setEditingUser,
      setEditString,
      setEditingPassword,
      alert
    );
  };

  const submitPassword = (data: string | null) => {
    submitProfileRequest(
      API_URL,
      'PASSWORD',
      () => null,
      data ? data : '',
      profile,
      setData,
      () => setNextCallback,
      setEditingUser,
      setEditString,
      setEditingPassword,
      alert
    );

    setPassword('');
    setPasswordCheck('');

    setShowPassword(false);
    setShowPasswordCheck(false);
  };

  const mapData = [
    {
      id: 'first_name',
      name: 'First Name',
      data: profile.first_name,
      callback: submitFirstName,
    },
    {
      id: 'last_name',
      name: 'Last Name',
      data: profile.last_name,
      callback: submitLastName,
    },
    {
      id: 'username',
      name: 'Username',
      data: profile.username,
      callback: submitUsername,
    },
    {
      id: 'email',
      name: 'Email Address',
      data: profile.email,
      callback: submitEmail,
    },
  ];

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="profile" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="profile" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25">
            {mapData.map((d) => (
              <ProfileField
                key={`pl-${d.id}`}
                field={d}
                setEditingUser={setEditingUser}
                setEditString={setEditString}
                setData={setData}
                setNextCallback={() => setNextCallback}
              />
            ))}

            <div
              className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`}
            />

            <button
              className="btn btn-primary btn-outline gap-2 w-full lg:w-1/3"
              title="Change Password"
              onClick={() => {
                setEditingPassword(true);
                setNextCallback(submitPassword);
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ProfileIncludes
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        editString={editString}
        data={data}
        setData={setData}
        nextCallback={nextCallback}
        editingPassword={editingPassword}
        setEditingPassword={setEditingPassword}
        password={password}
        setPassword={setPassword}
        passwordCheck={passwordCheck}
        setPasswordCheck={setPasswordCheck}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showPasswordCheck={showPasswordCheck}
        setShowPasswordCheck={setShowPasswordCheck}
      />
    </div>
  );
}
