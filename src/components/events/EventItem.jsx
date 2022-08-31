import React from 'react';
import { Link } from 'react-router-dom';

import { BigText, Text } from '../Components';

export default function EventItem({ event }) {

  return (
    <Link
      key={`evl-${event.id}`}
      className="text-center p-3 rounded-lg w-full flex-col mt-2 text-lg border-2 flex border-transparent hover:opacity-65 focus:opacity-65 text-base-content bg-base-200 font-noto ease-in-out duration-300"
      to={event.redirect}
      title={event.type}
    >
      <BigText
        color="primary"
        nobreak
        className="w-full text-left uppercase flex items-center font-semibold mb-2"
      >
        <span className={`ri-${event.icons[0]}-line mr-2`} />{' '}
        {event.event_type}{' '}
        <span className={`ri-${event.icons[1]}-line ml-2`} />
      </BigText>

      <Text
        nobreak
        className={`w-full p-2 bg-base-300 rounded-lg overflow-hidden text-left`}
      >
        {event.description.map((d, i) => {
          if (d.kind === 'normal') {
            return <span key={`evld-${event.id}-${i}`}>{d.data}</span>;
          } else {
            return (
              <span key={`evld-${event.id}-${i}`} className="text-primary">
                {d.kind === 'redirect' ? (
                  <Link className="hover:underline" to={d.redirect}>
                    {d.data}
                  </Link>
                ) : (
                  d.data
                )}
              </span>
            );
          }
        })}
      </Text>

      <Text
        nobreak
        className={`w-full p-1 mt-1 rounded-lg bg-base-300 overflow-hidden text-left`}
      >
        {event.timestamp}
      </Text>
    </Link>
  );
}
