import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Button, Input, Separator, SubHeading } from '../Components';

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
  theme,
}) {
  return (
    <div className="w-full">
      <Separator />

      <div className="flex lg:flex-row flex-col">
        {currentCollection && currentCollection.custom_structures && (
          <SubHeading
            color={theme === 'light' ? 'dark' : 'light'}
            theme={theme}
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
            <Button
              color={theme === 'light' ? 'dark' : 'light'}
              theme={theme}
              className="p-3 w-full lg:w-1/3 justify-center uppercase"
              click={() => {
                setCreatingCustomStructure(true);
                setCustomStructureID('');
                setEditCustomStructureID('');
                setCustomStructureName('');
                setCustomStructureDescription('');
              }}
            >
              Create a new Custom Structure
            </Button>
          )}
      </div>

      <Separator />

      {currentCollection &&
        currentCollection.custom_structures &&
        currentCollection.custom_structures.length > 0 && (
          <Input
            title="Filter Custom Structures"
            placeholder="Filter Custom Structures..."
            value={filter}
            theme={theme}
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
            theme={theme}
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
        currentCollection.custom_structures > 0 &&
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
