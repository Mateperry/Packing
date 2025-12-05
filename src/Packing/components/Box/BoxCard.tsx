import { useState } from "react";
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
  const [vistaDetallada, setVistaDetallada] = useState(true);
  const hasProducts = productos.length > 0;

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        py: 1,
        my: 1,
      }}
    >
      {/* HEADER */}
      <CardHeader
        title={titulo}
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* OJO: cambia entre vista detallada y compacta */}
            <IconButton
              size="medium"
              onClick={() => setVistaDetallada(!vistaDetallada)}
              title="Cambiar vista"
            >
              {vistaDetallada ? (
                <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
              ) : (
                <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>

            {/* ELIMINAR CAJA */}
            <IconButton size="medium" onClick={onEliminar} disabled={hasProducts}>
              <DeleteOutlineIcon
                sx={{ fontSize: 18, color: hasProducts ? "gray" : "red" }}
              />
            </IconButton>
          </Box>
        }
        sx={{
          px: 2,
          py: 1,
          "& .MuiCardHeader-title": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />

      {/* CONTENIDO (fijo, nunca desaparece) */}
      <DroppableBox boxId={boxId}>
        {!hasProducts ? (
          <BoxContend />
        ) : (
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            {productos.map((prod) => (
              <Box
                key={prod.id}
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
              >
                {/* IZQUIERDA */}
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

                  {/* DIFERENTE UI SEGÚN VISTA */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {vistaDetallada ? (
                      <>
                        <span style={{ fontWeight: 500 }}>{prod.name} × {prod.quantity}</span>                        
                        
                      </>
                    ) : (
                      <>
                        <span style={{ fontWeight: 450 }}>{prod.description}</span>                        
                        
                        {prod.description && (
                          <span style={{ fontSize: 12, color: "#4B5563" }}>
                            {prod.name} × {prod.quantity}
                          </span>
                        )}
                      </>
                    )}
                  </Box>
                </Box>

                {/* DERECHA: botones */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <button
                    onClick={() => decrementOne(boxId, prod.id)}
                    className="py-1 transition text-sm"
                  >
                    <RemoveCircleIcon sx={{ fontSize: 22 }} />
                  </button>

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
  );
}
