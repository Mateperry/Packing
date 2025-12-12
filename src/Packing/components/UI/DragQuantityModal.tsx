import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import type { Product } from "../../interfaces/Product";

interface Props {
  isOpen: boolean;
  product: Product | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const PRIMARY = "#152c48";
const PRIMARY_CONTRAST = "#fff";
//const SECONDARY = "#80ac22";
const SECONDARY_CONTRAST = "#fff";
const NEUTRAL = "#fefefe";
const BACKGROUND = "#ffffff";

import { useEffect } from "react";

export default function DragQuantityModal({
  isOpen,
  product,
  quantity,
  onQuantityChange,
  onConfirm,
  onCancel,
}: Props) {
  // Si no hay producto, no renderizar nada
  if (!product) return null;

  // Cuando el modal se abre, setear la cantidad máxima permitida
  useEffect(() => {
    if (isOpen && product) {
      onQuantityChange(product.quantity);
    }
    // Solo cuando se abre el modal o cambia el producto
  }, [isOpen, product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onQuantityChange(value);
  };

  const decreaseQuantity = (amount: number = 1) => {
    const newQty = Math.max(1, quantity - amount);
    onQuantityChange(newQty);
  };

  const increaseQuantity = (amount: number = 1) => {
    const newQty = Math.min(product.quantity, quantity + amount);
    onQuantityChange(newQty);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: BACKGROUND,
        },
      }}
    >
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

      <DialogContent sx={{ pt: 3, pb: 3, backgroundColor: BACKGROUND }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Info del producto */}
          <Box sx={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 8px 0",
                color: PRIMARY,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {product.description}
            </p>
            
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <p style={{ margin: 0, color: "#666", fontSize: 12, fontWeight: 500 }}>
                  Disponibles
                </p>
                <p style={{ margin: 0, color: PRIMARY, fontSize: 16, fontWeight: 700 }}>
                  {product.quantity}
                </p>
              </Box>
              

            </Box>
          </Box>

          <Divider sx={{ borderColor: "#e5e7eb" }} />

          {/* Controles principales: - 10, - 5, input, + 5, + 10 */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Fila de botones rápidos */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
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

            {/* Controles unitarios: - 1, + 1 */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
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
                  "&:disabled": {
                    backgroundColor: "#f0f0f0",
                    color: "#999",
                    borderColor: "#ccc",
                  },
                }}
              >
                −
              </Button>

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
                  "&:disabled": {
                    backgroundColor: "#f0f0f0",
                    color: "#999",
                    borderColor: "#ccc",
                  },
                }}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          gap: 1.5,
          backgroundColor: NEUTRAL,
          borderTop: `1px solid #e5e7eb`,
        }}
      >
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



