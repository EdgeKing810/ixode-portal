import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Button, Input, Separator, SubHeading } from '../Components';

export default function UsersBulk({
  allProfiles,
  setCreatingUser,
  setUsername,
  setRole,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  isLoading,
  theme,
}) {
  return (
    <div className="w-full">
      {((allProfiles && allProfiles.length > 0) || !isLoading) && (
        <Button
          color={theme === 'light' ? 'dark' : 'light'}
          theme={theme}
          className="p-3 w-full lg:w-1/3 justify-center uppercase"
          click={() => {
            setCreatingUser(true);
            setUsername('');
            setRole('VIEWER');
          }}
        >
          Add a new User
        </Button>
      )}

      <Separator />

      {allProfiles && allProfiles.length > 0 && (
        <Input
          title="Filter Users"
          placeholder="Filter Users..."
          value={filter}
          theme={theme}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {allProfiles && allProfiles.length > 0 && (
        <PaginationList
          theme={theme}
          limit={limit}
          amount={
            allProfiles
              ? allProfiles.filter(
                  (ap) =>
                    filter.length <= 0 ||
                    ap.first_name
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    ap.last_name
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    ap.email
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    ap.username
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    ap.role.toLowerCase().includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-4 lg:mb-2"
        />
      )}

      {allProfiles &&
        allProfiles.length > 0 &&
        filter.length > 0 &&
        !allProfiles.find(
          (ap) =>
            ap.first_name.toLowerCase().includes(filter.trim().toLowerCase()) ||
            ap.last_name.toLowerCase().includes(filter.trim().toLowerCase()) ||
            ap.email.toLowerCase().includes(filter.trim().toLowerCase()) ||
            ap.username.toLowerCase().includes(filter.trim().toLowerCase()) ||
            ap.role.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no user match the filter.</SubHeading>}
    </div>
  );
}
