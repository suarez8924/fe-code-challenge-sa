import { ReactComponent as ChevronLeft } from "../../assets/svg/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevron-right.svg";
import "./Pagination.scss";

interface PaginationProps {
  className?: string;
  disabled: boolean;
  currentPage: number;
  itemCount: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  className = "",
  itemCount,
  disabled,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(itemCount / 30);

  const handlePageChange = (clickedNext: boolean) => {
    if (clickedNext) {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    } else {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    }
  };

  return (
    <nav className={`pagination ${className}`}>
      {currentPage > 1 && (
        <button
          className="pagination-button previous-button"
          disabled={disabled}
          onClick={() => {
            handlePageChange(false);
          }}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>
      )}
      <p>
        {currentPage} of {totalPages}
      </p>
      {currentPage < totalPages && (
        <button
          className="pagination-button next-button"
          disabled={disabled}
          onClick={() => {
            handlePageChange(true);
          }}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
