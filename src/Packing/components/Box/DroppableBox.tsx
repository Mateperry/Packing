// DroppableBox.tsx
import { useDroppable } from "@dnd-kit/core";

interface Props {
  boxId: number;
  children?: React.ReactNode;
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
        border: isOver ? "2px dashed #31C950" : "2px solid transparent",
        borderRadius: "12px",
        minHeight: 140,
        maxHeight: 200,
        padding: 12,
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );
}
