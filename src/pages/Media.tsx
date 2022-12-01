import React, { useCallback, useContext, useEffect, useState } from 'react';
// @ts-ignore
import { useAlert } from 'react-alert';

import { useUserProfileStore } from '../stores/useUserProfileStore';
import { useMediaStore } from '../stores/useMediaStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import { Heading } from '../components/Components';

import { LocalContext } from '../wrappers/LocalContext';

import MediaItem from '../components/media/MediaItem';
import MediaBulk from '../components/media/MediaBulk';
import MediaIncludes from '../components/media/MediaIncludes';

export default function Media() {
  const { profile } = useUserProfileStore((state) => state);
  const { media, addMedia, removeMedia } = useMediaStore((state) => state);

  const limit = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('');

  const { API_URL, PUBLIC_URL } = useContext(LocalContext);
  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(true);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [viewingMedia, setViewingMedia] = useState(false);
  const [, setEditingMedia] = useState(false);
  const [deletingMedia, setDeletingMedia] = useState(false);

  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      setViewingMedia(false);
      setEditingMedia(false);
      setDeletingMedia(false);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    let timer = setTimeout(() => setIsLoading(false), 4000);
    setIsLoading(!(media && media.length > 0));

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="media" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="media" />
        <div className="w-full lg:p-8 flex flex-col h-full">
          <div className="w-full h-full lg:border-2 lg:border-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            {!media || media.length <= 0 ? (
              isLoading ? (
                <Heading className="blink">Loading...</Heading>
              ) : (
                <Heading color="error">No Media Found.</Heading>
              )
            ) : (
              <div></div>
            )}

            <MediaBulk
              API_URL={API_URL}
              PUBLIC_URL={PUBLIC_URL}
              alert={alert}
              addMedia={addMedia}
              media={media}
              filter={filter}
              setFilter={setFilter}
              setCurrentPage={setCurrentPage}
              limit={limit}
              isLoading={isLoading}
            />

            <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-4">
              {media
                .filter(
                  (m) =>
                    filter.length <= 0 ||
                    m.id.toLowerCase().includes(filter.trim().toLowerCase()) ||
                    m.name.toLowerCase().includes(filter.trim().toLowerCase())
                )
                .slice(currentPage * limit, limit + currentPage * limit)
                .map((m) => (
                  <MediaItem
                    PUBLIC_URL={PUBLIC_URL}
                    key={`ml-${m.name}`}
                    media={m}
                    profile={profile}
                    // id={id}
                    setID={setID}
                    // name={name}
                    setName={setName}
                    setViewingMedia={setViewingMedia}
                    // setEditingMedia={setEditingMedia}
                    setDeletingMedia={setDeletingMedia}
                    alert={alert}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <MediaIncludes
        API_URL={API_URL}
        PUBLIC_URL={PUBLIC_URL}
        profile={profile}
        id={id}
        setID={setID}
        name={name}
        setName={setName}
        // media={media}
        // addMedia={addMedia}
        viewingMedia={viewingMedia}
        setViewingMedia={setViewingMedia}
        // editingMedia={editingMedia}
        // setEditingMedia={setEditingMedia}
        // updateMedia={updateMedia}
        deletingMedia={deletingMedia}
        setDeletingMedia={setDeletingMedia}
        removeMedia={removeMedia}
        alert={alert}
      />
    </div>
  );
}
