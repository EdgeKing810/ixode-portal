import create from 'zustand';

export interface ISpecialEvent {
  kind: string;
  data: string;
}

export interface IEvent {
  id: string;
  event_type: string;
  description: string | Array<ISpecialEvent>;
  timestamp: string;
  redirect: string;
  icons: Array<string>;
}

export interface EventStore {
  events: Array<IEvent>;
  setEvents: (value: Array<IEvent>) => void;
  addEvent: (
    id: string,
    event_type: string,
    description: string,
    timestamp: string,
    redirect: string
  ) => void;
  updateEvent: (
    id: string,
    event_type: string,
    description: string,
    timestamp: string,
    redirect: string
  ) => void;
  removeEvent: (id: string) => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],

  setEvents: (value: Array<IEvent>) => {
    set({ events: value });
  },

  addEvent: (
    id: string,
    event_type: string,
    description: string,
    timestamp: string,
    redirect: string
  ) => {
    let updatedEvents = [
      ...get().events,
      { id, event_type, description, timestamp, redirect, icons: [] },
    ];
    set({ events: updatedEvents });
  },

  updateEvent: (
    id: string,
    event_type: string,
    description: string,
    timestamp: string,
    redirect: string
  ) => {
    let updatedEvents = [...get().events];
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
          icons: [],
        };
        found = true;
      }
      return updatedEvent;
    });
    if (found) {
      set({ events: [...updatedEvents] });
    } else {
      set({
        events: [
          ...updatedEvents,
          { id, event_type, description, timestamp, redirect, icons: [] },
        ],
      });
    }
  },

  removeEvent: (id: string) => {
    let updatedEvents = get().events.filter((e) => e.id !== id);
    set({ events: updatedEvents });
  },
}));
