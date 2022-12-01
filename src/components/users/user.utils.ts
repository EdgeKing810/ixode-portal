import axios from 'axios';
import { IProfile } from '../../stores/useProfileStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitCreateUser = (
  API_URL: string,
  profile: IUserProfile,
  firstName: string,
  setFirstName: React.Dispatch<React.SetStateAction<string>>,
  lastName: string,
  setLastName: React.Dispatch<React.SetStateAction<string>>,
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  role: string,
  setRole: React.Dispatch<React.SetStateAction<string>>,
  allProfiles: Array<IProfile>,
  setCreatingUser: React.Dispatch<React.SetStateAction<boolean>>,
  addProfile: (
    profileID: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    role: string
  ) => void,
  alert: any
) => {
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

export const submitUpdateRole = (
  API_URL: string,
  profile: IUserProfile,
  currentID: string,
  setCurrentID: React.Dispatch<React.SetStateAction<string>>,
  role: string,
  setRole: React.Dispatch<React.SetStateAction<string>>,
  allProfiles: Array<IProfile>,
  setEditingUser: React.Dispatch<React.SetStateAction<boolean>>,
  updateProfile: (profileID: string, update: IProfile) => void,
  alert: any
) => {
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

  if (foundProfile) {
    foundProfile.role = data.role;
  }

  alert.info('Processing...');
  setCurrentID('');
  setRole('VIEWER');
  setEditingUser(false);

  axios
    .patch(
      `${API_URL}/user/update/role`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('User Role Updated!');

        if (foundProfile) {
          updateProfile(data.target_uid, foundProfile);
        }
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteUser = (
  API_URL: string,
  profile: IUserProfile,
  allProfiles: Array<IProfile>,
  currentID: string,
  setCurrentID: React.Dispatch<React.SetStateAction<string>>,
  setDeletingUser: React.Dispatch<React.SetStateAction<boolean>>,
  removeProfile: (profileID: string) => void,
  alert: any
) => {
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
    .delete(
      `${API_URL}/user/delete?uid=${data.uid}&target_uid=${data.target_uid}`,
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
