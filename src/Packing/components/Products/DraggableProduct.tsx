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

      // 🟦 SOLUCIÓN A BLOQUEO DE CLICK
      onPointerDown={(e) => {
        // si el click viene del botón de asignar → permitirlo
        const isAssignButton = (e.target as HTMLElement).closest(".no-drag");
        if (isAssignButton) {
          e.stopPropagation();
          return; // NO PREVENT DEFAULT → permite click normal
        }
      }}
    >
      <ProductItem
        product={product}
        showDescription={showDescription}
        onOpenAssign={onOpenAssign}
      />
    </div>
  );
}
