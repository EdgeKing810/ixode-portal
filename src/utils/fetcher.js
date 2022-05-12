import axios from 'axios';

export const fetchCurrentProfile = async (API_URL, uid, jwt) => {
  return axios
    .post(
      `${API_URL}/user/fetch/one`,
      { uid, target_uid: uid },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => res.data);
};
