import { useDraggable } from "@dnd-kit/core";
import ProductItem from "./ProductItem";
import type { Product } from "../interfaces/Product";

interface Props {
  product: Product;
}

export default function DraggableProduct({ product }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `product-${product.id}`,
      data: { type: "PRODUCT", product },
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
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
      }}
    >
      <ProductItem product={product} />
    </div>
  );
}
