import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function CustomStructureMiniDisplay({
  currentCollection,
  profile,
  setCreatingCustomStructure,
  setCustomStructureID,
  setEditCustomStructureID,
  setCustomStructureName,
  setCustomStructureDescription,
  filter,
  setFilter,
  setCustomCurrentPage,
  customLimit,
}) {
  return (
    <div className="w-full">
      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      <div className="flex lg:flex-row flex-col">
        {currentCollection && currentCollection.custom_structures && (
          <SubHeading
            nobreak
            className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase pt-1`}
            smallerOnMobile
          >
            Custom Structures ({currentCollection.custom_structures.length})
          </SubHeading>
        )}

        {profile &&
          ['ROOT', 'ADMIN'].includes(profile.role) &&
          currentCollection &&
          currentCollection.id && (
            <button
              className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
              title="Create a new Custom Structure"
              onClick={() => {
                setCreatingCustomStructure(true);
                setCustomStructureID('');
                setEditCustomStructureID('');
                setCustomStructureName('');
                setCustomStructureDescription('');
              }}
            >
              Create a new Custom Structure
            </button>
          )}
      </div>

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {currentCollection &&
        currentCollection.custom_structures &&
        currentCollection.custom_structures.length > 0 && (
          <Input
            title="Filter Custom Structures"
            placeholder="Filter Custom Structures..."
            value={filter}
            change={(e) => {
              setFilter(e.target.value);
              setCustomCurrentPage(0);
            }}
            className="lg:mb-4 mb-2"
          />
        )}

      {currentCollection &&
        currentCollection.custom_structures &&
        currentCollection.custom_structures.length > 0 && (
          <PaginationList
            limit={customLimit}
            amount={
              currentCollection.custom_structures
                ? currentCollection.custom_structures.filter(
                    (s) =>
                      filter.length <= 0 ||
                      s.id
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      s.name.toLowerCase().includes(filter.trim().toLowerCase())
                  ).length
                : 0
            }
            setter={setCustomCurrentPage}
            additional="mb-2 lg:mb-4"
          />
        )}

      {currentCollection &&
        currentCollection.custom_structures &&
        currentCollection.custom_structures.length > 0 &&
        filter.length > 0 &&
        !currentCollection.custom_structures.find(
          (s) =>
            filter.length <= 0 ||
            s.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
            s.name.toLowerCase().includes(filter.trim().toLowerCase())
        ) && (
          <SubHeading color="error">
            no custom structure match the filter.
          </SubHeading>
        )}
    </div>
  );
}
