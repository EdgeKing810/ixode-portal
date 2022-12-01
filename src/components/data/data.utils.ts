import axios from 'axios';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
import {
  convertDataToRaw,
  IData,
  IDataOriginal,
} from '../../utils/dataProcessor';

export const submitCreateData = (
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  collectionID: string,
  allData: Array<IData>,
  alert: any,
  navigate: NavigateFunction
) => {
  alert.info('Submitting...');

  let rawPair = convertDataToRaw(allData);

  const data = {
    uid: profile.uid,
    project_id: projectID,
    collection_id: collectionID,
    raw_pair: rawPair,
  };

  axios
    .post(
      `${API_URL}/data/create`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Object Created!');

        navigate(`/data/p/${projectID}/c/${collectionID}`);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitUpdateData = (
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  collectionID: string,
  dataID: string,
  allData: Array<IData>,
  alert: any,
  navigate: NavigateFunction
) => {
  alert.info('Submitting...');

  let rawPair = convertDataToRaw(allData);

  const data = {
    uid: profile.uid,
    project_id: projectID,
    collection_id: collectionID,
    data_id: dataID,
    raw_pair: rawPair,
  };

  axios
    .patch(
      `${API_URL}/data/update`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Object Updated!');

        navigate(`/data/p/${projectID}/c/${collectionID}`);
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitDeleteData = (
  API_URL: string,
  profile: IUserProfile,
  currentProject: IProject,
  collectionID: string,
  dataID: string,
  setDataID: React.Dispatch<React.SetStateAction<string>>,
  setDeletingData: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentData: null | React.Dispatch<
    React.SetStateAction<Array<IDataOriginal>>
  >,
  alert: any
) => {
  axios
    .delete(
      `${API_URL}/data/delete?uid=${profile.uid}&data_id=${dataID}&project_id=${currentProject.id}&collection_id=${collectionID}`,
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        alert.success('Data Deleted!');

        setDeletingData(false);

        if (setCurrentData) {
          // @ts-ignore
          setCurrentData((prev) => prev.filter((d) => d.id !== dataID));
        }

        setDataID('');
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};

export const submitPublishData = (
  API_URL: string,
  profile: IUserProfile,
  projectID: string,
  collectionID: string,
  dataID: string,
  setCurrentData: React.Dispatch<React.SetStateAction<Array<IDataOriginal>>>,
  publishing: boolean,
  alert: any
) => {
  const data = {
    uid: profile.uid,
    data_id: dataID,
    project_id: projectID,
    collection_id: collectionID,
    publish: publishing,
  };

  if (publishing) {
    alert.info('Publishing...');
  } else {
    alert.info('Unpublishing...');
  }

  axios
    .patch(
      `${API_URL}/data/publish`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${profile.jwt}` },
      }
    )
    .then(async (res) => {
      if (res.data.status === 200) {
        if (publishing) {
          alert.success('Data Published!');
        } else {
          alert.success('Data Unpublished!');
        }

        setCurrentData((prev) =>
          prev.map((d) => {
            let update = { ...d };
            if (d.id === dataID) {
              update.published = publishing;
            }
            return update;
          })
        );
      } else {
        console.log(res.data);
        alert.error(res.data.message);
      }
    });
};
