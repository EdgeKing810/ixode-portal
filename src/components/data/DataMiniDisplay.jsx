import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Button, Input, Separator, SubHeading } from '../Components';

export default function DataMiniDisplay({
  currentData,
  projectID,
  collectionID,
  profile,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  theme,
  navigate,
}) {
  return (
    <div className="w-full">
      <Separator />

      <div className="flex lg:flex-row flex-col">
        {currentData && (
          <SubHeading
            color={theme === 'light' ? 'dark' : 'light'}
            theme={theme}
            nobreak
            className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase pt-1`}
            smallerOnMobile
          >
            Data Objects ({currentData.length})
          </SubHeading>
        )}

        {profile && (
          <Button
            color="dark"
            bgcolor="primary"
            theme={theme}
            className="p-3 w-full lg:w-1/3 justify-center uppercase font-bold"
            click={() =>
              navigate(`/data/p/${projectID}/c/${collectionID}/d/create`)
            }
          >
            Create a new Data Object
          </Button>
        )}
      </div>

      <Separator />

      {currentData && currentData.length > 0 && (
        <Input
          title="Filter Data"
          placeholder="Filter Data..."
          value={filter}
          theme={theme}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {currentData && currentData.length > 0 && (
        <PaginationList
          theme={theme}
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
