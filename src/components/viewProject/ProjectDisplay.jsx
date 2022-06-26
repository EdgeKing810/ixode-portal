import React from 'react';

import {
  BigText,
  Heading,
  IconButton,
  LinkerButton,
  Separator,
  SmallText,
  Text,
} from '../Components';

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
  theme,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent bg-opacity-50 border-opacity-50 mb-2`}
    >
      <Heading
        color="primary"
        theme={theme}
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        {currentProject.name}
      </Heading>

      <BigText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full -mt-2 mb-2 overflow-hidden lg:flex lg:flex-col lg:justify-center`}
        smallerOnMobile
      >
        {currentProject.description}
      </BigText>

      <Text
        color="secondary"
        theme={theme}
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center ${
          theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
        } p-1 rounded-lg`}
      >
        {currentProject.api_path}
      </Text>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {currentProject.members.length} members
      </SmallText>

      {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
        <div className="w-full">
          <Separator smaller />
          <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col">
            <LinkerButton
              theme={theme}
              className="p-2 rounded-lg uppercase w-full"
              smaller
              transparent
              condition
              title="Update Project ID"
              icon="arrow-right-s"
              noFill
              reverseIcon
              click={() => {
                setEditingProject('ID');
              }}
            />
            <LinkerButton
              theme={theme}
              className="p-2 rounded-lg uppercase w-full"
              smaller
              transparent
              condition
              title="Update Project Name"
              icon="arrow-right-s"
              noFill
              reverseIcon
              click={() => {
                setEditingProject('Name');
              }}
            />
            <LinkerButton
              theme={theme}
              className="p-2 rounded-lg uppercase w-full lg:mt-0"
              smaller
              transparent
              condition
              title="Update Project Description"
              icon="arrow-right-s"
              noFill
              reverseIcon
              click={() => {
                setEditingProject('Description');
              }}
            />
            <LinkerButton
              theme={theme}
              className="p-2 rounded-lg uppercase w-full lg:mt-0"
              smaller
              transparent
              condition
              title="Update Project API Path"
              icon="arrow-right-s"
              noFill
              reverseIcon
              click={() => {
                setEditingProject('API Path');
              }}
            />
          </div>
        </div>
      )}

      <Separator />

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
            setMembers(currentProject.members);
            setProjectID(currentProject.id);
            setName(currentProject.name);
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
              setMembers(currentProject.members);
              setProjectID(currentProject.id);
              setName(currentProject.name);
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
              setMembers(currentProject.members);
              setProjectID(currentProject.id);
              setName(currentProject.name);
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
              setProjectID(currentProject.id);
              setName(currentProject.name);
            }}
          />
        )}
      </div>
    </div>
  );
}
