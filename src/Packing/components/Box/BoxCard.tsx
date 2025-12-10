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

  const handleShowTooltip = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
    setTooltipText(text);
  };

  const hasProducts = productos.length > 0;

  const truncate = (str: string) =>
    str.length > 20 ? str.slice(0, 20) + "..." : str;

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
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* OJO (solo cambia la vista del texto, no afecta hover) */}
              <IconButton size="medium" onClick={() => setHoverMode(!hoverMode)}>
                {hoverMode ? (
                  <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>

              <IconButton size="medium" onClick={onEliminar} disabled={hasProducts}>
                <DeleteOutlineIcon
                  sx={{
                    fontSize: 18,
                    color: hasProducts ? "gray" : "red",
                    cursor: hasProducts ? "not-allowed" : "pointer",
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
                    p: "8px 12px",
                    borderRadius: "10px",
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                  onMouseEnter={(e) => handleShowTooltip(e, prod.description)} // ← SIEMPRE ACTIVO
                  onMouseLeave={() => setTooltipText("")}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        backgroundColor: prod.color || "#000000",
                      }}
                    >
                      <CategoryIcon sx={{ fontSize: 16 }} />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {!hoverMode ? (
                        <>
                          <span style={{ fontWeight: 450 }}>
                            {truncate(prod.description)}
                          </span>
                          <span style={{ fontSize: 12, color: "#4B5563" }}>
                            {prod.name} × {prod.quantity}
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
                        onClick={() => decrementOne(boxId, prod.id)}
                        className="py-1 transition text-sm"
                      >
                        <RemoveCircleIcon sx={{ fontSize: 22 }} />
                      </button>
                    )}

                    <button
                      onClick={() => removeProduct(boxId, prod.id)}
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

      {/* TOOLTIP SIEMPRE ACTIVO */}
      {tooltipText &&
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
              maxWidth: "380px",
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
