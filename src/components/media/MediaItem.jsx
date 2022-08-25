import React from 'react';

export default function MediaItem({
  PUBLIC_URL,
  media,
  profile,
  setID,
  setName,
  setViewingMedia,
  setDeletingMedia,
  alert,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-4 p-2 flex flex-col bg-base-200 duration-300 border-4 border-transparent hover:border-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={media.id}
    >
      <button
        className="lg:p-3 w-full justify-center border-4 border-transparent rounded-lg hover:border-info focus:border-info"
        onClick={() => {
          setViewingMedia(true);
          setID(media.id);
          setName(media.name);
        }}
      >
        <img
          src={`${PUBLIC_URL}/${media.name}`}
          alt={media.name}
          className="lg:h-40 h-36 w-full flex justify-center items-center object-scale-down"
        />
      </button>

      <div className={`pt-1 w-full bg-accent my-2 rounded-lg opacity-25`} />

      <div className="w-full flex">
        <button
          className="btn btn-info btn-outline btn-sm btn-circle mr-2"
          title="Copy link to Media"
          onClick={() => {
            navigator.clipboard.writeText(`${PUBLIC_URL}/${media.name}`);
            alert.info('Link Copied');
          }}
        >
          <i className={`ri-link -line`} />
        </button>

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <button
            className="btn btn-error btn-outline btn-sm btn-circle"
            title="Delete Media"
            onClick={() => {
              setDeletingMedia(true);
              setID(media.id);
              setName(media.name);
            }}
          >
            <i className={`ri-delete-bin-2-line`} />
          </button>
        )}
      </div>
    </div>
  );
}
