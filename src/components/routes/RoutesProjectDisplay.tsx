import React from 'react';
import { IProject } from '../../stores/useProjectStore';

import { BigText, Heading, SmallText, Text } from '../Components';

export default function RoutesProjectDisplay({
  currentProject,
  setShowMembers,
  setMembers,
  setName,
  setMemberCurrentPage,
}: {
  currentProject: IProject;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      <div className="w-full flex">
        <button
          className="btn btn-info btn-outline btn-sm btn-circle mr-2"
          title="View Members"
          onClick={() => {
            setShowMembers(true);
            setMembers(currentProject.members);
            setName(currentProject.name);
            setMemberCurrentPage(0);
          }}
        >
          <i className={`ri-user-line`} />
        </button>
      </div>
    </div>
  );
}
