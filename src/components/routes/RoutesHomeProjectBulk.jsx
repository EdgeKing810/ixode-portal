import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function RoutesHomeProjectBulk({
  projects,
  filter,
  setFilter,
  setCurrentPage,
  limit,
}) {
  return (
    <div className="w-full">
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
