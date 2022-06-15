import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import {
  Button,
  Heading,
  IconButton,
  Input,
  Separator,
  SubHeading,
  Text,
} from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';
import PaginationList from '../wrappers/PaginationList';

import IncludeCreateUser from './includes/users/IncludeCreateUser';
import IncludeUpdateRole from './includes/users/IncludeUpdateRole';
import IncludeDeleteUser from './includes/users/IncludeDeleteUser';

export default function Users() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);
  const { profiles, addProfile, updateProfile, removeProfile } =
    useProfileStore((state) => state);

  const limit = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const { API_URL } = useContext(LocalContext);
  const alert = useAlert();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('VIEWER');

  const [isLoading, setIsLoading] = useState(true);
  const [currentID, setCurrentID] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setCreatingUser(false);
      setEditingUser(false);
      setDeletingUser(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(profiles && profiles.length > 0));

    if (profile && profile.role.toUpperCase() !== 'ROOT') {
      alert.error('Not authorized to view Users');
      navigate('/home');
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  let allProfiles = [...profiles.filter((p) => p.id !== profile.id), profile];

  const submitCreateUser = () => {
    let finalRole = role.trim().toUpperCase();
    let role_numeric = 3;

    switch (finalRole) {
      case 'ROOT':
        role_numeric = 0;
        break;
      case 'ADMIN':
        role_numeric = 1;
        break;
      case 'AUTHOR':
        role_numeric = 2;
        break;
      case 'VIEWER':
        role_numeric = 3;
        break;
      default:
        role_numeric = 3;
        finalRole = 'VIEWER';
    }

    const data = {
      uid: profile.uid,
      user: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        role: finalRole,
        role_numeric,
      },
    };

    if (
      allProfiles.filter(
        (p) => p.username.toLowerCase() === data.user.username.toLowerCase()
      ).length > 0
    ) {
      alert.error('User with the same username already exists');
      return;
    }

    if (
      allProfiles.filter(
        (p) => p.email.toLowerCase() === data.user.email.toLowerCase()
      ).length > 0
    ) {
      alert.error('User with the same email addresss already exists');
      return;
    }

    alert.info('Processing...');
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setRole('VIEWER');
    setCreatingUser(false);

    axios
      .post(
        `${API_URL}/user/register`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('User Created!');

          addProfile(
            res.data.uid,
            data.user.first_name,
            data.user.last_name,
            data.user.username,
            data.user.email,
            data.user.role
          );
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitUpdateRole = () => {
    const data = {
      uid: profile.uid,
      target_uid: currentID,
      role: role.trim().toUpperCase(),
    };

    let foundProfile = allProfiles.find((p) => p.id === data.target_uid);

    if (foundProfile && foundProfile.role.toUpperCase() === 'ROOT') {
      alert.error('Not allowed to change the role of this user');
      return;
    }

    foundProfile.role = data.role;

    alert.info('Processing...');
    setCurrentID('');
    setRole('VIEWER');
    setEditingUser(false);

    axios
      .post(
        `${API_URL}/user/update/role`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('User Role Updated!');

          updateProfile(data.target_uid, foundProfile);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  const submitDeleteUser = () => {
    const data = {
      uid: profile.uid,
      target_uid: currentID,
    };

    let foundProfile = allProfiles.find((p) => p.id === data.target_uid);

    if (foundProfile && foundProfile.role.toUpperCase() === 'ROOT') {
      alert.error('Not allowed to delete this user');
      return;
    }

    alert.info('Processing...');
    setCurrentID('');
    setDeletingUser(false);

    axios
      .post(
        `${API_URL}/user/delete`,
        { ...data },
        {
          headers: { Authorization: `Bearer ${profile.jwt}` },
        }
      )
      .then(async (res) => {
        if (res.data.status === 200) {
          alert.success('User Deleted!');

          removeProfile(data.target_uid);
        } else {
          console.log(res.data);
          alert.error(res.data.message);
        }
      });
  };

  return (
    <div
      className={`w-full lg:h-screen ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="users" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="users" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!allProfiles || allProfiles.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Users Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            {((allProfiles && allProfiles.length > 0) || !isLoading) && (
              <Button
                color={theme === 'light' ? 'dark' : 'light'}
                theme={theme}
                className="p-3 w-full lg:w-1/3 justify-center uppercase"
                click={() => {
                  setCreatingUser(true);
                  setUsername('');
                  setRole('VIEWER');
                }}
              >
                Add a new User
              </Button>
            )}

            <Separator />

            {allProfiles && allProfiles.length > 0 && (
              <Input
                title="Filter Users"
                placeholder="Filter Users..."
                value={filter}
                theme={theme}
                change={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="mb-2"
              />
            )}

            {allProfiles && allProfiles.length > 0 && (
              <PaginationList
                theme={theme}
                limit={limit}
                amount={
                  allProfiles
                    ? allProfiles.filter(
                        (ap) =>
                          filter.length <= 0 ||
                          ap.first_name
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          ap.last_name
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          ap.email
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          ap.username
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase()) ||
                          ap.role
                            .toLowerCase()
                            .includes(filter.trim().toLowerCase())
                      ).length
                    : 0
                }
                setter={setCurrentPage}
                additional="mb-4 lg:mb-2"
              />
            )}

            {allProfiles &&
              allProfiles.length > 0 &&
              filter.length > 0 &&
              !allProfiles.find(
                (ap) =>
                  ap.first_name
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.last_name
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.email
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.username
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.role.toLowerCase().includes(filter.trim().toLowerCase())
              ) && (
                <SubHeading color="error">no user match the filter.</SubHeading>
              )}

            {allProfiles
              .filter(
                (ap) =>
                  filter.length <= 0 ||
                  ap.first_name
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.last_name
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.email
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.username
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  ap.role.toLowerCase().includes(filter.trim().toLowerCase())
              )
              .slice(currentPage * limit, limit + currentPage * limit)
              .map((p) => (
                <div
                  key={`l-${p.id}`}
                  className={`w-full rounded-lg lg:p-2 p-2 flex lg:flex-row flex-col lg:items-center ${
                    theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                  } duration-400 border-2 border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
                >
                  <Text
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className="w-full lg:h-10 lg:flex lg:flex-col lg:justify-center"
                  >
                    {p.username}
                  </Text>

                  <Text
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className={`w-full my-2 lg:my-0 overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
                  >
                    {p.first_name} {p.last_name}
                  </Text>

                  <Text
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className={`w-full overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
                  >
                    {p.email}
                  </Text>

                  <Text
                    color={theme === 'light' ? 'dark' : 'light'}
                    theme={theme}
                    nobreak
                    className={`w-full my-2 lg:my-0 overflow-hidden uppercase lg:h-10 lg:flex lg:flex-col lg:justify-center`}
                  >
                    {p.role}
                  </Text>

                  <div className="w-full lg:w-1/4 flex lg:justify-end">
                    {p.role && p.role.toUpperCase() !== 'ROOT' && (
                      <IconButton
                        title="Change Role"
                        condition
                        noFill
                        theme={theme}
                        icon="star"
                        className="mr-2 p-2 rounded-full w-10 h-10"
                        color="primary"
                        click={() => {
                          setCurrentID(p.id);
                          setUsername(p.username);
                          setRole(p.role.trim().toUpperCase());
                          setEditingUser(true);
                        }}
                      />
                    )}

                    {p.role && p.role.toUpperCase() !== 'ROOT' && (
                      <IconButton
                        title="Delete User"
                        condition
                        noFill
                        theme={theme}
                        icon="delete-bin-2"
                        className="p-2 rounded-full w-10 h-10"
                        color="primary"
                        click={() => {
                          setCurrentID(p.id);
                          setUsername(p.username);
                          setDeletingUser(true);
                        }}
                      />
                    )}

                    {p.id && p.id === profile.id && (
                      <IconButton
                        title="Edit Profile"
                        condition
                        noFill
                        theme={theme}
                        icon="settings-3"
                        className="p-2 rounded-full w-10 h-10"
                        color="primary"
                        click={() => {
                          navigate('/profile');
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <IncludeCreateUser
        isCreating={creatingUser}
        setIsCreating={setCreatingUser}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        submitUser={() => submitCreateUser()}
        theme={theme}
      />

      <IncludeUpdateRole
        isUpdating={editingUser}
        setIsUpdating={setEditingUser}
        username={username}
        role={role}
        setRole={setRole}
        submitUser={submitUpdateRole}
        theme={theme}
      />

      <IncludeDeleteUser
        isActive={deletingUser}
        setIsActive={setDeletingUser}
        username={username}
        nextCallback={() => submitDeleteUser()}
        theme={theme}
      />
    </div>
  );
}
