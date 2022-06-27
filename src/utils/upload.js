import axios from 'axios';

export default async function upload(API_URL, formData) {
  return axios.post(`${API_URL}/upload`, formData).then((res) => {
    if (res.data.status === 200) {
      let media_id = null;
      if (res.data.media_id && res.data.media_id.length > 0) {
        media_id = res.data.media_id;
      }

      return [true, res.data.path, media_id];
    } else {
      return [false, res.data.message, null];
    }
  });
}
