import React from 'react';
import { getLengthRouteBlocks } from '../../utils/routeProcessor';

import { ALinkTo, BigText, SmallText } from '../Components';

export default function RouteField({
  route,
  project_id,
  setRouteID,
  setDeletingRoute,
  navigate,
  profile,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={route.route_id}
    >
      <BigText
        color="primary"
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        <ALinkTo
          noopacity
          to={`/routes/p/${project_id}/r/v/${route.route_id}`}
          color="primary"
        >
          {route.route_id}
        </ALinkTo>
      </BigText>

      <SmallText
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
        color="secondary"
      >
        {route.route_path}
      </SmallText>

      <SmallText
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {getLengthRouteBlocks(route)} blocks
      </SmallText>

      <div className={`pt-1 my-2 w-full bg-accent`} />

      {profile && !['VIEWER', 'AUTHOR'].includes(profile.role) && (
        <div className="w-full flex lg:mt-2">
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Route"
            onClick={() => {
              navigate(`/routes/p/${project_id}/r/e/${route.route_id}`);
            }}
          >
            <i className={`ri-pencil-line`} />
          </button>

          <button
            className="btn btn-error btn-outline btn-sm btn-circle mr-2"
            title="Delete Route"
            onClick={() => {
              setDeletingRoute(true);
              setRouteID(route.route_id);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        </div>
      )}
    </div>
  );
}
