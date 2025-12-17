// Importamos iconos de Material UI para los botones de navegación
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Props del componente de paginación
interface PaginationButtonsProps {
  page: number;          // Página actual
  totalPages: number;    // Total de páginas disponibles
  nextPage: () => void;  // Función para ir a la siguiente página
  prevPage: () => void;  // Función para ir a la página anterior
}

// Componente principal
export default function PaginationButtons({
  page,
  totalPages,
  nextPage,
  prevPage,
}: PaginationButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      
      {/* ----------------------
          BOTÓN ANTERIOR
          ---------------------- */}
      <button
        onClick={prevPage}           // Al hacer click va a la página anterior
        disabled={page === 1}        // Deshabilitado si estamos en la primera página
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          transition
          ${page === 1 
            ? "bg-gray-200 text-gray-400 cursor-not-allowed" // estilos deshabilitado
            : "bg-[#152c48] text-white hover:bg-[#123140]"}   // estilos activo
        `}
      >
        <ArrowBackIosNewIcon fontSize="small" /> {/* Icono flecha izquierda */}
      </button>

      {/* ----------------------
          PÁGINA ACTUAL
          ---------------------- */}
      <span className="text-gray-600 font-medium">
        {page} / {totalPages} {/* Mostrar número de página actual / total */}
      </span>

      {/* ----------------------
          BOTÓN SIGUIENTE
          ---------------------- */}
      <button
        onClick={nextPage}           // Al hacer click va a la siguiente página
        disabled={page === totalPages} // Deshabilitado si estamos en la última página
        className={`
          w-10 h-10 rounded-full flex items-center justify-center 
          transition
          ${page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed" // estilos deshabilitado
            : "bg-[#152c48] text-white hover:bg-[#123140]"}  // estilos activo
        `}
      >
        <ArrowForwardIosIcon fontSize="small" /> {/* Icono flecha derecha */}
      </button>
    </div>
  );
}
