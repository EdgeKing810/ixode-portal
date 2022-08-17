import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useEventStore = create(
  combine(
    {
      events: [],
    },
    (set) => ({
      setEvents: (value) => set({ events: value }),

      addEvent: (id, event_type, description, timestamp, redirect) =>
        set((state) => {
          let updatedEvents = [...state.events];
          return {
            events: [
              ...updatedEvents,
              { id, event_type, description, timestamp, redirect },
            ],
          };
        }),

      updateEvent: (id, event_type, description, timestamp, redirect) =>
        set((state) => {
          let updatedEvents = [...state.events];
          let found = false;
          updatedEvents = updatedEvents.map((e) => {
            let updatedEvent = { ...e };
            if (e.id === id) {
              updatedEvent = {
                id,
                event_type,
                description,
                timestamp,
                redirect,
              };
              found = true;
            }
            return updatedEvent;
          });
          if (found) {
            return { events: [...updatedEvents] };
          } else {
            return {
              events: [
                ...updatedEvents,
                { id, event_type, description, timestamp, redirect },
              ],
            };
          }
        }),

      removeEvent: (id) =>
        set((state) => {
          return {
            events: [...state.events.filter((e) => e.id !== id)],
          };
        }),
    })
  )
);
