import React from 'react';
import ReactPaginate from 'react-paginate';

export default function PaginationList({
  theme,
  limit,
  amount,
  setter,
  additional,
}) {
  const previousLabel = 'Prev';
  const nextLabel = 'Next';

  let pageCount = Math.ceil(amount / limit);

  if (pageCount <= 0) {
    return <div></div>;
  }

  return (
    <ReactPaginate
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      onPageChange={(i) => setter(i.selected)}
      containerClassName={`flex justify-center items-center ${
        theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'
      } w-full rounded-lg p-1 opacity-50 duration-400 ease-in-out ${additional}`}
      activeLinkClassName={'bg-main-dark'}
      previousLinkClassName={`mr-2 font-gilroy ${
        theme === 'light' ? 'text-main-primary' : 'text-main-secondary'
      } border-transparent ${
        theme === 'light'
          ? 'hover:border-main-primary'
          : 'hover:border-main-secondary'
      } border-2 rounded-lg p-1 duration-400 ease-in-out text-xs lg:text-base`}
      nextLinkClassName={`ml-2 font-gilroy ${
        theme === 'light' ? 'text-main-primary' : 'text-main-secondary'
      } border-transparent ${
        theme === 'light'
          ? 'hover:border-main-primary'
          : 'hover:border-main-secondary'
      } border-2 rounded-lg p-1 duration-400 ease-in-out text-xs lg:text-base`}
      pageLinkClassName="pt-1 mx-1 p-1 rounded-full h-8 w-8 flex items-center justify-center text-main-primary border-2 border-transparent hover:border-main-300 duration-400 ease-in-out text-xs lg:text-base"
      breakLinkClassName="mx-1 p-1 rounded-full h-8 w-8 flex items-center justify-center text-main-primary border-2 border-transparent hover:border-main-300 duration-400 ease-in-out text-xs lg:text-base"
    />
  );
}
