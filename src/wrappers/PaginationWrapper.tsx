import { useState } from 'react';

interface PaginationInterface {
  id: string;
  hasMore: boolean;
  current: number;
  isLoading: boolean;
}

export default function usePagination() {
  const [keys, setKeys] = useState<Array<PaginationInterface>>([]);

  const initKey = (id: string) => {
    setKeys((prev: Array<PaginationInterface>) => {
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

  const setHasMore = (id: string, val: boolean) => {
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

  const incrementCurrentValue = (id: string) => {
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

  const setIDLoading = (id: string, val: boolean) => {
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

  const resetKey = (id: string) => {
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

  const fetchKey = (id: string, keys: Array<PaginationInterface>) => {
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
