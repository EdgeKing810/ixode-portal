import React from 'react';
import { ICollection } from '../../stores/useCollectionStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

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
  setStructureRequired,
  filter,
  setFilter,
  setCurrentPage,
  limit,
}: {
  currentCollection: ICollection | null;
  profile: IUserProfile;
  setCreatingStructure: React.Dispatch<React.SetStateAction<boolean>>;
  setStructureID: React.Dispatch<React.SetStateAction<string>>;
  setStructureName: React.Dispatch<React.SetStateAction<string>>;
  setStructureDescription: React.Dispatch<React.SetStateAction<string>>;
  setStructureType: React.Dispatch<React.SetStateAction<string>>;
  setStructureDefault: React.Dispatch<
    React.SetStateAction<string | number | boolean | Date>
  >;
  setStructureMin: React.Dispatch<React.SetStateAction<number>>;
  setStructureMax: React.Dispatch<React.SetStateAction<number>>;
  setStructureEncrypted: React.Dispatch<React.SetStateAction<boolean>>;
  setStructureUnique: React.Dispatch<React.SetStateAction<boolean>>;
  setStructureRegex: React.Dispatch<React.SetStateAction<string>>;
  setStructureArray: React.Dispatch<React.SetStateAction<boolean>>;
  setStructureRequired: React.Dispatch<React.SetStateAction<boolean>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}) {
  return (
    <div className="w-full">
      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      <div className="flex lg:flex-row flex-col">
        {currentCollection && currentCollection.structures && (
          <SubHeading
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
            <button
              className="btn btn-primary btn-outline gap-2 w-full lg:w-1/3 mt-2 lg:mt-0 "
              title="Create a new Structure"
              onClick={() => {
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
                setStructureRequired(false);
              }}
            >
              Create a new Structure
            </button>
          )}
      </div>

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {currentCollection &&
        currentCollection.structures &&
        currentCollection.structures.length > 0 && (
          <Input
            title="Filter Structures"
            placeholder="Filter Structures..."
            value={filter}
            change={(e) => {
              setFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="lg:mb-4 mb-2"
          />
        )}

      {currentCollection &&
        currentCollection.structures &&
        currentCollection.structures.length > 0 && (
          <PaginationList
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
