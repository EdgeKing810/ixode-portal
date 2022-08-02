import React from 'react';

import { ALinkTo, BigText, SmallText, Text } from '../Components';

export default function DataCollectionItem({ collection, project_id, theme }) {
  return (
    <div
      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={collection.id}
    >
      <BigText
        color="primary"
        theme={theme}
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
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mb-1 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
      >
        {collection.description}
      </Text>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-1 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {collection.structures.length} Structures
      </SmallText>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-1 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {collection.custom_structures.length} Custom Structures
      </SmallText>
    </div>
  );
}
