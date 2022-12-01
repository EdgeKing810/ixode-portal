import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IRoute } from '../../utils/route';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function RoutesMiniDisplay({
  currentRoutes,
  projectID,
  profile,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  navigate,
}: {
  currentRoutes: Array<IRoute>;
  projectID: string;
  profile: IUserProfile;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  navigate: NavigateFunction;
}) {
  return (
    <div className="w-full">
      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      <div className="flex lg:flex-row flex-col">
        {currentRoutes && (
          <SubHeading
            nobreak
            className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase pt-1`}
            smallerOnMobile
          >
            Routes ({currentRoutes.length})
          </SubHeading>
        )}

        {profile && !['VIEWER', 'AUTHOR'].includes(profile.role) && (
          <button
            className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
            title="Create a new Custom Structure"
            onClick={() => navigate(`/routes/p/${projectID}/r/create`)}
          >
            Create a new Route
          </button>
        )}
      </div>

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {currentRoutes && currentRoutes.length > 0 && (
        <Input
          title="Filter Routes"
          placeholder="Filter Routes..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {currentRoutes && currentRoutes.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            currentRoutes
              ? currentRoutes.filter(
                  (r) =>
                    filter.length <= 0 ||
                    r.route_id
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    r.route_path
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-2 lg:mb-4"
        />
      )}

      {currentRoutes &&
        currentRoutes.length > 0 &&
        filter.length > 0 &&
        !currentRoutes.find(
          (r) =>
            filter.length <= 0 ||
            r.route_id.toLowerCase().includes(filter.trim().toLowerCase()) ||
            r.route_path.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no route match the filter.</SubHeading>}
    </div>
  );
}
