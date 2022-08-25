import React from 'react';

import IncludeDeleteData from '../../pages/includes/data/IncludeDeleteData';
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
