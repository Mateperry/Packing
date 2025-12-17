import { useEffect, useState } from "react"; // Hooks de React: useEffect y useState
import Box from "@mui/material/Box"; // Componente Box de MUI para contenedores
import Card from "@mui/material/Card"; // Componente Card de MUI para paneles
import CardContent from "@mui/material/CardContent"; // Contenido interno de la Card
import IconButton from "@mui/material/IconButton"; // Botón icono de MUI
import Collapse from "@mui/material/Collapse"; // Componente Collapse para expandir/colapsar

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Icono de flecha izquierda
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // Icono de flecha derecha
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icono de expandir

import type { ReadyBox } from "../../Hooks/Shipping/useBoxShipping"; // Tipo de caja lista

// Props del componente
interface Props {
  readyBoxes: ReadyBox[]; // Array con todas las cajas listas
  onRestore?: (readyBoxId: number) => void; // Función opcional para restaurar caja
  isOpen?: boolean; // Controla si el panel está abierto
  onClose?: () => void; // Función opcional para cerrar el panel
}

const PRIMARY = "#152c48"; // Color principal del panel

export default function ReadyBoxesPanel({
  readyBoxes,
  onRestore,
  isOpen = false,
  onClose,
}: Props) {
  // Bloquear scroll del body cuando el panel está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"; // Si está abierto, bloquea scroll
    return () => {
      document.body.style.overflow = "auto"; // Al desmontar o cerrar, restaurar scroll
    };
  }, [isOpen]);

  // Estado para almacenar qué caja está expandida
  const [openBoxId, setOpenBoxId] = useState<number | null>(null);

  // Función para alternar expandir/colapsar una caja
  const toggleBox = (id: number) => {
    setOpenBoxId((prev) => (prev === id ? null : id)); // Si ya estaba abierta, colapsa; si no, abre
  };

  // Si el panel está cerrado o no hay cajas, no renderizamos nada
  if (!isOpen || readyBoxes.length === 0) return null;

  return (
    <>
      {/* BACKDROP: Fondo semi-transparente que cubre todo */}
      <Box
        onClick={() => onClose?.()} // Cierra el panel al hacer click fuera
        sx={{
          position: "fixed", // Fijo en la pantalla
          inset: 0, // Ocupa toda la pantalla
          backgroundColor: "rgba(0,0,0,0.2)", // Negro semi-transparente
          backdropFilter: "blur(4px)", // Efecto blur
          zIndex: 1000, // Debajo del panel
        }}
      />

      {/* PANEL LATERAL */}
      <Card
        sx={{
          position: "fixed", // Fijo a la derecha
          top: 0,
          right: 0,
          width: { xs: "100%", sm: "65%", md: "45%", lg: "38%" }, // Responsive
          maxWidth: 440, // Máximo ancho
          height: "100vh", // Ocupa toda la altura
          zIndex: 1100, // Encima del backdrop
          borderRadius: "12px 0 0 12px", // Bordes redondeados solo lado izquierdo
          boxShadow: "0 6px 30px rgba(0,0,0,0.18)", // Sombra del panel
          overflow: "auto", // Scroll interno si el contenido es grande
        }}
      >
        {/* HEADER DEL PANEL */}
        <Box
          sx={{
            background: PRIMARY, // Color de fondo del header
            color: "white", // Texto blanco
            padding: "10px 14px", // Padding
            fontWeight: 600, // Negrita
            fontSize: 14, // Tamaño de fuente
            display: "flex", // Flex para separar elementos
            justifyContent: "space-between", // Separar título y botón cerrar
          }}
        >
          {/* Título y número de cajas listas */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <span>Cajas Listas</span> 
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.25)", // Fondo blanco translúcido
                borderRadius: 6,
                padding: "2px 8px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {readyBoxes.length} {/* Muestra el número de cajas listas */}
            </span>
          </Box>

          {/* Botón para cerrar el panel */}
          <IconButton size="small" onClick={onClose} sx={{ color: "white" }}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* CONTENIDO DEL PANEL */}
        <CardContent sx={{ padding: "10px 18px" }}>
          {/* Iterar sobre todas las cajas listas */}
          {readyBoxes.map((box, index) => {
            const isExpanded = openBoxId === box.id; // ¿Está esta caja expandida?

            return (
              <Box
                key={box.id} // Clave única
                sx={{
                  mb: 1, // Margin bottom
                  p: 1, // Padding interno
                  borderRadius: 2, // Bordes redondeados
                  border: "1px solid #e6e6e6", // Borde gris
                }}
              >
                {/* CABECERA DE CADA CAJA */}
                <Box
                  onClick={() => toggleBox(box.id)} // Expandir/colapsar caja al click
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  {/* Información de la caja */}
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Box sx={{ fontWeight: 700, fontSize: 15, color: PRIMARY }}>
                      Caja {index + 1} {/* Número de caja */}
                    </Box>

                    <Box sx={{ fontSize: 12, color: "#777" }}>
                      {box.productos.length} SKU {/* Número de productos distintos */}
                    </Box>
                  </Box>

                  {/* Botones de acción */}
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {/* Botón para restaurar la caja a editable */}
                    {onRestore && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que el click colapse/expanda
                          onRestore(box.id); // Llamar a función de restaurar
                        }}
                      >
                        <ChevronLeftIcon fontSize="small" />
                      </IconButton>
                    )}

                    {/* Icono de expandir/colapsar */}
                    <ExpandMoreIcon
                      sx={{
                        transform: isExpanded
                          ? "rotate(180deg)" // Rotar si está expandida
                          : "rotate(0deg)", // Normal si está colapsada
                        transition: "0.2s", // Animación suave
                      }}
                    />
                  </Box>
                </Box>

                {/* CONTENIDO EXPANDIBLE */}
                <Collapse in={isExpanded}>
                  <Box sx={{ pl: 1.5, pt: 1 }}>
                    {box.productos.map((p) => (
                      <Box key={p.id} sx={{ fontSize: 13 }}>
                        • {p.description} ({p.quantity}) {/* Producto y cantidad */}
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
