import React from 'react';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';

import { BigText, Heading, SmallText, Text } from '../Components';

export default function ProjectDisplay({
  currentProject,
  profile,
  setEditingProject,
  setShowMembers,
  setMembers,
  setProjectID,
  setName,
  setMemberCurrentPage,
  setAddMember,
  setRemoveMember,
  setDeletingProject,
}: {
  currentProject: IProject;
  profile: IUserProfile;
  setEditingProject: React.Dispatch<React.SetStateAction<string>>;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>;
  setProjectID: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveMember: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingProject: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
        // nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {currentProject.name}
      </Heading>

      <BigText
        // nobreak
        className={`w-full -mt-2 mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {currentProject.description}
      </BigText>

      <Text
        color="secondary"
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center bg-base-300 p-1 rounded-lg`}
      >
        {currentProject.api_path}
      </Text>

      <SmallText
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentProject.members.length} members
      </SmallText>

      {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
        <div className="w-full">
          <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />
          <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
            <button
              className="btn btn-warning btn-outline gap-2"
              title="Update Project ID"
              onClick={() => setEditingProject('ID')}
            >
              Update Project ID
              <i className={`ri-arrow-right-s-line`} />
            </button>
            <button
              className="btn btn-warning btn-outline gap-2"
              title="Update Project Name"
              onClick={() => setEditingProject('Name')}
            >
              Update Project Name
              <i className={`ri-arrow-right-s-line`} />
            </button>
            <button
              className="btn btn-warning btn-outline gap-2"
              title="Update Project Description"
              onClick={() => setEditingProject('Description')}
            >
              Update Project Description
              <i className={`ri-arrow-right-s-line`} />
            </button>
            <button
              className="btn btn-warning btn-outline gap-2"
              title="Update Project API Path"
              onClick={() => setEditingProject('API Path')}
            >
              Update Project API Path
              <i className={`ri-arrow-right-s-line`} />
            </button>
          </div>
        </div>
      )}

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      <div className="w-full flex">
        <button
          className="btn btn-info btn-outline btn-sm btn-circle mr-2"
          title="View Members"
          onClick={() => {
            setShowMembers(true);
            setMembers(currentProject.members);
            setProjectID(currentProject.id);
            setName(currentProject.name);
            setMemberCurrentPage(0);
          }}
        >
          <i className={`ri-user-line`} />
        </button>

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-success btn-outline btn-sm btn-circle mr-2"
            title="Add Member"
            onClick={() => {
              setAddMember(true);
              setMembers(currentProject.members);
              setProjectID(currentProject.id);
              setName(currentProject.name);
              setMemberCurrentPage(0);
            }}
          >
            <i className={`ri-user-add-line`} />
          </button>
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-error btn-outline btn-sm btn-circle mr-2"
            title="Remove Member"
            onClick={() => {
              setRemoveMember(true);
              setMembers(currentProject.members);
              setProjectID(currentProject.id);
              setName(currentProject.name);
              setMemberCurrentPage(0);
            }}
          >
            <i className={`ri-user-unfollow-line`} />
          </button>
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-error btn-outline btn-sm btn-circle"
            title="Delete Project"
            onClick={() => {
              setDeletingProject(true);
              setProjectID(currentProject.id);
              setName(currentProject.name);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
