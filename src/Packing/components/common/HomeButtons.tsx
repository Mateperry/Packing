// src/Packing/components/common/HomeButtons.tsx

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface HomeButtonsProps {
  onCancel?: () => void;
  onFinish?: () => void;
}

function HomeButtons({ onCancel, onFinish }: HomeButtonsProps) {
  return (
    // Contenedor ocupa todo el ancho del renglón
    <div className="home-buttons w-full flex justify-center my-1">
      {/* Contenedor de botones centrado y con espacio entre ellos */}
      <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 md:gap-6">
        
        {/* Botón Cancelar */}
        <button
          className="flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-6 sm:py-2 bg-red-100 text-red-500 rounded-full border border-red-300 hover:bg-red-200 transition text-sm sm:text-base"
          onClick={onCancel || (() => alert("Botón de cancelar tocado"))}
        >
          <CloseIcon fontSize="small" />
          Cancelar proceso
        </button>

        {/* Botón Finalizar */}
        <button
          className="flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-6 sm:py-2 bg-[#80ac22] text-white rounded-full hover:bg-[#6b8a1a] transition text-sm sm:text-base"
          onClick={onFinish || (() => alert("El botón de proceso Finalizado fue tocado"))}
        >
          <CheckIcon fontSize="small" />
          Finalizar proceso
        </button>
      </div>
    </div>
  );
}

export default HomeButtons;

