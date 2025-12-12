import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { Product } from "../../interfaces/Product";
import { useState, useEffect } from "react";

interface Props {
  product: Product;
  showDescription: boolean;
  onOpenAssign?: () => void;
  descriptionTruncated?: string; // recibido desde DraggableProduct
}

function ProductItem({ product, showDescription, onOpenAssign, descriptionTruncated }: Props) {
  const [color, setColor] = useState(product.color || "#152c48");

  useEffect(() => {
    if (product.quantity >= 100 && product.color !== "#5cc4ed") {
      product.color = "#5cc4ed";
      setColor("#5cc4ed");
    }
  }, [product.quantity]);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-2 border cursor-grab active:cursor-grabbing">

      {/* Cantidad */}
      <div className="text-lg font-bold">{product.quantity}</div>

      {/* Ícono con color */}
<div
  className="
    w-12 h-12 rounded-xl flex items-center justify-center text-xl 
    transition-all duration-200
    hover:shadow-lg hover:scale-105
  "
  style={{
    border: `2px solid ${color}`,
    backgroundColor: `${color}15`, // fondo muy sutil
  }}
>
  <LocalMallOutlinedIcon
    sx={{
      color,
      transition: "0.2s",
      "&:hover": {
        filter: "brightness(1.2)",
      },
    }}
  />
</div>



      {/* Texto principal:
          - si showDescription === true => mostramos descripción TRUNCADA (20 chars)
          - si showDescription === false => mostramos el NOMBRE del producto
      */}
      <div className="text-gray-700 font-medium text-center">
        {showDescription
  ? (descriptionTruncated || product.description || product.name)
  : product.name}

      </div>

      {/* Botón asignar (no-drag) */}
      {product.quantity > 5 && (
        <button
          className="absolute top-3 right-3 p-3 bg-[#5cc4ed] rounded-full shadow-md hover:bg-[#5cc4ed] active:scale-95 transition no-drag"
          onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onOpenAssign?.();
          }}
        >
          <Inventory2OutlinedIcon className="text-[#fff]" fontSize="medium" />
        </button>
      )}

    </div>
  );
}

export default ProductItem;
