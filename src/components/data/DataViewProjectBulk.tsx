import React from 'react';
import { ICollection } from '../../stores/useCollectionStore';
import PaginationList from '../../wrappers/PaginationList';

import { Input, SubHeading } from '../Components';

export default function DataViewProjectBulk({
  collections,
  isLoading,
  filter,
  setFilter,
  setCurrentPage,
  limit,
}: {
  collections: Array<ICollection>;
  isLoading: boolean;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}) {
  return (
    <div className="w-full">
      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      <div className="flex lg:flex-row flex-col">
        {((collections && collections.length > 0) || !isLoading) && (
          <SubHeading
            nobreak
            className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
            smallerOnMobile
          >
            Collections ({collections ? collections.length : 0})
          </SubHeading>
        )}
      </div>

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {collections && collections.length > 0 && (
        <Input
          title="Filter Collections"
          placeholder="Filter Collections..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {collections && collections.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            collections
              ? collections.filter(
                  (c) =>
                    filter.length <= 0 ||
                    c.name
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    c.description
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    c.id.toLowerCase().includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-2 lg:mb-4"
        />
      )}

      {collections &&
        collections.length > 0 &&
        filter.length > 0 &&
        !collections.find(
          (c) =>
            filter.length <= 0 ||
            c.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
            c.description.toLowerCase().includes(filter.trim().toLowerCase()) ||
            c.id.toLowerCase().includes(filter.trim().toLowerCase())
        ) && (
          <SubHeading color="error">no collection match the filter.</SubHeading>
        )}
    </div>
  );
}
