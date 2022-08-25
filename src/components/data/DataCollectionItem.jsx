import React from 'react';

import { ALinkTo, BigText, SmallText, Text } from '../Components';

export default function DataCollectionItem({ collection, project_id }) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={collection.id}
    >
      <BigText
        color="primary"
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        <ALinkTo
          noopacity
          to={`/data/p/${project_id}/c/${collection.id}`}
          color="primary"
        >
          {collection.name}
        </ALinkTo>
      </BigText>

      <Text
        nobreak
        className={`w-full mb-1 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
      >
        {collection.description}
      </Text>

      <SmallText
        nobreak
        className={`w-full mt-1 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {collection.structures.length} Structures
      </SmallText>

      <SmallText
        nobreak
        className={`w-full mt-1 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {collection.custom_structures.length} Custom Structures
      </SmallText>
    </div>
  );
}
