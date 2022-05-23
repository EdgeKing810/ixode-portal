import axios from 'axios';

export default async function upload(API_URL, formData) {
  return axios.post(`${API_URL}/upload`, formData).then((res) => {
    if (res.data.status === 200) {
      const url = `${API_URL}/${res.data.path}`;
      return [true, url];
    } else {
      return [false, res.data.message];
    }
  });
}
