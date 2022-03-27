interface PaginationProps {
  currentPage: number;
  totalPages: number | null | undefined;
  prevPage: () => void;
  nextPage: () => void;
}

function Pagination({currentPage, totalPages, prevPage, nextPage}: PaginationProps) {
  return totalPages ? (
    <div className='flex items-center justify-center'>
      {currentPage > 1 && (
        <button onClick={prevPage}>
          <span className='material-icons pt-1'>west</span>
        </button>
      )}
      <span className='mx-8 text-sm text-gray-600'>
        Página {currentPage} de {totalPages}
      </span>
      {currentPage !== totalPages && (
        <button onClick={nextPage}>
          <span className='material-icons pt-1'>east</span>
        </button>
      )}
    </div>
  ) : null;
}

export default Pagination;
