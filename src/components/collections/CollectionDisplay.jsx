import React from 'react';

import {
  ALinkTo,
  BigText,
  Heading,
  LinkerButton,
  Separator,
  SmallText,
} from '../Components';

export default function CollectionDisplay({
  project_id,
  profile,
  currentProject,
  currentCollection,
  setEditingCollectionID,
  setEditingCollectionName,
  setEditingCollectionDescription,
  setDeletingCollection,
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
        <span
          className={`
          ${theme === 'light' ? 'text-main-dark' : 'text-main-light'} lg:ml-2
        `}
        >
          {currentCollection.name}
        </span>
      </Heading>

      <BigText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {currentCollection.description}
      </BigText>

      <Separator smaller />

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentCollection.structures.length} structures
      </SmallText>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentCollection.custom_structures.length} custom structures
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
            title="Edit Collection ID"
            icon="arrow-right-s"
            noFill
            reverseIcon
            click={() => {
              setEditingCollectionID(true);
            }}
          />
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full"
            smaller
            transparent
            condition
            title="Edit Collection Name"
            icon="arrow-right-s"
            noFill
            reverseIcon
            click={() => {
              setEditingCollectionName(true);
            }}
          />
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full lg:mt-0"
            smaller
            transparent
            condition
            title="Edit Collection Description"
            icon="arrow-right-s"
            noFill
            reverseIcon
            click={() => {
              setEditingCollectionDescription(true);
            }}
          />
          <LinkerButton
            theme={theme}
            className="p-2 rounded-lg uppercase w-full lg:mt-0"
            smaller
            transparent
            condition
            title="Delete Collection"
            icon="delete-bin-2"
            noFill
            reverseIcon
            click={() => {
              setDeletingCollection(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
