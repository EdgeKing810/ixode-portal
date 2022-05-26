import axios from 'axios';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useConfigStore } from '../stores/useConfigStore';
import { useProjectStore } from '../stores/useProjectStore';
import { useCollectionStore } from '../stores/useCollectionStore';
// import { useLimitsStore } from '../stores/useLimitsStore';
import { useThemeStore } from '../stores/useThemeStore';

export const fetchCurrentProfile = async (API_URL, uid, jwt) => {
  return axios
    .post(
      `${API_URL}/user/fetch/one`,
      { uid, target_uid: uid },
      {
        headers: { Authorization: `Bearer ${jwt ? jwt : ''}` },
      }
    )
    .then((res) => res.data);
};

export const fetchUserProfile = async (API_URL, uid, jwt) => {
  const { setUserProfile } = useUserProfileStore.getState();
  const { theme } = useThemeStore.getState();

  axios
    .post(
      `${API_URL}/user/login/jwt`,
      { uid: uid },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        setUserProfile({
          ...response.data.user,
          uid: response.data.uid,
          jwt: response.data.jwt,
        });

        localStorage.setItem(
          '_userData',
          JSON.stringify({
            uid: response.data.uid,
            jwt: response.data.jwt,
            theme: theme ? theme : 'dark',
          })
        );
      } else {
        setUserProfile({});
        console.log(response.data);
      }
    });
};

const fetchProfiles = async (API_URL, uid, jwt, offset, currentProfiles) => {
  const { setProfiles } = useProfileStore.getState();

  axios
    .post(
      `${API_URL}/user/fetch?offset=${offset}&limit=20`,
      { uid: uid },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then(async (response) => {
      if (response.data.status === 200) {
        setProfiles([...currentProfiles]);
        if (currentProfiles.length < response.data.amount) {
          await fetchProfiles(API_URL, uid, jwt, offset + 1, [
            ...currentProfiles,
            ...response.data.users,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneProfile = async (API_URL, uid, profileID, jwt) => {
  const { updateProfile, removeProfile } = useProfileStore.getState();

  axios
    .post(
      `${API_URL}/user/fetch/one`,
      { uid: uid, target_uid: profileID },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        updateProfile(profileID, response.data.user);
      } else {
        if (response.data.status === 404) {
          removeProfile(profileID);
        } else {
          console.log(response.data);
        }
      }
    });
};

const fetchConfigs = async (API_URL, uid, jwt, offset, currentConfigs) => {
  const { setConfigs } = useConfigStore.getState();

  axios
    .post(
      `${API_URL}/config/fetch?offset=${offset}&limit=20`,
      { uid: uid },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then(async (response) => {
      if (response.data.status === 200) {
        setConfigs([...currentConfigs]);
        if (currentConfigs.length < response.data.amount) {
          await fetchConfigs(API_URL, uid, jwt, offset + 1, [
            ...currentConfigs,
            ...response.data.configs,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneConfig = async (API_URL, uid, name, jwt) => {
  const { updateConfig, removeConfig } = useConfigStore.getState();

  axios
    .post(
      `${API_URL}/config/fetch/one`,
      { uid: uid, key: name },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        updateConfig(name, response.data.value);
      } else {
        if (response.data.status === 404) {
          removeConfig(name);
        } else {
          console.log(response.data);
        }
      }
    });
};

const fetchProjects = async (API_URL, uid, jwt, offset, currentProjects) => {
  const { setProjects } = useProjectStore.getState();

  axios
    .post(
      `${API_URL}/project/fetch?offset=${offset}&limit=10`,
      { uid: uid },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then(async (response) => {
      if (response.data.status === 200) {
        setProjects([...currentProjects]);
        if (currentProjects.length < response.data.amount) {
          await fetchProjects(API_URL, uid, jwt, offset + 1, [
            ...currentProjects,
            ...response.data.projects,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneProject = async (API_URL, uid, id, jwt) => {
  const { updateProject, removeProject } = useProjectStore.getState();

  axios
    .post(
      `${API_URL}/project/fetch/one`,
      { uid: uid, project_id: id },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        updateProject(
          id,
          response.data.project.name,
          response.data.project.description,
          response.data.project.api_path,
          response.data.project.members
        );
      } else {
        if (response.data.status === 404) {
          removeProject(id);
        } else {
          console.log(response.data);
        }
      }
    });
};

export const fetchCollections = async (
  API_URL,
  uid,
  jwt,
  offset,
  currentCollections,
  project_id
) => {
  const { setCollections } = useCollectionStore.getState();

  axios
    .post(
      `${API_URL}/collection/fetch?offset=${offset}&limit=5`,
      { uid: uid, project_id },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then(async (response) => {
      if (response.data.status === 200) {
        setCollections([...currentCollections]);
        if (currentCollections.length < response.data.amount) {
          await fetchCollections(API_URL, uid, jwt, offset + 1, [
            ...currentCollections,
            ...response.data.collections,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneCollection = async (
  API_URL,
  uid,
  project_id,
  collection_id,
  jwt
) => {
  const { updateCollection, removeCollection } = useCollectionStore.getState();

  axios
    .post(
      `${API_URL}/collection/fetch/one`,
      { uid: uid, proejct_id: project_id, collection_id: collection_id },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        updateCollection(
          collection_id,
          response.data.collection.project_id,
          response.data.collection.name,
          response.data.collection.description,
          response.data.collection.structures,
          response.data.collection.custom_structures
        );
      } else {
        if (response.data.status === 404) {
          removeCollection(collection_id);
        } else {
          console.log(response.data);
        }
      }
    });
};

export const automaticLogin = async (API_URL, uid, jwt) => {
  await fetchUserProfile(API_URL, uid, jwt);
  await fetchProfiles(API_URL, uid, jwt, 0, []);
  await fetchConfigs(API_URL, uid, jwt, 0, []);
  await fetchProjects(API_URL, uid, jwt, 0, []);
};

export const logout = async () => {
  const { setUserProfile } = useUserProfileStore.getState();
  const { setProfiles } = useProfileStore.getState();
  const { setConfigs } = useConfigStore.getState();
  const { setProjects } = useProjectStore.getState();
  const { setCollections } = useCollectionStore.getState();
  const { setTheme } = useThemeStore.getState();

  setUserProfile({});
  setProfiles([]);
  setConfigs([]);
  setProjects([]);
  setCollections([]);
  setTheme('dark');

  localStorage.clear();
};
