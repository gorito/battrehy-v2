'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function AdminPagination({ totalItems, currentPage, itemsPerPage = 50 }: { totalItems: number, currentPage: number, itemsPerPage?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate page numbers with ellipsis for large page sets
  const pageNumbers: (number | string)[] = [];
  const siblingCount = 1; // show 1 page on each side of current
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, sides, ellipsis

  const addPage = (page: number) => pageNumbers.push(page);

  if (totalPages <= totalNumbers) {
    for (let i = 1; i <= totalPages; i++) addPage(i);
  } else {
    addPage(1);
    const leftSibling = Math.max(currentPage - siblingCount, 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
    if (leftSibling > 2) pageNumbers.push('...');
    for (let i = leftSibling; i <= rightSibling; i++) addPage(i);
    if (rightSibling < totalPages - 1) pageNumbers.push('...');
    addPage(totalPages);
  }

  const renderPageButton = (page: number | string, idx: number) => {
    const isCurrent = page === currentPage;
    const isEllipsis = page === '...';
    return (
      <button
        key={idx}
        onClick={() => !isEllipsis && router.push(createPageURL(page as number))}
        disabled={isCurrent || isEllipsis}
        className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium ${
          isCurrent ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
        } ${isEllipsis ? 'cursor-default' : 'cursor-pointer'} ${isCurrent ? 'rounded-md' : ''}`}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4 rounded-xl shadow-sm">
      {/* Mobile View */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => router.push(createPageURL(currentPage - 1))}
          disabled={currentPage <= 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Föregående
        </button>
        <div className="flex items-center px-4 text-sm font-medium text-gray-700">
          Sida {currentPage} av {totalPages}
        </div>
        <button
          onClick={() => router.push(createPageURL(currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Nästa
        </button>
      </div>
      {/* Desktop View */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Visar <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> till{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> av{' '}
            <span className="font-medium">{totalItems}</span> resultat
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => router.push(createPageURL(currentPage - 1))}
              disabled={currentPage <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Föregående
            </button>
            {pageNumbers.map((page, idx) => renderPageButton(page, idx))}
            <button
              onClick={() => router.push(createPageURL(currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nästa
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
