import React from 'react';

import { Text } from '../Components';

export default function UserField({
  user,
  profile,
  setCurrentID,
  setUsername,
  setRole,
  setEditingUser,
  setDeletingUser,
  navigate,
}) {
  return (
    <div
      key={`ul-${user.id}`}
      className={`w-full rounded-lg p-2 flex lg:flex-row flex-col lg:items-center bg-base-200 duration-300 border-4 border-primary bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Text
        nobreak
        className="w-full lg:h-10 lg:flex lg:flex-col lg:justify-center"
      >
        {user.username}
      </Text>

      <Text
        nobreak
        className={`w-full my-2 lg:my-0 overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {user.first_name} {user.last_name}
      </Text>

      <Text
        nobreak
        className={`w-full overflow-hidden lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {user.email}
      </Text>

      <Text
        nobreak
        className={`w-full my-2 lg:my-0 overflow-hidden uppercase lg:h-10 lg:flex lg:flex-col lg:justify-center`}
      >
        {user.role}
      </Text>

      <div className="w-full lg:w-1/4 flex lg:justify-end">
        {user.role && user.role.toUpperCase() !== 'ROOT' && (
          <button
            className="btn btn-sm btn-warning btn-outline btn-circle mr-2"
            title="Change Role"
            onClick={() => {
              setCurrentID(user.id);
              setUsername(user.username);
              setRole(user.role.trim().toUpperCase());
              setEditingUser(true);
            }}
          >
            <i className={`ri-star-line`} />
          </button>
        )}

        {user.role && user.role.toUpperCase() !== 'ROOT' && (
          <button
            className="btn btn-sm btn-error btn-outline btn-circle"
            title="Delete User"
            onClick={() => {
              setCurrentID(user.id);
              setUsername(user.username);
              setDeletingUser(true);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}

        {user.id && user.id === profile.id && (
          <button
            className="btn btn-sm btn-info btn-outline btn-circle"
            title="Edit Profile"
            onClick={() => {
              navigate('/profile');
            }}
          >
            <i className={`ri-settings-3-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
