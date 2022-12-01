import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IComplexBlock, IRoute } from '../../utils/route';
import { convertRouteBlocks } from '../../utils/routeProcessor';

export const submitCreateRoute = (
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  routeObject: IRoute,
  alert: any,
  navigate: NavigateFunction,
  currentBlocks: Array<IComplexBlock>
) => {
  alert.info('Submitting...');

  let updatedRoute = { ...routeObject };
  updatedRoute.flow = convertRouteBlocks(currentBlocks);
  // console.log(updatedRoute);

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
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  routeObject: IRoute,
  alert: any,
  navigate: NavigateFunction,
  currentBlocks: Array<IComplexBlock>
) => {
  alert.info('Submitting...');

  let updatedRoute = { ...routeObject };
  updatedRoute.flow = convertRouteBlocks(currentBlocks);
  // console.log(updatedRoute);

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
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  routeID: string,
  setRouteID: React.Dispatch<React.SetStateAction<string>>,
  setDeletingRoute: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentRoute: React.Dispatch<React.SetStateAction<Array<IRoute>>>,
  alert: any
) => {
  axios
    .delete(
      `${API_URL}/routing/delete?uid=${profile.uid}&route_id=${routeID}&project_id=${currentProject.id}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Route Deleted!');

        setDeletingRoute(false);
        setCurrentRoute((prev) =>
          prev.filter((r: IRoute) => r.route_id !== routeID)
        );

        setRouteID('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
