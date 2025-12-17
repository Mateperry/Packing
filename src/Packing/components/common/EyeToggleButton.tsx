// src/Packing/components/common/EyeToggleButton.tsx

// Importamos los íconos de visibilidad de Material UI
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"; // ícono "ver"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"; // ícono "ocultar"

// Definimos las props que recibirá el componente
interface Props {
  active: boolean;       // indica si actualmente está activo (mostrar/ocultar)
  onToggle: () => void;  // función que se ejecuta al hacer click para cambiar el estado
  size?: number;         // tamaño opcional del ícono (por defecto 22)
}

// Componente funcional EyeToggleButton
export default function EyeToggleButton({ active, onToggle, size = 22 }: Props) {
  return (
    // Botón que ejecuta onToggle al hacer click
    <button
      onClick={onToggle}
      className="p-1 rounded-lg transition shadow bg-transparent"
    >
      <div className="transition-opacity duration-200">
        {/* Mostramos un ícono u otro según el estado "active" */}
        {active ? (
          // Si está activo, mostramos el ícono de "ocultar"
          <VisibilityOffOutlinedIcon sx={{ fontSize: size }} />
        ) : (
          // Si no está activo, mostramos el ícono de "ver"
          <RemoveRedEyeOutlinedIcon sx={{ fontSize: size }} />
        )}
      </div>
    </button>
  );
}
