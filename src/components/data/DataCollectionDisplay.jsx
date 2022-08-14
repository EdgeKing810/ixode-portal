import React from 'react';

import { ALinkTo, BigText, Heading, Separator, SmallText } from '../Components';

export default function DataCollectionDisplay({
  project_id,
  currentProject,
  currentCollection,
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
          to={`/data/p/${project_id}`}
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
    </div>
  );
}
