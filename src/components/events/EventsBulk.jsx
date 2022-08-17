import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, Separator, SubHeading } from '../Components';

export default function EventsBulk({
  events,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  theme,
}) {
  return (
    <div className="w-full">
      <Separator />

      {events && events.length > 0 && (
        <Input
          title="Filter Events"
          placeholder="Filter Events..."
          value={filter}
          theme={theme}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {events && events.length > 0 && (
        <PaginationList
          theme={theme}
          limit={limit}
          amount={
            events
              ? events.filter(
                  (e) =>
                    filter.length <= 0 ||
                    e.description
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    e.event_type
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase()) ||
                    e.redirect
                      .toLowerCase()
                      .includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-4 lg:mb-2"
        />
      )}

      {events &&
        events.length > 0 &&
        filter.length > 0 &&
        !events.find(
          (e) =>
            filter.length <= 0 ||
            e.description.toLowerCase().includes(filter.trim().toLowerCase()) ||
            e.event_type.toLowerCase().includes(filter.trim().toLowerCase()) ||
            e.redirect.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no event match the filter.</SubHeading>}
    </div>
  );
}
