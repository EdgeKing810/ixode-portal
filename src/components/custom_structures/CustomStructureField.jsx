import React from 'react';

import {
  ALinkTo,
  BigText,
  IconButton,
  Separator,
  SmallText,
} from '../Components';

export default function CustomStructureField({
  structure,
  profile,
  project_id,
  collection_id,
  setEditingCustomStructure,
  setCustomStructureID,
  setEditCustomStructureID,
  setCustomStructureName,
  setCustomStructureDescription,
  setDeletingCustomStructure,
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
        <ALinkTo
          noopacity
          to={`/project/${project_id}/collection/${collection_id}/custom/${structure.id}`}
          color="primary"
        >
          {structure.name}
        </ALinkTo>
      </BigText>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-fulloverflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {structure.description}
      </SmallText>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {structure.structures.length} structures
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
              setEditingCustomStructure(true);
              setCustomStructureID(structure.id);
              setEditCustomStructureID(structure.id);
              setCustomStructureName(structure.name);
              setCustomStructureDescription(structure.description);
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
              setDeletingCustomStructure(true);
              setCustomStructureID(structure.id);
              setEditCustomStructureID(structure.id);
              setCustomStructureName(structure.name);
              setCustomStructureDescription(structure.description);
            }}
          />
        )}
      </div>
    </div>
  );
}
