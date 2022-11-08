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
    .patch(
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
  axios
    .delete(
      `${API_URL}/data/delete?uid=${profile.uid}&data_id=${dataID}&project_id=${currentProject.id}&collection_id=${collectionID}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Deleted!');

        setDeletingData(false);
        setCurrentData((prev) => prev.filter((d) => d.id !== dataID));

        setDataID('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitPublishData = (
  API_URL,
  profile,
  projectID,
  collectionID,
  dataID,
  setCurrentData,
  publishing,
  alert
) => {
  const data = {
    uid: profile.uid,
    data_id: dataID,
    project_id: projectID,
    collection_id: collectionID,
    publish: publishing,
  };

  if (publishing) {
    alert.info('Publishing...');
  } else {
    alert.info('Unpublishing...');
  }

  axios
    .patch(
      `${API_URL}/data/publish`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        if (publishing) {
          alert.success('Data Published!');
        } else {
          alert.success('Data Unpublished!');
        }

        setCurrentData((prev) =>
          prev.map((d) => {
            let update = { ...d };
            if (d.id === dataID) {
              update.published = publishing;
            }
            return update;
          })
        );
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
