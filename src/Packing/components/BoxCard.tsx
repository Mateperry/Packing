import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CategoryIcon from '@mui/icons-material/Category';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import DroppableBox from "./DroppableBox";
import BoxContend from "./BoxContend";

import type { Product } from "../interfaces/Product";

interface Props {
  titulo: string;
  mostrarTitulo: boolean;
  alternarTitulo: () => void;
  onEliminar: () => void;
  boxId: number;
  productos: Product[];
  handleDecreaseProduct: (boxId: number, productId: number) => void;
  removeProduct: (boxId: number, productId: number) => void;
}

export default function BoxCard({
  titulo,
  mostrarTitulo,
  alternarTitulo,
  onEliminar,
  boxId,
  productos,
  handleDecreaseProduct,
  removeProduct,
}: Props) {
  const hasProducts = productos.length > 0;

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        paddingY: 1,
        marginY: 1,
      }}
    >
      {/* HEADER */}
      <CardHeader
        title={mostrarTitulo ? titulo : ""}
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="medium" onClick={alternarTitulo} title="Mostrar/ocultar título">
              {mostrarTitulo ? (
                <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
              ) : (
                <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>

            <IconButton
              size="medium"
              onClick={onEliminar}
              title="Eliminar caja"
              disabled={hasProducts}
            >
              <DeleteOutlineIcon
                sx={{ fontSize: 18, color: hasProducts ? "gray" : "red" }}
              />
            </IconButton>
          </Box>
        }
        sx={{
          paddingX: 2,
          paddingY: 1,
          "& .MuiCardHeader-title": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />

      {/* CONTENEDOR DROPPABLE */}
      <DroppableBox boxId={boxId}>
        {!hasProducts ? (
          <BoxContend />
        ) : (
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            {productos.map((prod) => (
              <Box
                key={prod.id}
                sx={{
                  padding: "8px 12px",
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
                      fontSize: 10,
                      fontWeight: 100,
                      color: "white",
                      backgroundColor: prod.quantity > 1 ? "#10B981" : "#F59E0B",
                    }}
                  >
                    <CategoryIcon sx={{ fontSize: 16 }} />
                  </Box>

                  <span style={{ fontWeight: 400 }}>
                    {prod.name} <strong>X{prod.quantity}</strong>
                  </span>
                </Box>

                {/* DERECHA */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  
                  {/* 🔥 FIX: Aquí se arregla el error */}
                  <button
                    onClick={() => handleDecreaseProduct(boxId, prod.id)}
                    className="py-1 transition text-sm"
                  >
                    <RemoveCircleIcon sx={{ fontSize: 22 }} />
                  </button>

                  <button
                    onClick={() => removeProduct(boxId, prod.id)}
                    className="py-1 text-red-500 rounded transition text-sm"
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
