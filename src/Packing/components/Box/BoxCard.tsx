// src/Packing/components/Boxes/BoxCard.tsx

import { useState } from "react";
import { createPortal } from "react-dom"; // Para renderizar tooltips fuera del flujo normal

// Material UI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// Iconos
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CategoryIcon from "@mui/icons-material/Category";
import CheckIcon from '@mui/icons-material/Check';

// Componentes internos
import DroppableBox from "../Box/DroppableBox"; // Área donde se pueden soltar productos arrastrados
import BoxContend from "./BoxContend";         // Contenido placeholder de caja vacía

import type { Product } from "../../interfaces/Product";

// Definición de Props del componente
interface Props {
  titulo: string; // Nombre de la caja
  onEliminar: () => void; // Función para eliminar la caja
  boxId: number; // ID de la caja
  productos: Product[]; // Lista de productos dentro de la caja
  decrementOne: (boxId: number, prodId: number) => void; // Reducir cantidad de un producto
  removeProduct: (boxId: number, prodId: number) => void; // Eliminar un producto de la caja
  onMarkBoxReady?: (boxId: number, productos: Product[]) => void; // Marcar caja lista para envío
}

export default function BoxCard({
  titulo,
  onEliminar,
  boxId,
  productos,
  decrementOne,
  removeProduct,
  onMarkBoxReady,
}: Props) {
  // Estado para alternar entre mostrar nombre o descripción de los productos
  const [hoverMode, setHoverMode] = useState(false);

  // Estados para manejar tooltip de descripción
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 }); // posición en pantalla
  const [tooltipText, setTooltipText] = useState(""); // texto a mostrar
  const [isHovering, setIsHovering] = useState(false); // si se está haciendo hover

  // Función para mostrar tooltip al pasar mouse sobre producto
  const handleEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect(); // obtener posición del elemento
    setTooltipPos({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
    setTooltipText(text);
    setIsHovering(true);
  };

  // Función para ocultar tooltip al salir del hover
  const handleLeave = () => {
    setIsHovering(false);
    setTooltipText("");
  };

  const hasProducts = productos.length > 0; // Determina si la caja tiene productos

  return (
    <>
      {/* Componente principal de la caja */}
      <Card
        sx={{
          width: "100%",
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          py: 1,
          my: 1,
          overflow: "visible",
        }}
      >
        {/* Header de la caja: título + acciones */}
        <CardHeader
          title={titulo} 
          action={
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>

              {/* BOTÓN: mostrar/ocultar descripción */}
              <IconButton
                size="medium"
                onClick={() => {
                  setHoverMode(!hoverMode); // alternar modo hover
                  handleLeave(); // limpiar tooltip
                }}
                sx={{
                  bgcolor: "white",
                  border: "1px solid #e0e0e0",
                  "&:hover": { bgcolor: "#f3f3f3" },
                }}
              >
                {hoverMode ? (
                  <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>

              {/* BOTÓN: eliminar caja (deshabilitado si hay productos) */}
              <IconButton
                size="medium"
                onClick={() => {
                  handleLeave(); // limpiar tooltip antes de eliminar
                  onEliminar();
                }}
                disabled={hasProducts}
                sx={{
                  bgcolor: "white",
                  border: "1px solid #e0e0e0",
                  "&:hover": { bgcolor: hasProducts ? "white" : "#ffe5e5" },
                }}
              >
                <DeleteOutlineIcon
                  sx={{
                    fontSize: 18,
                    color: hasProducts ? "#bdbdbd" : "red",
                    transition: "0.2s",
                  }}
                />
              </IconButton>

              {/* BOTÓN: confirmar caja lista */}
              <IconButton
                size="medium"
                disabled={!hasProducts} // solo activo si hay productos
                onClick={() => {
                  onMarkBoxReady?.(boxId, productos); // marca como lista
                }}
                sx={{
                  bgcolor: hasProducts ? "#152c48" : "#e0e0e0",
                  color: "white",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  transition: "0.3s",
                  boxShadow: hasProducts ? "0 2px 6px rgba(21, 44, 72, 0.3)" : "none",
                  "&:hover": {
                    bgcolor: hasProducts ? "#12303f" : "#e0e0e0",
                    cursor: hasProducts ? "pointer" : "not-allowed",
                  },
                }}
              >
                <CheckIcon
                  sx={{
                    fontSize: 20,
                    color: hasProducts ? "white" : "#152c48",
                  }}
                />
              </IconButton>

            </Box>
          }
          sx={{
            px: 2,
            py: 1,
            "& .MuiCardHeader-title": { fontSize: 14, fontWeight: 500 },
          }}
        />

        {/* CONTENIDO: área donde se pueden arrastrar productos */}
        <DroppableBox boxId={boxId}>
          {!hasProducts ? (
            <BoxContend /> // caja vacía: placeholder
          ) : (
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
              {productos.map((prod) => (
                <Box
                  key={prod.id}
                  className="group relative"
                  sx={{
                    p: "2px 10px",
                    borderRadius: "12px",
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                  onMouseEnter={(e) => handleEnter(e, prod.description)}
                  onMouseLeave={handleLeave}
                >
                  {/* Ícono y texto del producto */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: prod.color || "black",
                      }}
                    >
                      <CategoryIcon sx={{ fontSize: 18 }} />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {!hoverMode ? (
                        <span style={{ fontWeight: 400, fontSize: 12 }}>
                          {prod.description} × {prod.quantity}
                        </span>
                      ) : (
                        <span style={{ fontWeight: 500 }}>
                          {prod.name} × {prod.quantity}
                        </span>
                      )}
                    </Box>
                  </Box>

                  {/* Botones de acción por producto */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {/* Reducir cantidad */}
                    {prod.quantity >= 2 && (
                      <button
                        onClick={() => {
                          handleLeave(); // limpiar tooltip antes de cambiar cantidad
                          decrementOne(boxId, prod.id);
                        }}
                        className="py-1 transition text-sm"
                      >
                        <RemoveCircleIcon sx={{ fontSize: 22 }} />
                      </button>
                    )}

                    {/* Eliminar producto */}
                    <button
                      onClick={() => {
                        handleLeave(); // limpiar tooltip antes de remover
                        removeProduct(boxId, prod.id);
                      }}
                      className="py-1 text-red-500 transition text-sm"
                    >
                      <CancelIcon sx={{ fontSize: 22 }} />
                    </button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </DroppableBox>
      </Card>

      {/* TOOLTIP: solo se renderiza mientras hay hover */}
      {isHovering && tooltipText &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: tooltipPos.top - 8,
              left: tooltipPos.left,
              transform: "translate(-50%, -100%)",
              background: "black",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              zIndex: 9999,
              maxWidth: "400px",
              wordBreak: "break-word",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            {tooltipText}
          </div>,
          document.body
        )}
    </>
  );
}
