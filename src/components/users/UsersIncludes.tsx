import React from 'react';

import IncludeCreateUser from '../../pages/includes/users/IncludeCreateUser';
import IncludeDeleteUser from '../../pages/includes/users/IncludeDeleteUser';
import IncludeUpdateRole from '../../pages/includes/users/IncludeUpdateRole';
import { IProfile } from '../../stores/useProfileStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
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
}: {
  API_URL: string;
  profile: IUserProfile;
  allProfiles: Array<IProfile>;
  creatingUser: boolean;
  setCreatingUser: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  addProfile: (
    profileID: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    role: string
  ) => void;
  editingUser: boolean;
  setEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
  currentID: string;
  setCurrentID: React.Dispatch<React.SetStateAction<string>>;
  updateProfile: (profileID: string, update: IProfile) => void;
  deletingUser: boolean;
  setDeletingUser: React.Dispatch<React.SetStateAction<boolean>>;
  removeProfile: (profileID: string) => void;
  alert: any;
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
