import React from 'react';

import {
  FullAbsoluteContainer,
  SmallText,
  SubHeading,
  Text,
} from '../../../components/Components';
import { IProfile } from '../../../stores/useProfileStore';
import PaginationList from '../../../wrappers/PaginationList';

export default function IncludeDeleteMembers({
  showMembers,
  setShowMembers,
  name,
  members,
  limit,
  currentPage,
  setCurrentPage,
  submitRemoveMember,
}:{
  showMembers: boolean;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  members: Array<IProfile>;
  limit: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  submitRemoveMember: (member_id: string) => void;
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        showMembers ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setShowMembers(false)}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center mb-2">
        <SubHeading color="primary" smallerOnMobile nobreak>
          Remove members from <span className="text-base-content">{name}</span>
        </SubHeading>

        <button
          className="btn ml-3 btn-primary btn-outline btn-sm btn-square"
          onClick={() => setShowMembers(false)}
        >
          <i className={`ri-close-line`} />
        </button>
      </div>

      <div className="w-full lg:w-1/2 h-full">
        {showMembers &&
          members
            .slice(currentPage * limit, currentPage * limit + limit)
            .map((m) => (
              <div
                key={`l-${m.id}`}
                className={`w-full flex items-center rounded-lg bg-base-200 mb-2 ease-in-out duration-300 border-primary border-2 lg:border-4`}
              >
                <div
                  className={`w-full flex p-2 items-center bg-base-200 rounded-lg`}
                >
                  <div className="w-full flex flex-col">
                    <Text
                      color="primary"
                      nobreak
                      className={`w-full text-left`}
                    >
                      {m.first_name} {m.last_name}
                    </Text>

                    <SmallText nobreak className={`w-full text-left lg:mt-2`}>
                      {m.username}
                    </SmallText>
                  </div>
                </div>
                <button
                  className="btn mx-2 btn-error btn-outline btn-sm btn-circle"
                  onClick={() => submitRemoveMember(m.id)}
                >
                  <i className={`ri-close-line`} />
                </button>
              </div>
            ))}

        {showMembers && members && members.length > 0 && (
          <PaginationList
            limit={limit}
            amount={members.length}
            setter={setCurrentPage}
          />
        )}

        {showMembers && (!members || members.length <= 0) && (
          <SubHeading smallerOnMobile color="error">
            no members in this project
          </SubHeading>
        )}
      </div>
    </FullAbsoluteContainer>
  );
}
