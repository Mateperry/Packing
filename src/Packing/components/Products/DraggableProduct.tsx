// Importamos hook para hacer elementos arrastrables
import { useDraggable } from "@dnd-kit/core"; 

// Componente visual del producto
import ProductItem from "./ProductItem";

// Tipos
import type { Product } from "../../interfaces/Product";

// Props del componente
interface Props {
  product: Product;          // Producto que se muestra y arrastra
  disabled?: boolean;        // Si true, el producto no se puede arrastrar
  showDescription: boolean;  // Mostrar descripción truncada o no
  onOpenAssign?: () => void; // Función para abrir modal de asignar a varias cajas
}

// Componente principal
export default function DraggableProduct({
  product,
  disabled = false,
  showDescription,
  onOpenAssign
}: Props) {

  // Configuración del drag & drop usando @dnd-kit
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `product-${product.id}`,   // ID único para el draggable
      data: { type: "PRODUCT", product }, // Datos que se envían al contexto drag & drop
      disabled,                      // Deshabilitar arrastre si es true
    });

  // Transform CSS para mover el elemento durante el drag
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  // Truncado de descripción: máximo 20 caracteres con "..."
  const truncatedDescription = product.description
    ? product.description.length > 20
      ? product.description.slice(0, 20) + "..."
      : product.description
    : "";

  return (
    <div
      ref={setNodeRef}      // Referencia del DOM necesaria para drag & drop
      {...attributes}       // Props necesarias para drag & drop
      {...listeners}        // Event listeners para drag & drop
      style={{
        ...style,
        opacity: disabled ? 0.4 : isDragging ? 0.4 : 1, // Transparencia si está deshabilitado o arrastrando
        cursor: disabled ? "not-allowed" : "grab",      // Cursor visual según estado
      }}
      // Evitar que clicks en el botón de asignación detengan el drag
      onPointerDown={(e) => {
        const isAssignButton = (e.target as HTMLElement).closest(".no-drag");
        if (isAssignButton) {
          e.stopPropagation(); // No iniciar arrastre
          return;
        }
      }}
      className="relative group text-sm sm:text-xs md:text-xs lg:text-sm overflow-visible z-[100]"
    >
      {/* Renderizamos el producto */}
      <ProductItem
        product={product}
        descriptionTruncated={truncatedDescription} // descripción truncada
        showDescription={showDescription}          // controlar visibilidad de descripción
        onOpenAssign={onOpenAssign}                // función para abrir modal
      />

      {/* Tooltip: descripción completa al pasar el cursor */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 bottom-full mb-2
          hidden group-hover:flex
          bg-black text-white text-xs p-2 rounded-lg shadow-lg
          max-w-[220px] text-center leading-tight
          z-50
        "
      >
        {product.description} {/* descripción completa */}
      </div>
    </div>
  );
}
