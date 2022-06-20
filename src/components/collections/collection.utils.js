import axios from 'axios';

export const submitCreateCollection = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  setCollectionID,
  collectionName,
  setCollectionName,
  collectionDescription,
  setCollectionDescription,
  setCreatingCollection,
  setCollections,
  alert
) => {
  const data = {
    uid: profile.uid,
    collection: {
      id: collectionID,
      project_id: currentProject.id,
      name: collectionName,
      description: collectionDescription,
    },
  };

  axios
    .post(
      `${API_URL}/collection/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Collection Created!');

        setCreatingCollection(false);

        setCollectionID('');
        setCollectionName('');
        setCollectionDescription('');

        setCollections((prev) => [
          ...prev,
          {
            id: data.collection.id,
            project_id: data.collection.project_id,
            name: data.collection.name,
            description: data.collection.description,
            structures: [],
            custom_structures: [],
          },
        ]);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

const submitUpdateCollection = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  change,
  content,
  id,
  setCollections,
  setEditingCollectionID,
  setEditingCollectionName,
  setEditingCollectionDescription,
  alert,
  current,
  setCurrentCollection,
  navigate
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    change: change,
    data: content,
  };

  axios
    .post(
      `${API_URL}/collection/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Collection Updated!');

        setEditingCollectionID(false);
        setEditingCollectionName(false);
        setEditingCollectionDescription(false);

        if (!current) {
          setCollections((prev) =>
            prev.map((p) => {
              let updatedCollection = { ...p };
              if (p.id === data.collection_id) {
                updatedCollection[id] = data.data;
              }
              return updatedCollection;
            })
          );
        } else {
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            updatedCollection[id] = data.data;
            return updatedCollection;
          });

          if (id === 'id') {
            navigate(`/project/${currentProject.id}/collection/${data.data}`);
          }
        }
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateCollectionID = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  editCollectionID,
  setEditingCollectionID,
  setCollections,
  alert,
  current,
  setCurrentCollection,
  navigate
) => {
  submitUpdateCollection(
    API_URL,
    profile,
    currentProject,
    collectionID,
    'ID',
    editCollectionID,
    'id',
    setCollections,
    setEditingCollectionID,
    () => null,
    () => null,
    alert,
    current,
    setCurrentCollection,
    navigate
  );
};

export const submitUpdateCollectionName = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  collectionName,
  setEditingCollectionName,
  setCollections,
  alert,
  current,
  setCurrentCollection,
  navigate
) => {
  submitUpdateCollection(
    API_URL,
    profile,
    currentProject,
    collectionID,
    'NAME',
    collectionName,
    'name',
    setCollections,
    () => null,
    setEditingCollectionName,
    () => null,
    alert,
    current,
    setCurrentCollection,
    navigate
  );
};

export const submitUpdateCollectionDescription = (
  API_URL,
  profile,
  currentProject,
  collectionID,
  collectionDescription,
  setEditingCollectionDescription,
  setCollections,
  alert,
  current,
  setCurrentCollection,
  navigate
) => {
  submitUpdateCollection(
    API_URL,
    profile,
    currentProject,
    collectionID,
    'DESCRIPTION',
    collectionDescription,
    'description',
    setCollections,
    () => null,
    () => null,
    setEditingCollectionDescription,
    alert,
    current,
    setCurrentCollection,
    navigate
  );
};

export const submitDeleteCollection = (
  API_URL,
  profile,
  collectionID,
  currentProject,
  setDeletingCollection,
  setCollections,
  alert,
  current,
  navigate
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
  };

  axios
    .post(
      `${API_URL}/collection/delete`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Collection Deleted!');

        setDeletingCollection(false);
        if (!current) {
          setCollections((prev) => [
            ...prev.filter((p) => p.id !== data.collection_id),
          ]);
        } else {
          navigate(`/project/${currentProject.id}`);
        }
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
