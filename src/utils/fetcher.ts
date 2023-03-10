import axios from 'axios';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { IProfile, useProfileStore } from '../stores/useProfileStore';
import { IConfig, useConfigStore } from '../stores/useConfigStore';
import { IMedia, useMediaStore } from '../stores/useMediaStore';
import { IProject, useProjectStore } from '../stores/useProjectStore';
import { ICollection, useCollectionStore } from '../stores/useCollectionStore';
import { IEvent, useEventStore } from '../stores/useEventStore';
import { IConstraint, useConstraintStore } from '../stores/useConstraintStore';
import { useThemeStore } from '../stores/useThemeStore';

export const fetchCurrentProfile = async (
  API_URL: string,
  uid: string,
  jwt: string
) => {
  return axios
    .get(`${API_URL}/user/fetch/one?uid=${uid}&target_uid=${uid}`, {
      headers: { Authorization: `Bearer ${jwt ? jwt : ''}` },
    })
    .then((res) => res.data);
};

export const fetchUserProfile = async (
  API_URL: string,
  uid: string,
  jwt: string
) => {
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
        setUserProfile({
          id: '',
          first_name: '',
          last_name: '',
          username: '',
          email: '',
          role: '',
          password: '',
          jwt: '',
        });
        console.log(response.data);
      }
    });
};

const fetchProfiles = async (
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentProfiles: Array<IProfile>
) => {
  const { setProfiles } = useProfileStore.getState();

  axios
    .get(`${API_URL}/user/fetch?uid=${uid}&offset=${offset}&limit=20`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
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

export const fetchOneProfile = async (
  API_URL: string,
  uid: string,
  profileID: string,
  jwt: string
) => {
  const { updateProfile, removeProfile } = useProfileStore.getState();

  axios
    .get(`${API_URL}/user/fetch/one?uid=${uid}&target_uid=${profileID}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
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

const fetchConfigs = async (
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentConfigs: Array<IConfig>
) => {
  const { setConfigs } = useConfigStore.getState();

  axios
    .get(`${API_URL}/config/fetch?uid=${uid}&offset=${offset}&limit=20`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
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

export const fetchOneConfig = async (
  API_URL: string,
  uid: string,
  name: string,
  jwt: string
) => {
  const { updateConfig, removeConfig } = useConfigStore.getState();

  axios
    .get(`${API_URL}/config/fetch/one?uid=${uid}&key=${name}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
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

const fetchMedia = async (
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentMedia: Array<IMedia>
) => {
  const { setMedia } = useMediaStore.getState();

  axios
    .get(`${API_URL}/media/fetch?uid=${uid}&offset=${offset}&limit=20`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then(async (response) => {
      if (response.data.status === 200) {
        setMedia([...currentMedia]);
        if (currentMedia.length < response.data.amount) {
          await fetchMedia(API_URL, uid, jwt, offset + 1, [
            ...currentMedia,
            ...response.data.medias,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneMedia = async (
  API_URL: string,
  uid: string,
  id: string,
  jwt: string
) => {
  const { updateMedia, removeMedia } = useMediaStore.getState();

  axios
    .get(`${API_URL}/media/fetch/one?uid=${uid}&media_id=${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((response) => {
      if (response.data.status === 200) {
        updateMedia(id, response.data.media.name);
      } else {
        if (response.data.status === 404) {
          removeMedia(id);
        } else {
          console.log(response.data);
        }
      }
    });
};

const fetchProjects = async (
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentProjects: Array<IProject>
) => {
  const { setProjects } = useProjectStore.getState();

  axios
    .get(`${API_URL}/project/fetch?uid=${uid}&offset=${offset}&limit=10`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
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

export const fetchOneProject = async (
  API_URL: string,
  uid: string,
  id: string,
  jwt: string
) => {
  const { updateProject, removeProject } = useProjectStore.getState();

  axios
    .get(`${API_URL}/project/fetch/one?uid=${uid}&project_id=${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
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
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentCollections: Array<ICollection>,
  project_id: string
) => {
  const { setCollections } = useCollectionStore.getState();

  axios
    .get(
      `${API_URL}/collection/fetch?uid=${uid}&project_id=${project_id}&offset=${offset}&limit=5`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )
    .then(async (response) => {
      if (response.data.status === 200) {
        setCollections([...currentCollections]);
        if (currentCollections.length < response.data.amount) {
          await fetchCollections(
            API_URL,
            uid,
            jwt,
            offset + 1,
            [...currentCollections, ...response.data.collections],
            project_id
          );
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneCollection = async (
  API_URL: string,
  uid: string,
  project_id: string,
  collection_id: string,
  jwt: string
) => {
  const { updateCollection, removeCollection } = useCollectionStore.getState();

  axios
    .get(
      `${API_URL}/collection/fetch/one?uid=${uid}&project_id=${project_id}&collection_id=${collection_id}`,
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

const fetchEvents = async (
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentEvents: Array<IEvent>
) => {
  const { setEvents } = useEventStore.getState();

  axios
    .get(`${API_URL}/event/fetch?uid=${uid}&offset=${offset}&limit=20`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then(async (response) => {
      if (response.data.status === 200) {
        setEvents([...currentEvents]);
        if (currentEvents.length < response.data.amount) {
          await fetchEvents(API_URL, uid, jwt, offset + 1, [
            ...currentEvents,
            ...response.data.events,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const fetchOneEvent = async (
  API_URL: string,
  uid: string,
  id: string,
  jwt: string
) => {
  const { updateEvent, removeEvent } = useEventStore.getState();

  axios
    .get(`${API_URL}/event/fetch/one?uid=${uid}&event_id=${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((response) => {
      if (response.data.status === 200) {
        updateEvent(
          id,
          response.data.event.event_type,
          response.data.event.description,
          response.data.event.timestamp,
          response.data.event.redirect
        );
      } else {
        if (response.data.status === 404) {
          removeEvent(id);
        } else {
          console.log(response.data);
        }
      }
    });
};

const fetchConstraints = async (
  API_URL: string,
  uid: string,
  jwt: string,
  offset: number,
  currentConstraints: Array<IConstraint>
) => {
  const { setConstraints } = useConstraintStore.getState();

  axios
    .get(`${API_URL}/constraint/fetch?uid=${uid}&offset=${offset}&limit=20`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then(async (response) => {
      if (response.data.status === 200) {
        setConstraints([...currentConstraints]);
        if (currentConstraints.length < response.data.amount) {
          await fetchConstraints(API_URL, uid, jwt, offset + 1, [
            ...currentConstraints,
            ...response.data.constraints,
          ]);
        }
      } else {
        console.log(response.data);
      }
    });
};

export const automaticLogin = async (
  API_URL: string,
  uid: string,
  jwt: string
) => {
  await fetchUserProfile(API_URL, uid, jwt);
  await fetchProfiles(API_URL, uid, jwt, 0, []);
  await fetchConfigs(API_URL, uid, jwt, 0, []);
  await fetchMedia(API_URL, uid, jwt, 0, []);
  await fetchProjects(API_URL, uid, jwt, 0, []);
  await fetchEvents(API_URL, uid, jwt, 0, []);
  await fetchConstraints(API_URL, uid, jwt, 0, []);
};

export const logout = async () => {
  const { setUserProfile } = useUserProfileStore.getState();
  const { setProfiles } = useProfileStore.getState();
  const { setConfigs } = useConfigStore.getState();
  const { setMedia } = useMediaStore.getState();
  const { setProjects } = useProjectStore.getState();
  const { setCollections } = useCollectionStore.getState();
  const { setEvents } = useEventStore.getState();
  const { setTheme } = useThemeStore.getState();

  setUserProfile({
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    role: '',
    password: '',
    jwt: '',
  });
  setProfiles([]);
  setConfigs([]);
  setMedia([]);
  setProjects([]);
  setCollections([]);
  setEvents([]);
  setTheme('dark');

  localStorage.clear();
};
