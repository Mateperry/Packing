import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

interface HomeButtonsProps {
  onCancel?: () => void;
  onFinish?: () => void;
  canFinish: boolean;
}

function HomeButtons({ onCancel, onFinish, canFinish }: HomeButtonsProps) {
  return (
    <div className="home-buttons w-full flex justify-center my-1">
      <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 md:gap-6">

        {/*  CANCELAR */}
        <button
          className="flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-6 sm:py-2
                     bg-red-100 text-red-500 rounded-full border border-red-300
                     hover:bg-red-200 transition text-sm sm:text-base"
          onClick={onCancel}
        >
          <CloseIcon fontSize="small" />
          Cancelar proceso
        </button>

        {/*  FINALIZAR */}
        <button
          disabled={!canFinish}
          onClick={canFinish ? onFinish : undefined}
          className={`
            flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-6 sm:py-2
            rounded-full text-sm sm:text-base transition
            ${
              canFinish
                ? "bg-[#80ac22] text-white hover:bg-[#6b8a1a]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <CheckIcon fontSize="small" />
          Finalizar proceso
        </button>
      </div>
    </div>
  );
}

export default HomeButtons;
