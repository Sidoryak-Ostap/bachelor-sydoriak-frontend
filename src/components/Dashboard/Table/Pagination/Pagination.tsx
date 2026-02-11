import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }: PaginationProps) => {
  const currentBlock = Math.floor((currentPage - 1) / 3);

  const startPage = currentBlock * 3 + 1;
  const endPage = Math.min(startPage + 2, totalPages);

  const pagesToShow = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Кнопка назад */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="border border-gray-400 rounded-lg bg-white py-2 px-2 w-9 flex items-center justify-center disabled:opacity-50 cursor-pointer"
      >
        <ChevronLeft className="text-[#0F2B22]" size={20} />
      </button>

      {pagesToShow.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`border rounded-lg py-1.5 px-4 min-w-9 flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === page
              ? 'border-primary bg-primary text-white'
              : 'border-gray-400 bg-white text-[#0F2B22] hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="border border-gray-400 rounded-lg bg-white py-2 px-2 w-9 flex items-center justify-center disabled:opacity-50 cursor-pointer"
      >
        <ChevronRight className="text-[#0F2B22]" size={20} />
      </button>
    </div>
  );
};

export default Pagination;
