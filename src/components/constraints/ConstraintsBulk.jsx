import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function ConstraintsBulk({
  constraints,
  filter,
  setFilter,
  setCurrentPage,
  limit,
}) {
  return (
    <div className="w-full">
      {constraints && constraints.length > 0 && (
        <Input
          title="Filter Constraints"
          placeholder="Filter Constraints..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {constraints && constraints.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            constraints
              ? constraints.filter(
                  (c) =>
                    filter.length <= 0 ||
                    c.component_name
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-4 lg:mb-2"
        />
      )}

      {constraints &&
        constraints.length > 0 &&
        filter.length > 0 &&
        !constraints.find((c) =>
          c.component_name.toLowerCase().includes(filter.trim().toLowerCase())
        ) && (
          <SubHeading color="error">no constraint match the filter.</SubHeading>
        )}
    </div>
  );
}
