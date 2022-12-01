import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import UserField from '../components/users/UserField';
import UsersIncludes from '../components/users/UsersIncludes';
import UsersBulk from '../components/users/UsersBulk';

export default function Users() {
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

  const escFunction = useCallback((event: any) => {
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

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="users" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="users" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!allProfiles || allProfiles.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Users Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            <UsersBulk
              allProfiles={allProfiles}
              setCreatingUser={setCreatingUser}
              setUsername={setUsername}
              setRole={setRole}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              isLoading={isLoading}
            />

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
                <UserField
                  key={`ulp-${p.id}`}
                  user={p}
                  profile={profile}
                  setCurrentID={setCurrentID}
                  setUsername={setUsername}
                  setRole={setRole}
                  setEditingUser={setEditingUser}
                  setDeletingUser={setDeletingUser}
                  navigate={navigate}
                />
              ))}
          </div>
        </div>
      </div>

      <UsersIncludes
        API_URL={API_URL}
        profile={profile}
        allProfiles={allProfiles}
        creatingUser={creatingUser}
        setCreatingUser={setCreatingUser}
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
        addProfile={addProfile}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        currentID={currentID}
        setCurrentID={setCurrentID}
        updateProfile={updateProfile}
        deletingUser={deletingUser}
        setDeletingUser={setDeletingUser}
        removeProfile={removeProfile}
        alert={alert}
      />
    </div>
  );
}
