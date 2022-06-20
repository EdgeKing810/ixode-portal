import axios from 'axios';

export const submitProfileRequest = (
  API_URL,
  change,
  setter,
  data,
  profile,
  setData,
  setNextCallback,
  setEditingUser,
  setEditString,
  setEditingPassword,
  alert
) => {
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
