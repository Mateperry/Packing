import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { Product } from "../../interfaces/Product";
import { useState, useEffect } from "react";

interface Props {
  product: Product;
  showDescription: boolean;
  onOpenAssign?: () => void;
}

function ProductItem({ product, showDescription, onOpenAssign }: Props) {
  const [color, setColor] = useState(product.color || "#000000");

  useEffect(() => {
    if (product.quantity >= 100 && product.color !== "#10B981") {
      product.color = "#10B981";
      setColor("#10B981");
    }
  }, [product.quantity]);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-2 border cursor-grab active:cursor-grabbing">

      {/* Cantidad */}
      <div className="text-lg font-bold">{product.quantity}</div>

      {/* Ícono con color */}
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center text-white text-xl"
        style={{ backgroundColor: color }}
      >
        <LocalMallOutlinedIcon />
      </div>

      {/* Nombre */}
      <div className="text-gray-700 font-medium text-center">
        {showDescription ? product.name : product.description}
      </div>

      {/* Botón asignar */}
      {product.quantity > 5 && (
        <button
          className="absolute top-3 right-3 p-3 bg-green-200 rounded-full shadow-md hover:bg-green-300 active:scale-95 transition no-drag"
          onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onOpenAssign?.();
          }}
        >
          <Inventory2OutlinedIcon className="text-green-700" fontSize="medium" />
        </button>
      )}

    </div>
  );
}

export default ProductItem;
