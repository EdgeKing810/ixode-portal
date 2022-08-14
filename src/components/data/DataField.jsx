import React from 'react';

import { ALinkTo, IconButton, Separator, SmallText } from '../Components';
import { submitPublishData } from './data.utils';

export default function DataField({
  API_URL,
  data,
  setCurrentData,
  project_id,
  collection_id,
  setDataID,
  setDeletingData,
  theme,
  navigate,
  profile,
  alert,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={data.id}
    >
      <SmallText
        color="primary"
        theme={theme}
        nobreak
        className="w-full lg:flex lg:flex-col lg:justify-center uppercase"
      >
        <ALinkTo
          noopacity
          to={`/data/p/${project_id}/c/${collection_id}/d/v/${data.id}`}
          color="primary"
        >
          {data.id}
        </ALinkTo>
      </SmallText>

      <SmallText
        color={theme === 'light' ? 'dark' : 'light'}
        theme={theme}
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {data.pairs.length} pairs
      </SmallText>

      <Separator
        smaller
        color={data.published ? 'success' : 'warning'}
        opaque
      />

      {profile && profile.role !== 'VIEWER' && (
        <div className="w-full flex">
          <IconButton
            title="Edit Data"
            condition
            noFill
            theme={theme}
            icon="pencil"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() =>
              navigate(
                `/data/p/${project_id}/c/${collection_id}/d/e/${data.id}`
              )
            }
          />

          <IconButton
            title="Delete Data"
            condition
            noFill
            theme={theme}
            icon="delete-bin-2"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setDeletingData(true);
              setDataID(data.id);
            }}
          />

          <IconButton
            title={`${data.published ? 'Unpublish' : 'Publish'} Data`}
            condition
            noFill
            theme={theme}
            icon={data.published ? 'flag-2' : 'send-plane-2'}
            className="p-2 rounded-full w-10 h-10"
            color="primary"
            click={() =>
              submitPublishData(
                API_URL,
                profile,
                project_id,
                collection_id,
                data.id,
                setCurrentData,
                !data.published,
                alert
              )
            }
          />
        </div>
      )}
    </div>
  );
}
