// src/Packing/components/Boxes/BoxContend.tsx

// Importamos el componente CardContent de Material UI para mostrar contenido dentro de una Card
import { CardContent } from "@mui/material";
// Importamos un ícono que representa archivo/archivado
import ArchiveIcon from '@mui/icons-material/Archive';

// Componente funcional BoxContend
function BoxContend() {
  return (
    // CardContent se usa como contenedor visual dentro de una Card
    <CardContent
      sx={{
        display: 'flex',           // uso de flexbox para centrar el contenido
        justifyContent: 'center',  // centrado horizontal
        alignItems: 'center',      // centrado vertical
        paddingBottom: 3,          // espacio inferior
        overflow: 'auto',          // permite scroll si el contenido es demasiado grande
      }}
    >
      {/* Ícono central para indicar caja vacía */}
      <ArchiveIcon 
        sx={{ 
          fontSize: 60,            // tamaño grande para destacar
          color: '#f97316'         // color naranja brillante
        }} 
      />
    </CardContent>
  );
}

// Exportamos el componente para usarlo en BoxCard y otras partes
export default BoxContend;


































