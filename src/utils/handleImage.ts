import upload from './upload';
// @ts-ignore
import { AlertContainer } from 'react-alert';

export const handleImage = async (
  alert: AlertContainer,
  API_URL: string,
  PUBLIC_URL: string,
  setContent: React.Dispatch<React.SetStateAction<string | Array<string>>>,
  pure: boolean,
  icon: boolean
) => {
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  if (!input) {
    return null;
  }

  input.onchange = async () => {
    if (!input.files || input.files.length === 0) {
      return;
    }

    let file = input.files[0];
    let formData = new FormData();

    formData.append('file', file);

    alert.info('Uploading...');
    const uploadResult = await upload(API_URL, formData);

    if (!uploadResult[0]) {
      if (uploadResult[1]) {
        alert.error(uploadResult[1]);
        if (pure || icon) {
          return null;
        }
      }
    } else {
      alert.success('Image successfully uploaded!');
      if (pure) {
        if (setContent) {
          setContent([uploadResult[1], uploadResult[2]]);
        }
        return [uploadResult[1], uploadResult[2]];
      } else {
        if (icon) {
          setContent(`${PUBLIC_URL}/${uploadResult[1]}`);
        } else {
          setContent(
            (prev) => prev + `\n![](${PUBLIC_URL}/${uploadResult[1]})`
          );
        }
      }
    }
  };
};
