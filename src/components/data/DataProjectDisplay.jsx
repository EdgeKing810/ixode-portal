import React from 'react';

import {
  BigText,
  Heading,
  IconButton,
  Separator,
  SmallText,
  Text,
} from '../Components';

export default function DataProjectDisplay({
  currentProject,
  setShowMembers,
  setMembers,
  setName,
  setMemberCurrentPage,
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
            setName(currentProject.name);
            setMemberCurrentPage(0);
          }}
        />
      </div>
    </div>
  );
}
