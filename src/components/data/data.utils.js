import axios from 'axios';

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
