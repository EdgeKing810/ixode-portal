import React from 'react';

import {
  ALinkTo,
  BigText,
  Heading,
  LinkerButton,
  Separator,
  SmallText,
} from '../Components';

export default function CustomStructureDisplay({
  project_id,
  collection_id,
  profile,
  currentProject,
  currentCollection,
  currentCustomStructure,
  setEditingCustomStructureID,
  setEditingCustomStructureName,
  setEditingCustomStructureDescription,
  setDeletingCustomStructure,
  theme,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
        theme={theme}
        nobreak
        className="w-full flex lg:flex-row flex-col uppercase"
        smallerOnMobile
      >
        <ALinkTo
          noopacity
          notfull
          notnoto
          to={`/project/${project_id}`}
          color="primary"
        >
          {currentProject.name} {'>'}
        </ALinkTo>
        <ALinkTo
          noopacity
          notfull
          notnoto
          to={`/project/${project_id}/collection/${collection_id}`}
          color="secondary"
          className="lg:ml-2"
        >
          {currentCollection.name} {'>'}
        </ALinkTo>
        <span
          className={`
          ${theme === 'light' ? 'text-main-dark' : 'text-main-light'} lg:ml-2
        `}
        >
          {currentCustomStructure.name}
        </span>
      </Heading>

      <BigText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {currentCustomStructure.description}
      </BigText>

      <Separator smaller />

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentCustomStructure.structures.length} structures
      </SmallText>

      <Separator smaller />

      {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full"
            smaller
            transparent
            condition
            title="Edit Custom Structure ID"
            icon="arrow-right-s"
            noFill
            reverseIcon
            click={() => {
              setEditingCustomStructureID(true);
            }}
          />
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full"
            smaller
            transparent
            condition
            title="Edit Custom Structure Name"
            icon="arrow-right-s"
            noFill
            reverseIcon
            click={() => {
              setEditingCustomStructureName(true);
            }}
          />
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full lg:mt-0"
            smaller
            transparent
            condition
            title="Edit Custom Structure Description"
            icon="arrow-right-s"
            noFill
            reverseIcon
            click={() => {
              setEditingCustomStructureDescription(true);
            }}
          />
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full lg:mt-0"
            smaller
            transparent
            condition
            title="Delete Custom Structure"
            icon="delete-bin-2"
            noFill
            reverseIcon
            click={() => {
              setDeletingCustomStructure(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
