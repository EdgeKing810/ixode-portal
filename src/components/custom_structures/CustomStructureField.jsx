import React from 'react';

import { ALinkTo, BigText, SmallText } from '../Components';

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
        <ALinkTo
          noopacity
          to={`/project/${project_id}/collection/${collection_id}/custom/${structure.id}`}
          color="primary"
        >
          {structure.name}
        </ALinkTo>
      </BigText>

      <SmallText
        nobreak
        className={`w-fulloverflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {structure.description}
      </SmallText>

      <SmallText
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {structure.structures.length} structures
      </SmallText>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <div className="w-full flex lg:mt-2">
        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Structure"
            onClick={() => {
              setEditingCustomStructure(true);
              setCustomStructureID(structure.id);
              setEditCustomStructureID(structure.id);
              setCustomStructureName(structure.name);
              setCustomStructureDescription(structure.description);
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
              setDeletingCustomStructure(true);
              setCustomStructureID(structure.id);
              setEditCustomStructureID(structure.id);
              setCustomStructureName(structure.name);
              setCustomStructureDescription(structure.description);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
