import React from 'react';
import { ICollection } from '../../stores/useCollectionStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { ALinkTo, BigText, SmallText, Text } from '../Components';

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
}: {
  collection: ICollection;
  project_id: string;
  profile: IUserProfile;
  setCollectionID: React.Dispatch<React.SetStateAction<string>>;
  setEditCollectionID: React.Dispatch<React.SetStateAction<string>>;
  setEditingCollectionID: React.Dispatch<React.SetStateAction<boolean>>;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
  setEditingCollectionName: React.Dispatch<React.SetStateAction<boolean>>;
  setCollectionDescription: React.Dispatch<React.SetStateAction<string>>;
  setEditingCollectionDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setDeletingCollection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={collection.id}
    >
      <BigText
        color="primary"
        // nobreak
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

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <div className="w-full flex lg:mt-2">
        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Collection ID"
            onClick={() => {
              setEditingCollectionID(true);
              setCollectionID(collection.id);
              setEditCollectionID(collection.id);
              setCollectionName(collection.name);
            }}
          >
            <i className={`ri-edit-line`} />
          </button>
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Collection Name"
            onClick={() => {
              setEditingCollectionName(true);
              setCollectionID(collection.id);
              setCollectionName(collection.name);
            }}
          >
            <i className={`ri-pencil-line`} />
          </button>
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Collection Description"
            onClick={() => {
              setEditingCollectionDescription(true);
              setCollectionID(collection.id);
              setCollectionName(collection.name);
              setCollectionDescription(collection.description);
            }}
          >
            <i className={`ri-edit-box-line`} />
          </button>
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-error btn-outline btn-sm btn-circle"
            title="Delete Collection"
            onClick={() => {
              setDeletingCollection(true);
              setCollectionID(collection.id);
              setCollectionName(collection.name);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
