import React from 'react';
import { IStructure } from '../../stores/useCollectionStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { converToLocalDateTime } from '../../utils/timestamp';

import { BigText, SmallText } from '../Components';

export default function StructureField({
  structure,
  profile,
  setEditingStructure,
  setStructureID,
  setEditStructureID,
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
  setDeletingStructure,
}: {
  structure: IStructure;
  profile: IUserProfile;
  setEditingStructure: React.Dispatch<React.SetStateAction<boolean>>;
  setStructureID: React.Dispatch<React.SetStateAction<string>>;
  setEditStructureID: React.Dispatch<React.SetStateAction<string>>;
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
  setDeletingStructure: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={structure.id}
    >
      <BigText
        color="primary"
        // nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {structure.name}
      </BigText>

      <SmallText
        nobreak
        className={`w-full mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        // smallerOnMobile
      >
        {structure.description}
      </SmallText>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <div className="w-full flex lg:mt-2">
        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Structure"
            onClick={() => {
              setEditingStructure(true);
              setStructureID(structure.id);
              setEditStructureID(structure.id);
              setStructureName(structure.name);
              setStructureDescription(structure.description);
              setStructureType(structure.stype);
              setStructureDefault(
                structure.stype === 'DATETIME'
                  ? converToLocalDateTime(
                      new Date(structure.default_val.toString())
                    )
                  : structure.default_val
              );
              setStructureMin(structure.min);
              setStructureMax(structure.max);
              setStructureEncrypted(structure.encrypted);
              setStructureUnique(structure.unique);
              setStructureRegex(structure.regex_pattern);
              setStructureArray(structure.array);
              setStructureRequired(structure.required);
            }}
          >
            <i className={`ri-pencil-line`} />
          </button>
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-error btn-outline btn-sm btn-circle"
            title="Delete Structure"
            onClick={() => {
              setDeletingStructure(true);
              setStructureID(structure.id);
              setStructureName(structure.name);
              setStructureDescription('');
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
