import React from 'react';

import {
  ALinkTo,
  BigText,
  IconButton,
  Separator,
  SmallText,
  Text,
} from '../Components';

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
  theme,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={project.id}
    >
      <BigText
        color="primary"
        theme={theme}
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        <ALinkTo noopacity to={`/project/${project.id}`} color="primary">
          {project.name}
        </ALinkTo>
      </BigText>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
      >
        {project.description}
      </Text>

      <Text
        color="secondary"
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center ${
          theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
        } p-1 rounded-lg`}
      >
        {project.api_path}
      </Text>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {project.members.length} members
      </SmallText>

      <Separator smaller />

      <div className="w-full flex">
        <IconButton
          title="View Members"
          condition
          noFill
          theme={theme}
          icon="user"
          className="p-2 rounded-full w-10 h-10 mr-2"
          color="primary"
          click={() => {
            setShowMembers(true);
            setMembers(project.members);
            setProjectID(project.id);
            setName(project.name);
            setMemberCurrentPage(0);
          }}
        />

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Add Member"
            condition
            noFill
            theme={theme}
            icon="user-add"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setAddMember(true);
              setMembers(project.members);
              setProjectID(project.id);
              setName(project.name);
              setMemberCurrentPage(0);
            }}
          />
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Remove Member"
            condition
            noFill
            theme={theme}
            icon="user-unfollow"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setRemoveMember(true);
              setMembers(project.members);
              setProjectID(project.id);
              setName(project.name);
              setMemberCurrentPage(0);
            }}
          />
        )}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Delete Project"
            condition
            noFill
            theme={theme}
            icon="delete-bin-2"
            className="p-2 rounded-full w-10 h-10"
            color="primary"
            click={() => {
              setDeletingProject(true);
              setProjectID(project.id);
              setName(project.name);
            }}
          />
        )}
      </div>
    </div>
  );
}
