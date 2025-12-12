import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';




interface Props {
  isReadyBoxesOpen?: boolean;
  onToggleReadyBoxes?: () => void;
  readyBoxesCount?: number;
}

function HomeButtons ({ isReadyBoxesOpen, onToggleReadyBoxes, readyBoxesCount = 0 }: Props) { 
  return (
    <div className="home-buttons relative w-full flex items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
      <button
        className="flex items-center gap-2 bg-red-100 text-red-500 px-6 py-2 rounded-full border border-red-300 hover:bg-red-200 transition"
        onClick={() => alert("Botón de cancelar tocado")}
      >
        <CloseIcon />
         Cancelar proceso
      </button>

        <button className="flex items-center gap-2 bg-[#80ac22] text-white px-6 py-1 rounded-full hover:bg-[#6b8a1a] transition"
        onClick={()=> alert("El boton de proceso Finalizado fue tocado")}
        >
          <CheckIcon />
           Finalizar proceso
        </button>
      </div>

      {/* Toggle for ReadyBoxes - placed at the right of the HomeButtons container */}
      {readyBoxesCount > 0 && (
        <div className="ml-auto flex items-center pr-2">
          <IconButton
            onClick={onToggleReadyBoxes}
            size="large"
            sx={{
              backgroundColor: '#152c48',
              color: 'white',
              width: 42,
              height: 42,
              boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
              '&:hover': {
                backgroundColor: '#0d2236',
                transform: 'scale(1.08)'
              }
            }}
            aria-label="Cajas listas"
          >
            {isReadyBoxesOpen ? (
              <ChevronRightIcon fontSize="small" />
            ) : (
              <ChevronLeftIcon fontSize="small" />
            )}
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default HomeButtons;

































