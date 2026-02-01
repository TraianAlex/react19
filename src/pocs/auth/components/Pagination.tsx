type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <nav className='d-flex justify-content-center mt-4' aria-label='Users'>
      <ul className='pagination mb-0'>
        <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
          <button
            type='button'
            className='page-link'
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
        </li>
        <li className='page-item active'>
          <span className='page-link'>
            {page} / {totalPages}
          </span>
        </li>
        <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
          <button
            type='button'
            className='page-link'
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
