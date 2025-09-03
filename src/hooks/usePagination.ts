import { useState } from 'react';

const usePagination = (totalItems: number, initialPageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const paginatedData = (data: any[]) => {
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  };

  return {
    currentPage,
    pageSize,
    total: totalItems,
    onPageChange,
    paginatedData,
  };
};

export default usePagination;