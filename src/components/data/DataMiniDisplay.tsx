import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IDataOriginal } from '../../utils/dataProcessor';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function DataMiniDisplay({
  currentData,
  projectID,
  collectionID,
  profile,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  navigate,
}: {
  currentData: Array<IDataOriginal>;
  projectID: string;
  collectionID: string;
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
        {currentData && (
          <SubHeading
            nobreak
            className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase pt-1`}
            smallerOnMobile
          >
            Data Objects ({currentData.length})
          </SubHeading>
        )}

        <button
          className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
          title="Table View"
          onClick={() =>
            navigate(`/data/p/${projectID}/c/${collectionID}/d/table`)
          }
        >
          Table View
        </button>

        {profile && profile.role !== 'VIEWER' && (
          <button
            className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3 lg:ml-2"
            title="Create a new Custom Structure"
            onClick={() =>
              navigate(`/data/p/${projectID}/c/${collectionID}/d/create`)
            }
          >
            Create a new Data Object
          </button>
        )}
      </div>

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {currentData && currentData.length > 0 && (
        <Input
          title="Filter Data"
          placeholder="Filter Data..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {currentData && currentData.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            currentData
              ? currentData.filter(
                  (d) =>
                    filter.length <= 0 ||
                    d.id.toLowerCase().includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-2 lg:mb-4"
        />
      )}

      {currentData &&
        currentData.length > 0 &&
        filter.length > 0 &&
        !currentData.find(
          (d) =>
            filter.length <= 0 ||
            d.id.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no data match the filter.</SubHeading>}
    </div>
  );
}
