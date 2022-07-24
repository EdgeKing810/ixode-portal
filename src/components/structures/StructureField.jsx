import React from 'react';
import { converToLocalDateTime } from '../../utils/timestamp';

import { BigText, IconButton, Separator, SmallText } from '../Components';

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
  theme,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={structure.id}
    >
      <BigText
        color="primary"
        theme={theme}
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {structure.name}
      </BigText>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {structure.description}
      </SmallText>

      <Separator smaller />

      <div className="w-full flex">
        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Edit Structure"
            condition
            noFill
            theme={theme}
            icon="pencil"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
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
          />
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Delete Structure"
            condition
            noFill
            theme={theme}
            icon="delete-bin-2"
            className="p-2 rounded-full w-10 h-10"
            color="primary"
            click={() => {
              setDeletingStructure(true);
              setStructureID(structure.id);
              setStructureName(structure.name);
              setStructureDescription('');
            }}
          />
        )}
      </div>
    </div>
  );
}
