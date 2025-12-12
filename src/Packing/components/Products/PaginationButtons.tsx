import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export default function PaginationButtons({
  page,
  totalPages,
  nextPage,
  prevPage,
}: PaginationButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">

      {/* Botón anterior */}
      <button
        onClick={prevPage}
        disabled={page === 1}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          transition
          ${page === 1 
            ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
            : "bg-[#152c48] text-white hover:bg-[#123140]"}
        `}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      {/* Página actual */}
      <span className="text-gray-600 font-medium">
        {page} / {totalPages}
      </span>

      {/* Botón siguiente */}
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          transition
          ${page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#152c48] text-white hover:bg-[#123140]"}
        `}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>
    </div>
  );
}
