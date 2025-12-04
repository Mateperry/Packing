import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import type { Product } from "../../interfaces/Product";
import { useState, useEffect } from "react";

interface Props {
  product: Product;
  showDescription: boolean; // 👁 NUEVO
}

function ProductItem({ product, showDescription }: Props) {

  const [color, setColor] = useState(product.color || "#F59E0B");

  useEffect(() => {
    if (product.quantity >= 100 && product.color !== "#10B981") {
      product.color = "#10B981";
      setColor("#10B981");
    }
  }, [product.quantity]);

  return (
    <div
      className="relative bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-2 border cursor-grab active:cursor-grabbing"
    >
      {/* Cantidad */}
      <div className="text-lg font-bold">{product.quantity}</div>

      {/* Icono con color */}
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center text-white text-xl"
        style={{ backgroundColor: color }}
      >
        <LocalMallOutlinedIcon />
      </div>

      {/* Nombre o descripción */}
      <div className="text-gray-700 font-medium text-center">
        {showDescription ?  product.name  : product.description  }
      </div>
    </div>
  );
}

export default ProductItem;
