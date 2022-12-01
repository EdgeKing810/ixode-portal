import React from 'react';

import IncludeViewMedia from '../../pages/includes/media/IncludeViewMedia';
import IncludeDeleteMedia from '../../pages/includes/media/IncludeDeleteMedia';

import { submitDeleteMedia } from './media.utils';
import { IUserProfile } from '../../stores/useUserProfileStore';

export default function MediaIncludes({
  API_URL,
  PUBLIC_URL,
  profile,
  id,
  setID,
  name,
  setName,
  viewingMedia,
  setViewingMedia,
  deletingMedia,
  setDeletingMedia,
  removeMedia,
  alert,
}: {
  API_URL: string;
  PUBLIC_URL: string;
  profile: IUserProfile;
  id: string;
  setID: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  viewingMedia: boolean;
  setViewingMedia: React.Dispatch<React.SetStateAction<boolean>>;
  deletingMedia: boolean;
  setDeletingMedia: React.Dispatch<React.SetStateAction<boolean>>;
  removeMedia: (id: string) => void;
  alert: any;
}) {
  return (
    <div className="w-full">
      <IncludeViewMedia
        isActive={viewingMedia}
        setIsActive={setViewingMedia}
        name={name}
        url={`${PUBLIC_URL}/${name}`}
      />

      <IncludeDeleteMedia
        isActive={deletingMedia}
        setIsActive={setDeletingMedia}
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
      />
    </div>
  );
}
