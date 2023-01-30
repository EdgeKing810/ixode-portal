import axios from 'axios';
import { IUserProfile } from '../../stores/useUserProfileStore';

export interface IReplResult {
  data: Array<Array<string>>;
  status: number;
  message: string;
}

export const submitReplCommand = (
  API_URL: string,
  command: string,
  profile: IUserProfile,
  setResult: React.Dispatch<React.SetStateAction<IReplResult | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  alert: any
) => {
  setIsLoading(true);
  setResult(null);

  const data = {
    uid: profile.uid,
    query: command,
  };

  axios
    .post(
      `${API_URL}/repl`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      setIsLoading(false);
      if (res.data.status === 200) {
        alert.info('Command executed!');
        setResult(res.data);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
