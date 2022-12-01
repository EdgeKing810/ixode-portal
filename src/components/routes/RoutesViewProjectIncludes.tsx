import React from 'react';

import IncludeShowMembers from '../../pages/includes/projects/IncludeShowMembers';
import IncludeDeleteRoute from '../../pages/includes/routes/IncludeDeleteRoute';
import { IProfile } from '../../stores/useProfileStore';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IRoute } from '../../utils/route';
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
}: {
  API_URL: string;
  profile: IUserProfile;
  currentProject: IProject;
  setCurrentRoutes: React.Dispatch<React.SetStateAction<Array<IRoute>>>;
  routeID: string;
  setRouteID: React.Dispatch<React.SetStateAction<string>>;
  deletingRoute: boolean;
  setDeletingRoute: React.Dispatch<React.SetStateAction<boolean>>;
  alert: any;
  allProfiles: Array<IProfile>;
  name: string;
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  members: Array<string>;
  memberLimit: number;
  memberCurrentPage: number;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
