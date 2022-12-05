import React from 'react';
import { ICollection } from '../../stores/useCollectionStore';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { ALinkTo, BigText, Heading, SmallText } from '../Components';

export default function CollectionDisplay({
  project_id,
  profile,
  currentProject,
  currentCollection,
  setEditingCollectionID,
  setEditingCollectionName,
  setEditingCollectionDescription,
  setDeletingCollection,
}: {
  project_id: string;
  profile: IUserProfile;
  currentProject: IProject;
  currentCollection: ICollection;
  setEditingCollectionID: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingCollectionName: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingCollectionDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setDeletingCollection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
        // nobreak
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
        <span className={`text-base-content lg:ml-2`}>
          {currentCollection.name}
        </span>
      </Heading>

      <BigText
        // nobreak
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

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
          <button
            className="btn btn-disabled btn-outline gap-2"
            title="Edit Collection ID"
            onClick={
              () => null
              //setEditingCollectionID(true)
            }
          >
            Edit Collection ID
            <i className={`ri-arrow-right-s-line`} />
          </button>

          <button
            className="btn btn-warning btn-outline gap-2 mt-2 lg:mt-0"
            title="Edit Collection Name"
            onClick={() => setEditingCollectionName(true)}
          >
            Edit Collection Name
            <i className={`ri-arrow-right-s-line`} />
          </button>

          <button
            className="btn btn-warning btn-outline gap-2 mt-2 lg:mt-0"
            title="Edit Collection Description"
            onClick={() => setEditingCollectionDescription(true)}
          >
            Edit Collection Description
            <i className={`ri-arrow-right-s-line`} />
          </button>
          <button
            className="btn btn-error btn-outline gap-2 mt-2 lg:mt-0"
            title="Delete Collection"
            onClick={() => setDeletingCollection(true)}
          >
            Delete Collection
            <i className={`ri-delete-bin-2-line`} />
          </button>
        </div>
      )}
    </div>
  );
}
