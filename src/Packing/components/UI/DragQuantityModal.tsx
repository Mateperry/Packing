// Importamos componentes de MUI para el modal, botones, inputs, etc.
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import type { Product } from "../../interfaces/Product";
import { useEffect } from "react";

// Definición de las props del componente
interface Props {
  isOpen: boolean; // controla si el modal está abierto
  product: Product | null; // producto seleccionado (puede ser null)
  quantity: number; // cantidad actualmente seleccionada
  onQuantityChange: (quantity: number) => void; // callback para actualizar la cantidad
  onConfirm: () => void; // callback al confirmar
  onCancel: () => void; // callback al cancelar
}

// Constantes de colores y estilos para consistencia
const PRIMARY = "#152c48";
const PRIMARY_CONTRAST = "#fff";
// const SECONDARY = "#80ac22"; // comentado, no se usa
const SECONDARY_CONTRAST = "#fff";
const NEUTRAL = "#fefefe";
const BACKGROUND = "#ffffff";

// Componente principal
export default function DragQuantityModal({
  isOpen,
  product,
  quantity,
  onQuantityChange,
  onConfirm,
  onCancel,
}: Props) {
  // Si no hay producto, no renderizamos nada
useEffect(() => {
  if (isOpen && product) {
    onQuantityChange(product?.quantity ?? 0);
  }
}, [isOpen, product]);

if (!product) return null;

  // Maneja cambios directos en el input numérico
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0; // si es NaN, se pone 0
    onQuantityChange(value);
  };

  // Función para disminuir cantidad (por defecto 1)
  const decreaseQuantity = (amount: number = 1) => {
    const newQty = Math.max(1, quantity - amount); // nunca bajar de 1
    onQuantityChange(newQty);
  };

  // Función para aumentar cantidad (por defecto 1)
  const increaseQuantity = (amount: number = 1) => {
    const newQty = Math.min(product.quantity, quantity + amount); // no superar stock
    onQuantityChange(newQty);
  };

  return (
    // Modal principal
    <Dialog
      open={isOpen} // abierto o cerrado
      onClose={onCancel} // cerrar modal
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px", // bordes redondeados
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // sombra
          backgroundColor: BACKGROUND, // color de fondo
        },
      }}
    >
      {/* Título del modal */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 18,
          backgroundColor: PRIMARY,
          color: PRIMARY_CONTRAST,
          paddingY: 2.5,
        }}
      >
        Seleccionar Cantidad de Items
      </DialogTitle>

      {/* Contenido principal */}
      <DialogContent sx={{ pt: 3, pb: 3, backgroundColor: BACKGROUND }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* Información del producto */}
          <Box sx={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 8px 0",
                color: PRIMARY,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {product.description} {/* Descripción del producto */}
            </p>
            
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <p style={{ margin: 0, color: "#666", fontSize: 12, fontWeight: 500 }}>
                  Disponibles
                </p>
                <p style={{ margin: 0, color: PRIMARY, fontSize: 16, fontWeight: 700 }}>
                  {product.quantity} {/* Stock disponible */}
                </p>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#e5e7eb" }} /> {/* Línea divisoria */}

          {/* Controles de cantidad */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
            {/* Botones de ajuste rápido: -10, -5, +5, +10 */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
              
              {/* Disminuir 10 */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => decreaseQuantity(10)}
                disabled={quantity <= 1}
                sx={{
                  borderColor: PRIMARY,
                  color: PRIMARY,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "rgba(21, 44, 72, 0.08)" },
                  "&:disabled": { borderColor: "#ccc", color: "#999" },
                }}
              >
                − 10
              </Button>

              {/* Disminuir 5 */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => decreaseQuantity(5)}
                disabled={quantity <= 1}
                sx={{
                  borderColor: PRIMARY,
                  color: PRIMARY,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "rgba(21, 44, 72, 0.08)" },
                  "&:disabled": { borderColor: "#ccc", color: "#999" },
                }}
              >
                − 5
              </Button>

              {/* Input numérico */}
              <TextField
                type="number"
                value={quantity}
                onChange={handleInputChange}
                inputProps={{
                  min: 1,
                  max: product.quantity,
                  style: {
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: PRIMARY,
                  },
                }}
                sx={{
                  width: 90,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    borderColor: PRIMARY,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: PRIMARY,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: PRIMARY,
                      borderWidth: 2,
                    },
                  },
                }}
              />

              {/* Aumentar 5 */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => increaseQuantity(5)}
                disabled={quantity >= product.quantity}
                sx={{
                  borderColor: PRIMARY,
                  color: PRIMARY,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "rgba(21, 44, 72, 0.08)" },
                  "&:disabled": { borderColor: "#ccc", color: "#999" },
                }}
              >
                + 5
              </Button>

              {/* Aumentar 10 */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => increaseQuantity(10)}
                disabled={quantity >= product.quantity}
                sx={{
                  borderColor: PRIMARY,
                  color: PRIMARY,
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  "&:hover": { backgroundColor: "rgba(21, 44, 72, 0.08)" },
                  "&:disabled": { borderColor: "#ccc", color: "#999" },
                }}
              >
                + 10
              </Button>
            </Box>

            {/* Botones unitarios: -1 y +1 */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              {/* Disminuir 1 */}
              <Button
                variant="contained"
                size="small"
                onClick={() => decreaseQuantity(1)}
                disabled={quantity <= 1}
                sx={{
                  minWidth: 50,
                  backgroundColor: "#f5f5f5",
                  color: PRIMARY,
                  fontWeight: 700,
                  borderRadius: "6px",
                  border: `2px solid ${PRIMARY}`,
                  "&:hover": { backgroundColor: "rgba(21, 44, 72, 0.1)" },
                  "&:disabled": { backgroundColor: "#f0f0f0", color: "#999", borderColor: "#ccc" },
                }}
              >
                −
              </Button>

              {/* Aumentar 1 */}
              <Button
                variant="contained"
                size="small"
                onClick={() => increaseQuantity(1)}
                disabled={quantity >= product.quantity}
                sx={{
                  minWidth: 50,
                  backgroundColor: "#f5f5f5",
                  color: PRIMARY,
                  fontWeight: 700,
                  borderRadius: "6px",
                  border: `2px solid ${PRIMARY}`,
                  "&:hover": { backgroundColor: "rgba(21, 44, 72, 0.1)" },
                  "&:disabled": { backgroundColor: "#f0f0f0", color: "#999", borderColor: "#ccc" },
                }}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Botones finales del modal */}
      <DialogActions
        sx={{
          p: 2.5,
          gap: 1.5,
          backgroundColor: NEUTRAL,
          borderTop: `1px solid #e5e7eb`,
        }}
      >
        {/* Cancelar */}
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "6px",
            borderColor: "#d0d0d0",
            color: PRIMARY,
            "&:hover": { backgroundColor: "#f5f5f5", borderColor: PRIMARY },
          }}
        >
          Cancelar
        </Button>

        {/* Confirmar */}
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "6px",
            backgroundColor:PRIMARY,
            color: SECONDARY_CONTRAST,
            "&:hover": { backgroundColor: PRIMARY},
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
