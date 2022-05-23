import upload from './upload';

export const handleImage = async (alert, API_URL, setContent, pure, icon) => {
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    let file = input.files[0];
    let formData = new FormData();

    formData.append('file', file);

    alert.info('Uploading...');
    const uploadResult = await upload(API_URL, formData);

    if (!uploadResult[0]) {
      if (uploadResult[1]) {
        alert.error(uploadResult[1]);
        if (pure || icon) {
          return '';
        }
      }
    } else {
      alert.success('Image successfully uploaded!');
      if (pure) {
        return uploadResult[1];
      } else {
        if (icon) {
          setContent(uploadResult[1]);
        } else {
          setContent((prev) => prev + `\n![](${uploadResult[1]})`);
        }
      }
    }
  };
};
