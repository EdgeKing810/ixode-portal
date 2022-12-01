import React from 'react';
import { IMedia } from '../../stores/useMediaStore';
import { handleImage } from '../../utils/handleImage';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function MediaBulk({
  API_URL,
  PUBLIC_URL,
  alert,
  addMedia,
  media,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  isLoading,
}: {
  API_URL: string;
  PUBLIC_URL: string;
  alert: any;
  addMedia: (id: string, name: string) => void;
  media: Array<IMedia>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  isLoading: boolean;
}) {
  return (
    <div className="w-full">
      {((media && media.length > 0) || !isLoading) && (
        <button
          className="btn btn-primary btn-outline gap-2 mt-2 lg:mt-0 w-full lg:w-1/3"
          title="Upload"
          onClick={() =>
            handleImage(
              alert,
              API_URL,
              PUBLIC_URL,
              // @ts-ignore
              (i) => (i ? addMedia(i[1], i[0]) : null),
              true,
              false
            )
          }
        >
          Upload
        </button>
      )}

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {media && media.length > 0 && (
        <Input
          title="Filter Medias"
          placeholder="Filter Medias..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {media && media.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            media
              ? media.filter(
                  (m) =>
                    filter.length <= 0 ||
                    m.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                    m.name.toLowerCase().includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-4 lg:mb-2"
        />
      )}

      {media &&
        media.length > 0 &&
        filter.length > 0 &&
        !media.find(
          (m) =>
            m.id.toLowerCase().includes(filter.trim().toLowerCase()) &&
            m.name.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no media match the filter.</SubHeading>}
    </div>
  );
}
