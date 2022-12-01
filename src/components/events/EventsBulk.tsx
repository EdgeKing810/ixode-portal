import React from 'react';
import { IEvent } from '../../stores/useEventStore';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function EventsBulk({
  events,
  filter,
  setFilter,
  setCurrentPage,
  limit,
}: {
  events: Array<IEvent>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}) {
  return (
    <div className="w-full">
      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {events && events.length > 0 && (
        <Input
          title="Filter Events"
          placeholder="Filter Events..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {events && events.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            events
              ? events.filter(
                  (e) =>
                    filter.length <= 0 ||
                    e.description
                      // @ts-ignore
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
            // @ts-ignore
            e.description.toLowerCase().includes(filter.trim().toLowerCase()) ||
            e.event_type.toLowerCase().includes(filter.trim().toLowerCase()) ||
            e.redirect.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no event match the filter.</SubHeading>}
    </div>
  );
}
