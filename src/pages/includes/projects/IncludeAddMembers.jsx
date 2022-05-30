import React from 'react';

import {
  Button,
  FullAbsoluteContainer,
  IconButton,
  SmallText,
  SubHeading,
  Text,
} from '../../../components/Components';
import PaginationList from '../../../wrappers/PaginationList';

export default function IncludeAddMembers({
  showMembers,
  setShowMembers,
  name,
  members,
  limit,
  currentPage,
  setCurrentPage,
  submitAddMember,
  theme,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:pt-0 ${
        showMembers ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setShowMembers(false)}
      theme={theme}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center mb-2">
        <SubHeading color="primary" smallerOnMobile nobreak>
          Add users to{' '}
          <span
            className={theme === 'light' ? 'text-main-dark' : 'text-main-light'}
          >
            {name}
          </span>
        </SubHeading>

        <IconButton
          click={() => setShowMembers(false)}
          condition
          icon="close"
          noFill
          className="ml-3 px-2 rounded-lg bg-transparent"
        />
      </div>

      <div className="w-full lg:w-1/2 h-full">
        {showMembers &&
          members
            .slice(currentPage * limit, currentPage * limit + limit)
            .map((m) => (
              <div
                key={`l-${m.id}`}
                className={`w-full flex items-center rounded-lg items-center ${
                  theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
                } mb-2 ease-in-out duration-400`}
              >
                <Button
                  className={`w-full flex p-2 flex items-center`}
                  theme={theme}
                >
                  <div className="w-full flex flex-col">
                    <Text
                      color="primary"
                      theme={theme}
                      nobreak
                      className={`w-full text-left`}
                    >
                      {m.first_name} {m.last_name}
                    </Text>

                    <SmallText
                      color={theme === 'light' ? 'dark' : 'light'}
                      theme={theme}
                      nobreak
                      className={`w-full text-left lg:mt-2`}
                    >
                      {m.username}
                    </SmallText>
                  </div>
                </Button>
                <IconButton
                  theme={theme}
                  click={() => submitAddMember(m.id)}
                  icon="add"
                  className="mx-2 p-2 rounded-full w-10 h-10"
                  condition
                  noFill
                />
              </div>
            ))}

        {showMembers && members && members.length > 0 && (
          <PaginationList
            theme={theme}
            limit={limit}
            amount={members.length}
            setter={setCurrentPage}
          />
        )}

        {showMembers && (!members || members.length <= 0) && (
          <SubHeading smallerOnMobile color="error">
            all users are members of this project
          </SubHeading>
        )}
      </div>
    </FullAbsoluteContainer>
  );
}
