import { useDraggable } from "@dnd-kit/core";
import ProductItem from "./ProductItem";
import type { Product } from "../interfaces/Product";

interface Props {
  product: Product;
  disabled?: boolean; // ✅ Nueva prop para deshabilitar
}

export default function DraggableProduct({ product, disabled = false }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `product-${product.id}`,
      data: { type: "PRODUCT", product },
      disabled, // ✅ Deshabilita drag si es true
    });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        opacity: disabled ? 0.4 : isDragging ? 0.4 : 1, // ✨ Más visible si está deshabilitado
        cursor: disabled ? "not-allowed" : "grab",
      }}
    >
      <ProductItem product={product} />
    </div>
  );
}
