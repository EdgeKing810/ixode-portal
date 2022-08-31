import { fetchData } from "./data";

export const processEvent = (e, profiles, projects) => {
    const eventData = fetchData().events;

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
        let tmpIndex = textToSplit.slice(0, i+1).filter(tts => tts === textToSplit[i]).length - 1;
      let spl = event.description.split(`<${textToSplit[i]}>`)[tmpIndex];

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
        let id = splf[1];

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
        let tmpSpl = event.description.split(
            `<${textToSplit[textToSplit.length - 1]}>`
          );

      finalDescription.push({
        kind: 'normal',
        data: tmpSpl[tmpSpl.length - 1],
      });
    }

    event.description = [...finalDescription];

    return event;
  };