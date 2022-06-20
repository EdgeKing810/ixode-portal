import React from 'react';

import PaginationList from '../../wrappers/PaginationList';
import { Button, Input, Separator, SubHeading } from '../Components';

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
  theme,
}) {
  return (
    <div className="w-full">
      {((configs && configs.length > 0) || !isLoading) && (
        <Button
          color={theme === 'light' ? 'dark' : 'light'}
          theme={theme}
          className="p-3 w-full lg:w-1/3 justify-center uppercase"
          click={() => {
            setCreatingConfig(true);
            setKey('');
            setValue('');
          }}
        >
          Create a new Config
        </Button>
      )}

      <Separator />

      {configs && configs.length > 0 && (
        <Input
          title="Filter Configs"
          placeholder="Filter Configs..."
          value={filter}
          theme={theme}
          change={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0);
          }}
          className="mb-2"
        />
      )}

      {configs && configs.length > 0 && (
        <PaginationList
          theme={theme}
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
