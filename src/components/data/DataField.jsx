import React from 'react';

import { ALinkTo, SmallText } from '../Components';
import { submitPublishData } from './data.utils';

export default function DataField({
  API_URL,
  data,
  setCurrentData,
  project_id,
  collection_id,
  setDataID,
  setDeletingData,
  navigate,
  profile,
  alert,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={data.id}
    >
      <SmallText
        color="primary"
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
        nobreak
        className={`w-full mt-2 overflow-hidden lg:flex lg:flex-col lg:justify-center uppercase`}
      >
        {data.pairs.length} pairs
      </SmallText>

      <div
        className={`pt-1 w-full ${
          data.published ? 'bg-success' : 'bg-warning'
        } my-2 rounded-lg`}
      />

      {profile && profile.role !== 'VIEWER' && (
        <div className="w-full flex lg:mt-2">
          <button
            className="btn btn-warning btn-outline btn-sm btn-circle mr-2"
            title="Edit Data"
            onClick={() => {
              navigate(
                `/data/p/${project_id}/c/${collection_id}/d/e/${data.id}`
              );
            }}
          >
            <i className={`ri-pencil-line`} />
          </button>

          <button
            className="btn btn-error btn-outline btn-sm btn-circle mr-2"
            title="Delete Data"
            onClick={() => {
              setDeletingData(true);
              setDataID(data.id);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>

          <button
            className={`btn ${
              data.published ? 'btn-warning' : 'btn-success'
            } btn-outline btn-sm btn-circle`}
            title={`${data.published ? 'Unpublish' : 'Publish'} Data`}
            onClick={() => {
              submitPublishData(
                API_URL,
                profile,
                project_id,
                collection_id,
                data.id,
                setCurrentData,
                !data.published,
                alert
              );
            }}
          >
            <i
              className={`ri-${
                data.published ? 'flag-2' : 'send-plane-2'
              }-line`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
