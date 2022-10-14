import axios from 'axios';
import { convertRouteBlocks } from '../../utils/routeProcessor';

export const submitCreateRoute = (
  API_URL,
  profile,
  projectID,
  routeObject,
  alert,
  navigate,
  currentBlocks
) => {
  alert.info('Submitting...');

  let updatedRoute = { ...routeObject };
  updatedRoute.flow = convertRouteBlocks(currentBlocks);
  console.log(updatedRoute)

  const data = {
    uid: profile.uid,
    project_id: projectID,
    update: false,
    route: updatedRoute,
  };

  axios
    .post(
      `${API_URL}/routing/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Route Created!');

        navigate(`/routes/p/${projectID}/r/v/${res.data.route_id}`);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateRoute = (
  API_URL,
  profile,
  projectID,
  routeObject,
  alert,
  navigate,
  currentBlocks
) => {
  alert.info('Submitting...');

  let updatedRoute = { ...routeObject };
  updatedRoute.flow = convertRouteBlocks(currentBlocks);
  console.log(updatedRoute)

  const data = {
    uid: profile.uid,
    project_id: projectID,
    update: true,
    route: updatedRoute,
  };

  axios
    .post(
      `${API_URL}/routing/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Route Updated!');

        navigate(`/routes/p/${projectID}/r/v/${res.data.route_id}`);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteRoute = (
  API_URL,
  profile,
  currentProject,
  routeID,
  setRouteID,
  setDeletingRoute,
  setCurrentRoute,
  alert
) => {
  const data = {
    uid: profile.uid,
    route_id: routeID,
    project_id: currentProject.id,
  };

  axios
    .post(
      `${API_URL}/routing/delete`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Route Deleted!');

        setDeletingRoute(false);
        setCurrentRoute((prev) => prev.filter((r) => r.route_id !== routeID));

        setRouteID('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
