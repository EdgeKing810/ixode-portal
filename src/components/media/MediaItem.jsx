import React from 'react';

import { Button, IconButton, Image, Separator } from '../Components';

export default function MediaItem({
  PUBLIC_URL,
  media,
  profile,
  theme,
  id,
  setID,
  name,
  setName,
  setViewingMedia,
  setEditingMedia,
  setDeletingMedia,
  alert,
}) {
  return (
    <div
      className={`w-full rounded-lg lg:p-2 p-2 flex flex-col ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } duration-400 border-2 border-transparent hover:border-main-primary bg-opacity-50 border-opacity-50 mb-2 lg:mb-0`}
      key={media.id}
    >
      <Button
        theme={theme}
        className="lg:p-3 w-full justify-center"
        color="info"
        transparent
        click={() => {
          setViewingMedia(true);
          setID(media.id);
          setName(media.name);
        }}
      >
        <Image
          src={`${PUBLIC_URL}/${media.name}`}
          alt={media.name}
          className="lg:h-40 h-36 w-full object-scale-down"
          noRounded
          noFillnn
        />
      </Button>

      <Separator smaller />

      <div className="w-full flex">
        <IconButton
          title="Copy link to Media"
          condition
          noFill
          theme={theme}
          icon="link "
          className="p-2 rounded-full w-10 h-10 mr-2"
          color="primary"
          click={() => {
            navigator.clipboard.writeText(`${PUBLIC_URL}/${media.name}`);
            alert.info('Link Copied');
          }}
        />

        {/* {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Edit Media"
            condition
            noFill
            theme={theme}
            icon="pencil"
            className="p-2 rounded-full w-10 h-10 mr-2"
            color="primary"
            click={() => {
              setEditingMedia(true);
              setID(media.id);
              setName(media.name);
            }}
          />
        )} */}

        {profile.role && ['ROOT', 'ADMIN'].includes(profile.role) && (
          <IconButton
            title="Delete Media"
            condition
            noFill
            theme={theme}
            icon="delete-bin-2"
            className="p-2 rounded-full w-10 h-10"
            color="primary"
            click={() => {
              setDeletingMedia(true);
              setID(media.id);
              setName(media.name);
            }}
          />
        )}
      </div>
    </div>
  );
}
