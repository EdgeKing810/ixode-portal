import React from 'react';
import { IProject } from '../../stores/useProjectStore';

import { ALinkTo, BigText, Text } from '../Components';

export default function DataHomeProjectItem({
  project,
  setShowMembers,
  setMembers,
  setName,
  setMemberCurrentPage,
}: {
  project: IProject;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<Array<string>>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setMemberCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2`}
      key={project.id}
    >
      <BigText
        color="primary"
        // nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        <ALinkTo noopacity to={`/data/p/${project.id}`} color="primary">
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
        color="secondary"
        nobreak
        className={`w-full overflow-hidden lg:flex lg:flex-col lg:justify-center bg-base-300 p-1 rounded-lg`}
      >
        {project.api_path}
      </Text>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <div className="w-full flex lg:mt-2">
        <button
          className="btn btn-info btn-outline btn-sm btn-circle mr-2"
          title="View Members"
          onClick={() => {
            setShowMembers(true);
            setMembers(project.members);
            setName(project.name);
            setMemberCurrentPage(0);
          }}
        >
          <i className={`ri-user-line`} />
        </button>
      </div>
    </div>
  );
}
