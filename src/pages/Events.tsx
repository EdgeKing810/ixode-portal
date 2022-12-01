import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useEventStore } from '../stores/useEventStore';
import { useProfileStore } from '../stores/useProfileStore';
import { useProjectStore } from '../stores/useProjectStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import EventItem from '../components/events/EventItem';
import EventsBulk from '../components/events/EventsBulk';

import { processEvent } from '../utils/processEvent';

export default function Events() {
  const { profile } = useUserProfileStore((state) => state);
  const { events } = useEventStore((state) => state);
  const { profiles } = useProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const limit = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const alert = useAlert();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(events && events.length > 0));

    if (
      profile &&
      profile.role.toUpperCase() !== 'ROOT' &&
      profile.role.toUpperCase() !== 'ADMIN'
    ) {
      alert.error('Not authorized to view Events');
      navigate('/home');
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="events" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="events" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!events || events.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Events Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            <EventsBulk
              events={events}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
            />

            {events
              .filter(
                (e) =>
                  filter.length <= 0 ||
                  e.description
                    // @ts-ignore
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  e.event_type
                    .toLowerCase()
                    .includes(filter.trim().toLowerCase()) ||
                  e.redirect.toLowerCase().includes(filter.trim().toLowerCase())
              )
              .reverse()
              .slice(currentPage * limit, limit + currentPage * limit)
              .map((e) => (
                <EventItem
                  key={`el-${e.id}`}
                  event={processEvent(e, profiles, projects)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
