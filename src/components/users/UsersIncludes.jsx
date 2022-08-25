import React from 'react';

import IncludeCreateUser from '../../pages/includes/users/IncludeCreateUser';
import IncludeDeleteUser from '../../pages/includes/users/IncludeDeleteUser';
import IncludeUpdateRole from '../../pages/includes/users/IncludeUpdateRole';
import {
  submitCreateUser,
  submitDeleteUser,
  submitUpdateRole,
} from './user.utils';

export default function UsersIncludes({
  API_URL,
  profile,
  allProfiles,
  creatingUser,
  setCreatingUser,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  email,
  setEmail,
  role,
  setRole,
  addProfile,
  editingUser,
  setEditingUser,
  currentID,
  setCurrentID,
  updateProfile,
  deletingUser,
  setDeletingUser,
  removeProfile,
  alert,
}) {
  return (
    <div className="w-full">
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
        submitUser={() =>
          submitCreateUser(
            API_URL,
            profile,
            firstName,
            setFirstName,
            lastName,
            setLastName,
            username,
            setUsername,
            email,
            setEmail,
            role,
            setRole,
            allProfiles,
            setCreatingUser,
            addProfile,
            alert
          )
        }
      />

      <IncludeUpdateRole
        isUpdating={editingUser}
        setIsUpdating={setEditingUser}
        username={username}
        role={role}
        setRole={setRole}
        submitUser={() =>
          submitUpdateRole(
            API_URL,
            profile,
            currentID,
            setCurrentID,
            role,
            setRole,
            allProfiles,
            setEditingUser,
            updateProfile,
            alert
          )
        }
      />

      <IncludeDeleteUser
        isActive={deletingUser}
        setIsActive={setDeletingUser}
        username={username}
        nextCallback={() =>
          submitDeleteUser(
            API_URL,
            profile,
            allProfiles,
            currentID,
            setCurrentID,
            setDeletingUser,
            removeProfile,
            alert
          )
        }
      />
    </div>
  );
}
