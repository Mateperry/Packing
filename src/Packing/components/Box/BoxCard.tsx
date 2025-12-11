// src/Packing/components/Boxes/BoxCard.tsx

import { useState } from "react";
import { createPortal } from "react-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CategoryIcon from "@mui/icons-material/Category";
import CheckIcon from '@mui/icons-material/Check';

import DroppableBox from "../Box/DroppableBox";
import BoxContend from "./BoxContend";

import type { Product } from "../../interfaces/Product";

interface Props {
  titulo: string;
  onEliminar: () => void;
  boxId: number;
  productos: Product[];
  decrementOne: (boxId: number, prodId: number) => void;
  removeProduct: (boxId: number, prodId: number) => void;
}

export default function BoxCard({
  titulo,
  onEliminar,
  boxId,
  productos,
  decrementOne,
  removeProduct,
}: Props) {
  const [hoverMode, setHoverMode] = useState(false);

  // === POSICIÓN TOOLTIP ===
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [tooltipText, setTooltipText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
    setTooltipText(text);
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
    setTooltipText("");
  };

  const hasProducts = productos.length > 0;

  return (
    <>
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
        <CardHeader
          title={titulo}
          action={
<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>

  {/* OJO (mostrar / ocultar descripción) */}
  <IconButton
    size="medium"
    onClick={() => {
      setHoverMode(!hoverMode);
      handleLeave();
    }}
    sx={{
      bgcolor: "white",
      border: "1px solid #e0e0e0",
      "&:hover": {
        bgcolor: "#f3f3f3",
      },
    }}
  >
    {hoverMode ? (
      <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
    ) : (
      <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
    )}
  </IconButton>

  {/* ELIMINAR CAJA */}
  <IconButton
    size="medium"
    onClick={() => {
      handleLeave();
      onEliminar();
    }}
    disabled={hasProducts}
    sx={{
      bgcolor: "white",
      border: "1px solid #e0e0e0",
      "&:hover": {
        bgcolor: hasProducts ? "white" : "#ffe5e5",
      },
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

  {/* CONFIRMAR CAJA */}
  <IconButton
    size="medium"
    disabled={!hasProducts}
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

        {/* CONTENIDO */}
        <DroppableBox boxId={boxId}>
          {!hasProducts ? (
            <BoxContend />
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
                        <>
                          <span style={{ fontWeight: 350, fontSize: 12 }}>
                            {prod.description} × {prod.quantity}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontWeight: 500 }}>
                          {prod.name} × {prod.quantity}
                        </span>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    {prod.quantity >= 2 && (
                      <button
                        onClick={() => {
                          handleLeave(); // limpia tooltip antes de cambiar cantidad
                          decrementOne(boxId, prod.id);
                        }}
                        className="py-1 transition text-sm"
                      >
                        <RemoveCircleIcon sx={{ fontSize: 22 }} />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        handleLeave(); // limpia tooltip antes de remover
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

      {/* TOOLTIP: sólo renderiza mientras realmente hay hover */}
      {isHovering &&
        tooltipText &&
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
