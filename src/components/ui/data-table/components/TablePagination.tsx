import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface PageProps {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface PaginationProps {
  pagination: PageProps;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  pagination,
  onPageChange,
}: PaginationProps) => {
  const { page, pageSize, totalPages, totalItems } = pagination;

  let startPage = page;

  if (page > totalPages - 2) {
    startPage = Math.max(1, totalPages - 2);
  }

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  const visiblePages = Array.from(
    { length: Math.min(3, totalPages) },
    (_, index) => startPage + index,
  );

  const handlePageChange = (type: "increase" | "decrease") => {
    if (type === "increase" && page < totalPages) {
      onPageChange(page + 1);
    }

    if (type === "decrease" && page > 1) {
      onPageChange(page - 1);
    }
  };

  return (
    <div className="h-[60px] shrink-0 flex items-center justify-between border rounded-b-sm border-app-border px-4">

      {/* Showing information */}
      <div>
        <span className="text-xs text-app-text-muted">
          Showing{" "}
          <span className="font-medium text-app-text">
            {startItem} – {endItem}
          </span>{" "}
          of{" "}
          <span className="font-medium text-app-text">
            {totalItems}
          </span>
        </span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">

        {/* Previous */}
        <button
          type="button"
          disabled={page === 1}
          onClick={() => handlePageChange("decrease")}
          className="
            w-7 h-7
            flex items-center justify-center
            rounded-md
            text-app-text-muted
            hover:bg-app-bg
            hover:text-app-text
            disabled:opacity-10
            disabled:cursor-not-allowed
            transition-colors
           
          "
          aria-label="Previous page"
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: 22 }} />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                w-8 h-8
                flex items-center justify-center  cursor-pointer
                rounded-md
                text-xs font-medium
                transition-colors
                ${
                  page === pageNumber
                    ? "bg-app-primary-500 text-app-text-inverse"
                    : "text-app-text-muted hover:bg-app-bg hover:text-app-text"
                }
              `}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => handlePageChange("increase")}
          className="
            w-7 h-7
            flex items-center justify-center
            rounded-md
            text-app-text-muted
            hover:bg-app-bg
            hover:text-app-text
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition-colors
          "
          aria-label="Next page"
        >
          <KeyboardArrowRightIcon sx={{ fontSize: 22}} />
        </button>

      </div>
    </div>
  );
};

export default TablePagination;