// Importamos iconos de Material UI
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"; // Icono de bolsa
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"; // Icono de inventario

// Tipos
import type { Product } from "../../interfaces/Product";
import { useState, useEffect } from "react";

// Props del componente
interface Props {
  product: Product;              // Producto a mostrar
  showDescription: boolean;      // Si true, mostrar descripción truncada
  onOpenAssign?: () => void;     // Función para abrir modal de asignación
  descriptionTruncated?: string; // Descripción truncada pasada desde DraggableProduct
}

// Componente principal
function ProductItem({ product, showDescription, onOpenAssign, descriptionTruncated }: Props) {
  // Estado del color del producto
  const [color, setColor] = useState(product.color || "#152c48");

  // Efecto para cambiar color según cantidad
  useEffect(() => {
    if (product.quantity >= 100 && product.color !== "#5cc4ed") {
      product.color = "#5cc4ed"; // Cambia color del producto
      setColor("#5cc4ed");       // Actualiza el estado
    }
  }, [product.quantity]);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-1 flex flex-col items-center justify-center gap-1 border cursor-grab active:cursor-grabbing">
      
      {/* Cantidad del producto */}
      <div className="text-lg font-bold">{product.quantity}</div>

      {/* Icono principal con color */}
      <div
        className="
          w-10 h-10 rounded-xl flex items-center justify-center text-xl 
          transition-all duration-200
          hover:shadow-lg hover:scale-105
        "
        style={{
          backgroundColor: `${color}15`, // fondo muy sutil
        }}
      >
        <LocalMallOutlinedIcon
          sx={{
            color,              // color del icono
            transition: "0.2s",
            "&:hover": { filter: "brightness(1.2)" }, // efecto hover
          }}
        />
      </div>

      {/* Texto principal */}
      <div className="text-gray-700 text-center">
        {showDescription
          ? (descriptionTruncated || product.description || product.name) // mostrar descripción truncada
          : product.name} 
      </div>

      {/* Botón de asignar a múltiples cajas (visible si cantidad > 5) */}
      {product.quantity > 5 && (
        <button
          className="absolute top-3 right-3 p-1 active:scale-95 transition no-drag"
          onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }} // evita iniciar drag
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onOpenAssign?.(); // abre modal de asignación
          }}
        >
          <Inventory2OutlinedIcon /> {/* Icono de inventario */}
        </button>
      )}

    </div>
  );
}

// Exportamos componente
export default ProductItem;
