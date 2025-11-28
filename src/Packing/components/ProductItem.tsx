import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import type { Product } from "../interfaces/Product";

interface Props {
  product: Product;
}

function ProductItem({ product }: Props) {
  const cardColor = product.quantity === 1 ? "bg-orange-400" : "bg-green-500";

  return (
    <div
      className="relative group bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-2 border cursor-pointer"
    >
      {/* Número arriba */}
      <div className="text-lg font-bold">{product.quantity}</div>

      {/* Icono cuadrado */}
      <div
        className={`w-12 h-12 rounded-md ${cardColor} flex items-center justify-center text-white text-xl`}
      >
        <LocalMallOutlinedIcon />
      </div>

      {/* Nombre */}
      <div className="text-gray-700 font-medium">{product.name}</div>

      {/* Tooltip (oculto hasta hover) */}
      <div
        className="
              absolute left-1/2 -top-3 translate-x-[-50%] -translate-y-full   
            bg-black text-white text-sm px-3 py-1 rounded-lg
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-200
              pointer-events-none
              z-20
              border border-white/40
              w-40 text-center

        "
      >
        {product.description}
      </div>
    </div>
  );
}

export default ProductItem;

