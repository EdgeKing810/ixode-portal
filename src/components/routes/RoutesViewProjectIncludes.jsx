import React from 'react';

import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';
import IncludeDeleteRoute from '../../pages/includes/routes/IncludeDeleteRoute';
import { submitDeleteRoute } from './routes.utils';

export default function RoutesViewProjectIncludes({
  API_URL,
  profile,
  currentProject,
  setCurrentRoutes,
  routeID,
  setRouteID,
  deletingRoute,
  setDeletingRoute,
  alert,
  allProfiles,
  name,
  showMembers,
  setShowMembers,
  members,
  memberLimit,
  memberCurrentPage,
  setMemberCurrentPage,
}) {
  return (
    <div className="w-full">
      <IncludeShowMembers
        showMembers={showMembers}
        setShowMembers={setShowMembers}
        name={name}
        members={allProfiles.filter((ap) =>
          members.includes(ap.id.toLowerCase())
        )}
        limit={memberLimit}
        currentPage={memberCurrentPage}
        setCurrentPage={setMemberCurrentPage}
      />

      <IncludeDeleteRoute
        isActive={deletingRoute}
        setIsActive={setDeletingRoute}
        submitDeleteRoute={() =>
          submitDeleteRoute(
            API_URL,
            profile,
            currentProject,
            routeID,
            setRouteID,
            setDeletingRoute,
            setCurrentRoutes,
            alert
          )
        }
        name={routeID}
      />
    </div>
  );
}
