import React from 'react';
import ReactPaginate from 'react-paginate';

export default function PaginationList({
  // theme,
  limit,
  amount,
  setter,
  //   language,
  additional,
}) {
  //   const previousLabel = language === 'mu' ? 'Presedant' : language === 'fr' ? 'Précédent' : 'Prev';
  //   const nextLabel = language === 'mu' ? 'Prosain' : language === 'fr' ? 'Prochain' : 'Next';

  const theme = 'dark';

  const previousLabel = 'Prev';
  const nextLabel = 'Next';

  return (
    <ReactPaginate
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      breakLabel={'...'}
      pageCount={amount / limit}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      onPageChange={(i) => setter(i.selected)}
      containerClassName={`flex justify-center items-center bg-gray-${
        theme === 'light' ? '300' : '700'
      } w-full rounded-lg p-1 opacity-50 duration-400 ease-in-out ${additional}`}
      activeLinkClassName={'bg-gray-800'}
      previousLinkClassName={`mr-2 font-gilroy text-main-${
        theme === 'light' ? '400' : '200'
      } border-transparent hover:border-main-${
        theme === 'light' ? '400' : '200'
      } border-2 rounded-lg p-1 duration-400 ease-in-out text-xs lg:text-base`}
      nextLinkClassName={`ml-2 font-gilroy text-main-${
        theme === 'light' ? '400' : '200'
      } border-transparent hover:border-main-${
        theme === 'light' ? '400' : '200'
      } border-2 rounded-lg p-1 duration-400 ease-in-out text-xs lg:text-base`}
      pageLinkClassName="pt-1 mx-1 p-1 rounded-full h-8 w-8 flex items-center justify-center text-main-300 border-2 border-transparent hover:border-main-300 duration-400 ease-in-out text-xs lg:text-base"
      breakLinkClassName="mx-1 p-1 rounded-full h-8 w-8 flex items-center justify-center text-main-300 border-2 border-transparent hover:border-main-300 duration-400 ease-in-out text-xs lg:text-base"
    />
  );
}
