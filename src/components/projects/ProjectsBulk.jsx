import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function ProjectsBulk({
  profile,
  projects,
  setCreatingProject,
  setProjectID,
  setName,
  setDescription,
  setApiPath,
  setMembers,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  isLoading,
}) {
  return (
    <div className="w-full">
      {profile &&
        ['ROOT', 'ADMIN'].includes(profile.role) &&
        ((projects && projects.length > 0) || !isLoading) && (
          <button
            className="btn btn-primary btn-outline gap-2 w-full lg:w-1/3"
            title="Create a new Project"
            onClick={() => {
              setCreatingProject(true);
              setProjectID('');
              setName('');
              setDescription('');
              setApiPath('');
              setMembers([]);
            }}
          >
            Create a new Project
          </button>
        )}

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {projects && projects.length > 0 && (
        <Input
          title="Filter Projects"
          placeholder="Filter Projects..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {projects && projects.length > 0 && (
        <PaginationList
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
