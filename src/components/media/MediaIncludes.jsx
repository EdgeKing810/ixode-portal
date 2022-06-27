import React from 'react';

import IncludeViewMedia from '../../pages/includes/media/IncludeViewMedia';
import IncludeDeleteMedia from '../../pages/includes/media/IncludeDeleteMedia';

import { submitDeleteMedia } from './media.utils';

export default function MediaIncludes({
  API_URL,
  PUBLIC_URL,
  profile,
  id,
  setID,
  name,
  setName,
  media,
  addMedia,
  viewingMedia,
  setViewingMedia,
  editingMedia,
  setEditingMedia,
  updateMedia,
  deletingMedia,
  setDeletingMedia,
  removeMedia,
  theme,
  alert,
}) {
  return (
    <div className="w-full">
      <IncludeViewMedia
        isActive={viewingMedia}
        setIsActive={setViewingMedia}
        name={name}
        url={`${PUBLIC_URL}/${name}`}
        theme={theme}
      />

      <IncludeDeleteMedia
        isActive={deletingMedia}
        setIsActive={setDeletingMedia}
        id={id}
        name={name}
        url={`${PUBLIC_URL}/${name}`}
        nextCallback={() =>
          submitDeleteMedia(
            API_URL,
            profile,
            id,
            setID,
            setName,
            setDeletingMedia,
            removeMedia,
            alert
          )
        }
        theme={theme}
      />
    </div>
  );
}
