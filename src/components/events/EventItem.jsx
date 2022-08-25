import React from 'react';
import { Link } from 'react-router-dom';

import { fetchData } from '../../utils/data';
import { BigText, LinkerChildren, Text } from '../Components';

import { useProfileStore } from '../../stores/useProfileStore';
import { useProjectStore } from '../../stores/useProjectStore';

export default function EventItem({ event, theme }) {
  const eventData = fetchData().events;

  const { profiles } = useProfileStore((state) => state);
  const { projects } = useProjectStore((state) => state);

  const processEvent = (e) => {
    let event = { ...e };

    event.timestamp = new Date(event.timestamp);
    event.timestamp = event.timestamp.toLocaleString();
    event.redirect = event.redirect ? event.redirect : '/';

    event.icons = eventData
      .find((ed) => ed.type === event.event_type)
      .logo.split(';');

    let originalDescription = event.description;
    let odUsers = originalDescription
      .split('usr[')
      .filter((odu) => odu.includes(']'))
      .map((odu) => odu.split(']')[0]);
    let odUsersFinal = odUsers.map((odu) => {
      let user = profiles.find((p) => p.id === odu);
      return user ? user.username : odu;
    });

    for (let i = 0; i < odUsers.length; i++) {
      event.description = event.description
        .split(`usr[${odUsers[i]}]`)
        .join(`<u.${odUsersFinal[i]}>`);
    }

    let odProjects = originalDescription
      .split('pro[')
      .filter((odp) => odp.includes(']'))
      .map((odp) => odp.split(']')[0]);
    let odProjectsFinal = odProjects.map((odp) => {
      let project = projects.find((p) => p.id === odp);
      return project ? project.name : odp;
    });

    for (let i = 0; i < odProjects.length; i++) {
      event.description = event.description
        .split(`pro[${odProjects[i]}]`)
        .join(`<p.${odProjectsFinal[i]}>`);
    }

    let odCollections = originalDescription
      .split('col[')
      .filter((odc) => odc.includes(']'))
      .map((odc) => odc.split(']')[0]);
    // let odCollectionsFinal = odCollections.map(odc => {
    //     let collection = collections.find(c => c.id === odc);
    //     return collection ? collection.name : odc;
    // })

    for (let i = 0; i < odCollections.length; i++) {
      event.description = event.description
        .split(`col[${odCollections[i]}]`)
        .join(`<c.${odCollections[i]}>`);
    }

    let textToSplit = event.description
      .split('<')
      .filter((x) => x.includes('>'))
      .map((x) => x.split('>')[0]);
    let finalDescription = [];

    for (let i = 0; i < textToSplit.length; i++) {
      let spl = event.description.split(`<${textToSplit[i]}>`)[0];
      if (spl.includes('>')) {
        let tmp = spl.split('>');
        finalDescription.push({
          kind: 'normal',
          data: tmp[tmp.length - 1],
        });
      } else {
        finalDescription.push({
          kind: 'normal',
          data: spl,
        });
      }

      let splf = textToSplit[i].split('.');
      if (splf.length > 1) {
        // let t = splf[0];
        let id = splf[1];

        // if (t === "u") {
        //     finalDescription.push({
        //         kind: 'redirect',
        //         data: id,
        //         redirect: `/users`
        //     });
        // } else if (t === "p") {
        //     let project = projects.find(p => p.id === id || p.name === id);

        //     finalDescription.push({
        //         kind: 'redirect',
        //         data: id,
        //         redirect: `/project/${project ? project.id : textToSplit[i]}`
        //     });
        // } else {
        //     finalDescription.push({
        //         kind: 'special',
        //         data: id,
        //     });
        // }

        finalDescription.push({
          kind: 'special',
          data: id,
        });
      } else {
        finalDescription.push({
          kind: 'special',
          data: textToSplit[i],
        });
      }
    }

    if (textToSplit.length < 0) {
      finalDescription.push({
        kind: 'normal',
        data: event.description,
      });
    } else {
      finalDescription.push({
        kind: 'normal',
        data: event.description.split(
          `<${textToSplit[textToSplit.length - 1]}>`
        )[1],
      });
    }

    event.description = [...finalDescription];

    return event;
  };

  const currentEvent = processEvent(event);

  return (
    <LinkerChildren
      key={`evl-${event.id}`}
      theme={theme}
      className="p-3 rounded-lg w-full flex-col"
      color={theme}
      to={event.redirect}
      condition={true}
      title={event.type}
    >
      <BigText
        color="primary"
        theme={theme}
        nobreak
        className="w-full text-left uppercase flex items-center font-semibold"
      >
        <span className={`ri-${currentEvent.icons[0]}-line mr-2`} />{' '}
        {currentEvent.event_type}{' '}
        <span className={`ri-${currentEvent.icons[1]}-line ml-2`} />
      </BigText>

      <Text
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full p-1 ${
          theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
        } overflow-hidden text-left`}
      >
        {currentEvent.description.map((d) => {
          if (d.kind === 'normal') {
            return <span key={`evl-${event.id}-${d.data}`}>{d.data}</span>;
          } else {
            return (
              <span
                key={`evl-${event.id}-${d.data}`}
                className="text-main-primary"
              >
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
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full p-1 ${
          theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
        } overflow-hidden text-left`}
      >
        {currentEvent.timestamp}
      </Text>
    </LinkerChildren>
  );
}
