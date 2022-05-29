import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Button, IconButton, Separator, Text } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import IncludeEditData from './includes/profile/IncludeEditData';
import IncludeChangePassword from './includes/profile/IncludeChangePassword';

export default function Profile() {
  const { theme } = useThemeStore((state) => state);
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
  const [nextCallback, setNextCallback] = useState(() => null);

  const escFunction = useCallback((event) => {
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

  const mapData = [
    {
      id: 'first_name',
      name: 'First Name',
      data: profile.first_name,
      callback: () => submitFirstName,
    },
    {
      id: 'last_name',
      name: 'Last Name',
      data: profile.last_name,
      callback: () => submitLastName,
    },
    {
      id: 'username',
      name: 'Username',
      data: profile.username,
      callback: () => submitUsername,
    },
    {
      id: 'email',
      name: 'Email Address',
      data: profile.email,
      callback: () => submitEmail,
    },
  ];

  const submitRequest = (change, setter, data) => {
    const postData = {
      uid: profile.uid,
      change,
      data: data,
    };

    axios
      .post(
        `${API_URL}/user/update`,
        { ...postData },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('Profile Updated!');
          setter(postData.data);
          setData('');
          setNextCallback(() => null);

          setEditingUser(false);
          setEditString('');
          setEditingPassword(false);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitFirstName = (data) => {
    submitRequest('FIRSTNAME', (d) => setProfileFirstName(d), data);
  };

  const submitLastName = (data) => {
    submitRequest('LASTNAME', (d) => setProfileLastName(d), data);
  };

  const submitUsername = (data) => {
    submitRequest('USERNAME', (d) => setProfileUsername(d), data);
  };

  const submitEmail = (data) => {
    submitRequest('EMAIL', (d) => setProfileEmail(d), data);
  };

  const submitPassword = (data) => {
    submitRequest('PASSWORD', () => null, data);

    setPassword('');
    setPasswordCheck('');

    setShowPassword(false);
    setShowPasswordCheck(false);
  };

  return (
    <div
      className={`w-full lg:h-screen ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="profile" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="profile" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25">
            {mapData.map((d) => (
              <div
                className={`w-full rounded-lg lg:p-2 p-2 flex lg:flex-row flex-col lg:items-center ${
                  theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                } duration-400 border-2 border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                key={d.id}
              >
                <Text
                  color="secondary"
                  theme={theme}
                  nobreak
                  className="w-full lg:h-10 lg:flex lg:flex-col lg:justify-center uppercase"
                >
                  {d.name}
                </Text>

                <Text
                  color={theme === 'light' ? 'dark' : 'light'}
                  theme={theme}
                  nobreak
                  className={`w-full my-2 lg:my-0 overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
                >
                  {d.data}
                </Text>

                <div className="w-full lg:w-1/4 flex lg:justify-end">
                  <IconButton
                    title="Edit"
                    condition
                    noFill
                    theme={theme}
                    icon="pencil"
                    className="p-2 rounded-full w-10 h-10"
                    color="primary"
                    click={() => {
                      setEditingUser(true);
                      setEditString(d.name);
                      setData(d.data);
                      setNextCallback(d.callback);
                    }}
                  />
                </div>
              </div>
            ))}

            <Separator />

            <Button
              color={theme === 'light' ? 'dark' : 'light'}
              theme={theme}
              className="p-3 w-full lg:w-1/3 justify-center uppercase"
              click={() => {
                setEditingPassword(true);
                setNextCallback(() => submitPassword);
              }}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      <IncludeEditData
        isEditing={editingUser}
        setIsEditing={setEditingUser}
        title={editString}
        data={data}
        setData={setData}
        submitUpdate={(d) => nextCallback(d)}
        theme={theme}
      />

      <IncludeChangePassword
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
        submitUpdate={(d) => nextCallback(d)}
        theme={theme}
      />
    </div>
  );
}
