import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
  updateProductQuantity: (boxId: number, productId: number, delta: number) => void;
  removeProduct: (boxId: number, productId: number) => void;
}

export default function BoxCard({
  titulo,
  mostrarTitulo,
  alternarTitulo,
  onEliminar,
  boxId,
  productos,
  updateProductQuantity,
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
            <IconButton
              size="medium"
              onClick={alternarTitulo}
              title="Mostrar/ocultar título"
            >
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
                  p: 1,
                  bg: "orange.200",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{prod.name} x{prod.quantity}</span>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <button
                    onClick={() => updateProductQuantity(boxId, prod.id, -1)}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeProduct(boxId, prod.id)}
                    className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                  >
                    x
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
