import axios from 'axios';
import { convertDataToRaw } from '../../utils/dataProcessor';

export const submitCreateData = (
  API_URL,
  profile,
  projectID,
  collectionID,
  allData,
  alert,
  navigate
) => {
  alert.info('Submitting...');

  let rawPair = convertDataToRaw(allData);

  const data = {
    uid: profile.uid,
    project_id: projectID,
    collection_id: collectionID,
    raw_pair: rawPair,
  };

  axios
    .post(
      `${API_URL}/data/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Object Created!');

        navigate(`/data/p/${projectID}/c/${collectionID}`);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateData = (
  API_URL,
  profile,
  projectID,
  collectionID,
  dataID,
  allData,
  alert,
  navigate
) => {
  alert.info('Submitting...');

  let rawPair = convertDataToRaw(allData);

  const data = {
    uid: profile.uid,
    project_id: projectID,
    collection_id: collectionID,
    data_id: dataID,
    raw_pair: rawPair,
  };

  axios
    .post(
      `${API_URL}/data/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Object Updated!');

        navigate(`/data/p/${projectID}/c/${collectionID}`);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteData = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  dataID,
  setDataID,
  setDeletingData,
  setCurrentData,
  alert
) => {
  const data = {
    uid: profile.uid,
    data_id: dataID,
    project_id: currentProject.id,
    collection_id: collectionID,
  };

  axios
    .post(
      `${API_URL}/data/delete`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Deleted!');

        setDeletingData(false);

        setCurrentData((prev) => {
          let updatedData = { ...prev };
          updatedData.data = updatedData.data.filter(
            (d) => d.data_id !== data.data_id
          );
          return updatedData;
        });

        setDataID('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
