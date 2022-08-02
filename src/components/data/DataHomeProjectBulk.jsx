import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function DataHomeProjectBulk({
  projects,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  theme,
}) {
  return (
    <div className="w-full">
      {/* {profile &&
        ['ROOT', 'ADMIN'].includes(profile.role) &&
        ((projects && projects.length > 0) || !isLoading) && (
          <Button
            color="dark"
            bgcolor="primary"
            theme={theme}
            className="p-3 w-full lg:w-1/3 justify-center uppercase font-bold"
            click={() => navigate('/projects')}
          >
            Create a new Project
          </Button>
        )}

      <Separator /> */}

      {projects && projects.length > 0 && (
        <Input
          title="Filter Projects"
          placeholder="Filter Projects..."
          value={filter}
          theme={theme}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {projects && projects.length > 0 && (
        <PaginationList
          theme={theme}
          limit={limit}
          amount={
            projects
              ? projects.filter(
                  (p) =>
                    filter.length <= 0 ||
                    p.name
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    p.description
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    p.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                    p.api_path
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-2 lg:mb-4"
        />
      )}

      {projects &&
        projects.length > 0 &&
        filter.length > 0 &&
        !projects.find(
          (p) =>
            filter.length <= 0 ||
            p.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
            p.description.toLowerCase().includes(filter.trim().toLowerCase()) ||
            p.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
            p.api_path.toLowerCase().includes(filter.trim().toLowerCase())
        ) && (
          <SubHeading color="error">no project match the filter.</SubHeading>
        )}
    </div>
  );
}
