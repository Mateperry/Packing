// DroppableBox.tsx
import { useDroppable } from "@dnd-kit/core";
import BoxContend from "./BoxContend";

interface Props {
  boxId: number;
  children?: React.ReactNode; // para mostrar productos dentro
}

export default function DroppableBox({ boxId, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: `box-${boxId}`,
    data: { type: "BOX", boxId },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: isOver ? "2px dashed #f97316" : "2px solid transparent",
        borderRadius: "12px",
      }}
    >
      <BoxContend />
      {children}
    </div>
  );
}
