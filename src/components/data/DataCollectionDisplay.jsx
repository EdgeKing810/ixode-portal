import React from 'react';

import { ALinkTo, BigText, Heading, SmallText } from '../Components';

export default function DataCollectionDisplay({
  project_id,
  currentProject,
  currentCollection,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
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
          className={`text-base-content lg:ml-2
        `}
        >
          {currentCollection.name}
        </span>
      </Heading>

      <BigText
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {currentCollection.description}
      </BigText>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <SmallText
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentCollection.structures.length} structures
      </SmallText>

      <SmallText
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentCollection.custom_structures.length} custom structures
      </SmallText>
    </div>
  );
}
