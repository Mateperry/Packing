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
    data: {
      type: "PRODUCT",
      product,
    },
    disabled,
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 9999 : 1,
    opacity: disabled ? 0.4 : isDragging ? 0.85 : 1,
    cursor: disabled ? "not-allowed" : "grab",
    touchAction: "manipulation", // 🔥 clave para mobile
  };

  const truncatedDescription =
    product.description && product.description.length > 20
      ? product.description.slice(0, 20) + "..."
      : product.description || "";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative select-none"
      onPointerDown={(e) => {
        const target = e.target as HTMLElement;
        const isNoDrag = target.closest(".no-drag");

        if (isNoDrag) {
          e.preventDefault();
          return;
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
