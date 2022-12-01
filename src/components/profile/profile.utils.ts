import axios from 'axios';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitProfileRequest = (
  API_URL: string,
  change: string,
  setter: (value: string) => void,
  data: string,
  profile: IUserProfile,
  setData: React.Dispatch<React.SetStateAction<string>>,
  setNextCallback: React.Dispatch<React.SetStateAction<() => void>>,
  setEditingUser: React.Dispatch<React.SetStateAction<boolean>>,
  setEditString: React.Dispatch<React.SetStateAction<string>>,
  setEditingPassword: React.Dispatch<React.SetStateAction<boolean>>,
  alert: any
) => {
  const postData = {
    uid: profile.uid,
    change,
    data: data,
  };

  axios
    .patch(
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
