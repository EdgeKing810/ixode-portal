import React from 'react';

import { ALinkTo, BigText, IconButton, Separator, Text } from '../Components';

export default function DataHomeProjectItem({
  project,
  setShowMembers,
  setMembers,
  setName,
  setMemberCurrentPage,
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
        <ALinkTo noopacity to={`/data/p/${project.id}`} color="primary">
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
            setName(project.name);
            setMemberCurrentPage(0);
          }}
        />
      </div>
    </div>
  );
}
