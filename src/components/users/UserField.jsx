import React from 'react';

import { IconButton, Text } from '../Components';

export default function UserField({
  user,
  profile,
  setCurrentID,
  setUsername,
  setRole,
  setEditingUser,
  setDeletingUser,
  navigate,
  theme,
}) {
  return (
    <div
      key={`ul-${user.id}`}
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
        {user.username}
      </Text>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full my-2 lg:my-0 overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {user.first_name} {user.last_name}
      </Text>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {user.email}
      </Text>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full my-2 lg:my-0 overflow-hidden uppercase lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {user.role}
      </Text>

      <div className="w-full lg:w-1/4 flex lg:justify-end">
        {user.role && user.role.toUpperCase() !== 'ROOT' && (
          <IconButton
            title="Change Role"
            condition
            noFill
            theme={theme}
            icon="star"
            className="mr-2 p-2 rounded-full w-10 h-10"
            color="primary"
            click={() => {
              setCurrentID(user.id);
              setUsername(user.username);
              setRole(user.role.trim().toUpperCase());
              setEditingUser(true);
            }}
          />
        )}

        {user.role && user.role.toUpperCase() !== 'ROOT' && (
          <IconButton
            title="Delete User"
            condition
            noFill
            theme={theme}
            icon="delete-bin-2"
            className="p-2 rounded-full w-10 h-10"
            color="primary"
            click={() => {
              setCurrentID(user.id);
              setUsername(user.username);
              setDeletingUser(true);
            }}
          />
        )}

        {user.id && user.id === profile.id && (
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
  );
}
