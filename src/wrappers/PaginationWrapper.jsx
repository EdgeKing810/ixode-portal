import { useState } from 'react';

export default function usePagination() {
  const [keys, setKeys] = useState([]);

  const initKey = (id) => {
    setKeys((prev) => {
      if (prev.filter((k) => k.id === id).length <= 0) {
        return [
          {
            id: id,
            hasMore: true,
            current: 0,
            isLoading: false,
          },
          ...prev,
        ];
      } else {
        return [...prev];
      }
    });
  };

  const setHasMore = (id, val) => {
    setKeys((prev) => {
      let updatedKeys = [...prev];
      updatedKeys = updatedKeys.map((k) => {
        let updatedKey = k;
        if (updatedKey.id === id) {
          updatedKey.hasMore = val;
        }
        return updatedKey;
      });
      return [...updatedKeys];
    });
  };

  const incrementCurrentValue = (id) => {
    setKeys((prev) => {
      let updatedKeys = [...prev];
      updatedKeys = updatedKeys.map((k) => {
        let updatedKey = k;
        if (updatedKey.id === id) {
          updatedKey.current += 1;
        }
        return updatedKey;
      });
      return [...updatedKeys];
    });
  };

  const setIDLoading = (id, val) => {
    setKeys((prev) => {
      let updatedKeys = [...prev];
      updatedKeys = updatedKeys.map((k) => {
        let updatedKey = k;
        if (updatedKey.id === id) {
          updatedKey.isLoading = val;
        }
        return updatedKey;
      });
      return [...updatedKeys];
    });
  };

  const resetKey = (id) => {
    setKeys((prev) => {
      return [
        {
          id: id,
          hasMore: true,
          current: 0,
          isLoading: false,
        },
        ...prev.filter((k) => k.id !== id),
      ];
    });
  };

  const fetchKey = (id, keys) => {
    const notFound = {
      id: '404',
      hasMore: true,
      isLoading: false,
      current: 0,
    };

    if (!keys) {
      return notFound;
    }

    const refKeys = keys.filter((k) => k.id === id);

    if (!refKeys || refKeys.length <= 0) {
      initKey(id);
      return notFound;
    }
    return refKeys[0];
  };

  const fetchKeys = () => {
    let returnKeys = null;
    setKeys((prev) => {
      returnKeys = [...prev];
      return [...prev];
    });
    return returnKeys;
  };

  return {
    keys,
    initKey,
    setHasMore,
    incrementCurrentValue,
    setIDLoading,
    resetKey,
    fetchKey,
    fetchKeys,
  };
}
