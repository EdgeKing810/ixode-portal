import React from 'react';
import ReactPaginate from 'react-paginate';

export default function PaginationList({
  limit,
  amount,
  setter,
  additional,
}: {
  limit: number;
  amount: number;
  setter: (page: number) => void;
  additional?: any;
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
      containerClassName={`flex justify-center items-center bg-base-200 w-full rounded-lg p-1 opacity-50 duration-300 ease-in-out ${additional}`}
      activeLinkClassName={'bg-base-100'}
      previousLinkClassName={`mr-2 font-spartan text-secondary border-transparent hover:border-secondary border-2 rounded-lg p-1 duration-300 ease-in-out text-xs lg:text-base`}
      nextLinkClassName={`ml-2 font-spartan text-secondary border-transparent hover:border-secondary border-2 rounded-lg p-1 duration-300 ease-in-out text-xs lg:text-base`}
      pageLinkClassName="pt-1 mx-1 p-1 rounded-full h-8 w-8 flex items-center justify-center text-base-content border-2 border-transparent hover:border-secondary duration-300 ease-in-out text-xs lg:text-base"
      breakLinkClassName="mx-1 p-1 rounded-full h-8 w-8 flex items-center justify-center text-main-primary border-2 border-transparent hover:border-secondary duration-300 ease-in-out text-xs lg:text-base"
    />
  );
}
