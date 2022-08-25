import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Input, SubHeading } from '../Components';

export default function ConfigsBulk({
  configs,
  setCreatingConfig,
  setKey,
  setValue,
  filter,
  setFilter,
  setCurrentPage,
  limit,
  isLoading,
}) {
  return (
    <div className="w-full">
      {((configs && configs.length > 0) || !isLoading) && (
        <button
          className="btn btn-primary btn-outline w-full lg:w-1/3"
          title="Create a new Config"
          onClick={() => {
            setCreatingConfig(true);
            setKey('');
            setValue('');
          }}
        >
          Create a new Config
        </button>
      )}

      <div className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`} />

      {configs && configs.length > 0 && (
        <Input
          title="Filter Configs"
          placeholder="Filter Configs..."
          value={filter}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="lg:mb-4 mb-2"
        />
      )}

      {configs && configs.length > 0 && (
        <PaginationList
          limit={limit}
          amount={
            configs
              ? configs.filter(
                  (c) =>
                    filter.length <= 0 ||
                    c.name.toLowerCase().includes(filter.trim().toLowerCase())
                ).length
              : 0
          }
          setter={setCurrentPage}
          additional="mb-4 lg:mb-2"
        />
      )}

      {configs &&
        configs.length > 0 &&
        filter.length > 0 &&
        !configs.find((c) =>
          c.name.toLowerCase().includes(filter.trim().toLowerCase())
        ) && <SubHeading color="error">no config match the filter.</SubHeading>}
    </div>
  );
}
