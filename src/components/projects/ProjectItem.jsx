import React from 'react';

import { ALinkTo, BigText, SmallText, Text } from '../Components';

export default function ProjectItem({
  project,
  profile,
  setShowMembers,
  setMembers,
  setProjectID,
  setName,
  setMemberCurrentPage,
  setAddMember,
  setRemoveMember,
  setDeletingProject,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={project.id}
    >
      <BigText
        color="primary"
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        <ALinkTo noopacity to={`/project/${project.id}`} color="primary">
          {project.name}
        </ALinkTo>
      </BigText>

      <Text
        nobreak
        className={`w-full mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
      >
        {project.description}
      </Text>

      <Text
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center bg-base-300 p-1 rounded-lg`}
      >
        {project.api_path}
      </Text>

      <SmallText
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {project.members.length} members
      </SmallText>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <div className="w-full flex lg:mt-2">
        <button
          className="btn btn-info btn-outline btn-sm btn-circle mr-2"
          title="View Members"
          onClick={() => {
            setShowMembers(true);
            setMembers(project.members);
            setProjectID(project.id);
            setName(project.name);
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
              setMembers(project.members);
              setProjectID(project.id);
              setName(project.name);
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
              setMembers(project.members);
              setProjectID(project.id);
              setName(project.name);
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
              setProjectID(project.id);
              setName(project.name);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
