import ChevronLeftIcon from "../assets/icons/left-chevron-black.svg";
import ChevronRightIcon from "../assets/icons/chevron-right-black.svg";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center  space-x-0  shadow-card border border-graylight rounded-md overflow-hidden bg-white w-fit">
      {/* Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        // disabled={currentPage === 1}
        className={`px-4 py-3 border-r border-graylight ${
          currentPage === 1
            ? "text-gray-400 "
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <img src={ChevronLeftIcon} />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-3 border-r border-gray-200 ${
              currentPage === page
                ? "bg-gray-100 text-gray-900 font-semibold text-xs"
                : "text-gray-700 hover:bg-gray-50 font-medium text-xs"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        // disabled={currentPage === totalPages}
        className={`px-4 py-3 ${
          currentPage === totalPages
            ? "text-gray-400 "
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <img src={ChevronRightIcon} />
      </button>
    </div>
  );
}
