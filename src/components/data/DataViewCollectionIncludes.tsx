import React from 'react';

import IncludeDeleteData from '../../pages/includes/data/IncludeDeleteData';
import { IProject } from '../../stores/useProjectStore';
import { IUserProfile } from '../../stores/useUserProfileStore';
import { IDataOriginal } from '../../utils/dataProcessor';
import { submitDeleteData } from './data.utils';

export default function DataViewCollectionIncludes({
  API_URL,
  profile,
  currentProject,
  setCurrentData,
  collectionID,
  dataID,
  setDataID,
  deletingData,
  setDeletingData,
  alert,
}: {
  API_URL: string;
  profile: IUserProfile;
  currentProject: IProject;
  setCurrentData: null | React.Dispatch<
    React.SetStateAction<Array<IDataOriginal>>
  >;
  collectionID: string;
  dataID: string;
  setDataID: React.Dispatch<React.SetStateAction<string>>;
  deletingData: boolean;
  setDeletingData: React.Dispatch<React.SetStateAction<boolean>>;
  alert: any;
}) {
  return (
    <div className="w-full">
      <IncludeDeleteData
        isActive={deletingData}
        setIsActive={setDeletingData}
        submitDeleteData={() =>
          submitDeleteData(
            API_URL,
            profile,
            currentProject,
            collectionID,
            dataID,
            setDataID,
            setDeletingData,
            setCurrentData,
            alert
          )
        }
        name={dataID}
      />
    </div>
  );
}
