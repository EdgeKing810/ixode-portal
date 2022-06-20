import React from 'react';

import {
  ALinkTo,
  BigText,
  IconButton,
  Separator,
  SmallText,
  Text,
} from '../Components';

export default function CollectionItem({
  collection,
  project_id,
  profile,
  setCollectionID,
  setEditCollectionID,
  setEditingCollectionID,
  setCollectionName,
  setEditingCollectionName,
  setCollectionDescription,
  setEditingCollectionDescription,
  setDeletingCollection,
  theme,
}) {
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
          to={`/project/${project_id}/collection/${collection.id}`}
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

      <Separator smaller />

      <div className="w-full flex">
        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Edit Collection ID"
            condition
            noFill
            theme={theme}
            icon="edit"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setEditingCollectionID(true);
              setCollectionID(collection.id);
              setEditCollectionID(collection.id);
              setCollectionName(collection.name);
            }}
          />
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Edit Collection Name"
            condition
            noFill
            theme={theme}
            icon="pencil"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setEditingCollectionName(true);
              setCollectionID(collection.id);
              setCollectionName(collection.name);
            }}
          />
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Edit Collection Description"
            condition
            noFill
            theme={theme}
            icon="edit-box"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setEditingCollectionDescription(true);
              setCollectionID(collection.id);
              setCollectionName(collection.name);
              setCollectionDescription(collection.description);
            }}
          />
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Delete Collection"
            condition
            noFill
            theme={theme}
            icon="delete-bin-2"
            className="p-2 rounded-full w-10 h-10"
            color="primary"
            click={() => {
              setDeletingCollection(true);
              setCollectionID(collection.id);
              setCollectionName(collection.name);
            }}
          />
        )}
      </div>
    </div>
  );
}
