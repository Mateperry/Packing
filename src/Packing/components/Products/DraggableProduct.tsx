import { useDraggable } from "@dnd-kit/core";
import ProductItem from "./ProductItem";
import type { Product } from "../../interfaces/Product";

interface Props {
  product: Product;
  disabled?: boolean;
  showDescription: boolean; //  NUEVO
}

export default function DraggableProduct({ product, disabled = false, showDescription }: Props) {
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
      {...listeners}
      {...attributes}
      style={{
        ...style,
        opacity: disabled ? 0.4 : isDragging ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "grab",
      }}
    >
      <ProductItem product={product} showDescription={showDescription} />
    </div>
  );
}
