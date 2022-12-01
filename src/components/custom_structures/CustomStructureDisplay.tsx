import React from 'react';
import { ICollection, ICustomStructure } from '../../stores/useCollectionStore';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { ALinkTo, BigText, Heading, SmallText } from '../Components';

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
}: {
  project_id: string;
  collection_id: string;
  profile: IUserProfile;
  currentProject: IProject;
  currentCollection: ICollection;
  currentCustomStructure: ICustomStructure;
  setEditingCustomStructureID: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingCustomStructureName: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingCustomStructureDescription: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setDeletingCustomStructure: React.Dispatch<React.SetStateAction<boolean>>;
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
          text-base-content lg:ml-2
        `}
        >
          {currentCustomStructure.name}
        </span>
      </Heading>

      <BigText
        // nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {currentCustomStructure.description}
      </BigText>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <SmallText
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentCustomStructure.structures.length} structures
      </SmallText>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
          <button
            className="btn btn-warning btn-outline gap-2"
            title="Edit Custom Structure ID"
            onClick={() => setEditingCustomStructureID(true)}
          >
            Edit Custom Structure ID
            <i className={`ri-arrow-right-s-line`} />
          </button>
          <button
            className="btn btn-warning btn-outline gap-2 mt-2 lg:mt-0"
            title="Edit Custom Structure Name"
            onClick={() => setEditingCustomStructureName(true)}
          >
            Edit Custom Structure Name
            <i className={`ri-arrow-right-s-line`} />
          </button>
          <button
            className="btn btn-warning btn-outline gap-2 mt-2 lg:mt-0"
            title="Edit Custom Structure Description"
            onClick={() => setEditingCustomStructureDescription(true)}
          >
            Edit Custom Structure Description
            <i className={`ri-arrow-right-s-line`} />
          </button>
          <button
            className="btn btn-error btn-outline gap-2 mt-2 lg:mt-0"
            title="Delete Custom Structure"
            onClick={() => setDeletingCustomStructure(true)}
          >
            Delete Custom Structure
            <i className={`ri-delete-bin-2-line`} />
          </button>
        </div>
      )}
    </div>
  );
}
