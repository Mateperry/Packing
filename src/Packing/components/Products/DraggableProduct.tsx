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
  onOpenAssign,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `product-${product.id}`,
    data: { type: "PRODUCT", product },
    disabled,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const truncatedDescription =
    product.description && product.description.length > 20
      ? product.description.slice(0, 20) + "..."
      : product.description || "";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        opacity: disabled ? 0.4 : isDragging ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "grab",
      }}
      className="
        relative
        select-none
        touch-none
      "
      onPointerDown={(e) => {
        const isNoDrag = (e.target as HTMLElement).closest(".no-drag");
        if (isNoDrag) {
          e.stopPropagation();
        }
      }}
    >
      <ProductItem
        product={product}
        showDescription={showDescription}
        descriptionTruncated={truncatedDescription}
        onOpenAssign={onOpenAssign}
      />
    </div>
  );
}
