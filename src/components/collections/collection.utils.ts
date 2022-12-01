import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { ICollection } from '../../stores/useCollectionStore';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

export const submitCreateCollection = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  setCollectionID: React.Dispatch<React.SetStateAction<string>>,
  collectionName: string,
  setCollectionName: React.Dispatch<React.SetStateAction<string>>,
  collectionDescription: string,
  setCollectionDescription: React.Dispatch<React.SetStateAction<string>>,
  setCreatingCollection: React.Dispatch<React.SetStateAction<boolean>>,
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>,
  alert: any
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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  change: string,
  content: string,
  id: string,
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>,
  setEditingCollectionID: React.Dispatch<React.SetStateAction<boolean>>,
  setEditingCollectionName: React.Dispatch<React.SetStateAction<boolean>>,
  setEditingCollectionDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  alert: any,
  current: boolean,
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >,
  navigate: NavigateFunction
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
    change: change,
    data: content,
  };

  axios
    .patch(
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
                // @ts-ignore
                updatedCollection[id] = data.data;
              }
              return updatedCollection;
            })
          );
        } else {
          // @ts-ignore
          setCurrentCollection((prev) => {
            let updatedCollection = { ...prev };
            // @ts-ignore
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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  editCollectionID: string,
  setEditingCollectionID: React.Dispatch<React.SetStateAction<boolean>>,
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>,
  alert: any,
  current: boolean,
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >,
  navigate: NavigateFunction
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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  collectionName: string,
  setEditingCollectionName: React.Dispatch<React.SetStateAction<boolean>>,
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>,
  alert: any,
  current: boolean,
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >,
  navigate: NavigateFunction
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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  collectionDescription: string,
  setEditingCollectionDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>,
  alert: any,
  current: boolean,
  setCurrentCollection: React.Dispatch<
    React.SetStateAction<ICollection | null>
  >,
  navigate: NavigateFunction
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
  API_URL: string,
  profile: IUserProfile,
  collectionID: string,
  currentProject: IProject,
  setDeletingCollection: React.Dispatch<React.SetStateAction<boolean>>,
  setCollections: React.Dispatch<React.SetStateAction<Array<ICollection>>>,
  alert: any,
  current: boolean,
  navigate: NavigateFunction
) => {
  const data = {
    uid: profile.uid,
    project_id: currentProject.id,
    collection_id: collectionID,
  };

  axios
    .delete(
      `${API_URL}/collection/delete?uid=${data.uid}&project_id=${data.project_id}&collection_id=${data.collection_id}`,
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
