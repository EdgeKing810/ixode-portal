import React from 'react';
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
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={structure.id}
    >
      <BigText
        color="primary"
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {structure.name}
      </BigText>

      <SmallText
        nobreak
        className={`w-full mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
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
                  ? converToLocalDateTime(structure.default_val)
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
