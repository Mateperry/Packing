import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { Product } from "../../interfaces/Product";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
  showDescription: boolean;
  onOpenAssign?: () => void;
  descriptionTruncated?: string;
}

function ProductItem({
  product,
  showDescription,
  onOpenAssign,
  descriptionTruncated,
}: Props) {
  const [color, setColor] = useState(product.color || "#152c48");

  useEffect(() => {
    if (product.quantity >= 100 && product.color !== "#5cc4ed") {
      product.color = "#5cc4ed";
      setColor("#5cc4ed");
    }
  }, [product.quantity]);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-2 flex flex-col items-center gap-1 border z-[999]">

      <div className="flex flex-col items-center gap-1 w-full">
        <div className="text-lg font-bold">{product.quantity}</div>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <LocalMallOutlinedIcon sx={{ color }} />
        </div>

        <div className="text-gray-700 text-center text-xs">
          {showDescription
            ? descriptionTruncated || product.description || product.name
            : product.name}
        </div>
      </div>

      {product.quantity > 5 && (
        <button
          className="no-drag absolute top-2 right-2 p-1"
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onOpenAssign?.();
          }}
        >
          <Inventory2OutlinedIcon />
        </button>
      )}
    </div>
  );
}

export default ProductItem;
