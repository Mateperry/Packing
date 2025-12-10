import { useDraggable } from "@dnd-kit/core"; 
import ProductItem from "./ProductItem";
import type { Product } from "../../interfaces/Product";

interface Props {
  product: Product;
  disabled?: boolean;
  showDescription: boolean;
  onOpenAssign?: () => void;
}

export default function DraggableProduct({
  product,
  disabled = false,
  showDescription,
  onOpenAssign
}: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `product-${product.id}`,
      data: { type: "PRODUCT", product },
      disabled,
    });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  // Truncado seguro: 20 caracteres
  const truncatedDescription = product.description
    ? product.description.length > 20
      ? product.description.slice(0, 20) + "..."
      : product.description
    : "";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        opacity: disabled ? 0.4 : isDragging ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "grab",
      }}
      // SOLUCIÓN A BLOQUEO DE CLICK
      onPointerDown={(e) => {
        const isAssignButton = (e.target as HTMLElement).closest(".no-drag");
        if (isAssignButton) {
          e.stopPropagation();
          return;
        }
      }}
      className="relative group text-sm sm:text-xs md:text-xs lg:text-sm overflow-visible"
    >
      {/* envío el producto original y el truncado como prop separado */}
      <ProductItem
        product={product}
        descriptionTruncated={truncatedDescription}
        showDescription={showDescription}
        onOpenAssign={onOpenAssign}
      />

      {/* TOOLTIP — descripción completa en hover */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 bottom-full mb-2
          hidden group-hover:flex
          bg-black text-white text-xs p-2 rounded-lg shadow-lg
          max-w-[220px] text-center leading-tight
          z-50
        "
      >
        {product.description}
      </div>
    </div>
  );
}
