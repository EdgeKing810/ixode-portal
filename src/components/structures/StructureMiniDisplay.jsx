import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Button, Input, Separator, SubHeading } from '../Components';

export default function StructureMiniDisplay({
  currentCollection,
  profile,
  setCreatingStructure,
  setStructureID,
  setStructureName,
  setStructureDescription,
  setStructureType,
  setStructureDefault,
  setStructureMin,
  setStructureMax,
  setStructureEncrypted,
  setStructureUnique,
  setStructureRegex,
  setStructureArray,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  theme,
}) {
  return (
    <div className="w-full">
      <Separator />

      <div className="flex lg:flex-row flex-col">
        {currentCollection && currentCollection.structures && (
          <SubHeading
            color={theme === 'light' ? 'dark' : 'light'}
            theme={theme}
            nobreak
            className={`overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase pt-1`}
            smallerOnMobile
          >
            Structures ({currentCollection.structures.length})
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
                setCreatingStructure(true);
                setStructureID('');
                setStructureName('');
                setStructureDescription('');
                setStructureType('TEXT');
                setStructureDefault('');
                setStructureMin(0);
                setStructureMax(99);
                setStructureEncrypted(false);
                setStructureUnique(false);
                setStructureRegex('');
                setStructureArray(false);
              }}
            >
              Create a new Structure
            </Button>
          )}
      </div>

      <Separator />

      {currentCollection &&
        currentCollection.structures &&
        currentCollection.structures.length > 0 && (
          <Input
            title="Filter Structures"
            placeholder="Filter Structures..."
            value={filter}
            theme={theme}
            change={(e) => {
              setFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="mb-2"
          />
        )}

      {currentCollection &&
        currentCollection.structures &&
        currentCollection.structures.length > 0 && (
          <PaginationList
            theme={theme}
            limit={limit}
            amount={
              currentCollection.structures
                ? currentCollection.structures.filter(
                    (s) =>
                      filter.length <= 0 ||
                      s.id
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      s.name
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase()) ||
                      s.stype
                        .toLowerCase()
                        .includes(filter.trim().toLowerCase())
                  ).length
                : 0
            }
            setter={setCurrentPage}
            additional="mb-2 lg:mb-4"
          />
        )}

      {currentCollection &&
        currentCollection.structures &&
        currentCollection.structures.length > 0 &&
        filter.length > 0 &&
        !currentCollection.structures.find(
          (s) =>
            filter.length <= 0 ||
            s.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
            s.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
            s.stype.toLowerCase().includes(filter.trim().toLowerCase())
        ) && (
          <SubHeading color="error">no structure match the filter.</SubHeading>
        )}
    </div>
  );
}
