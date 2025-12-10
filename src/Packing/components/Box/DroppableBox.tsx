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
      className="
        text-sm sm:text-xs md:text-xs lg:text-sm
        rounded-xl
        min-h-[140px]
        max-h-[250px]
        p-1
        overflow-y-auto
      "
      style={{
        border: isOver ? "2px dashed #31C950" : "2px solid transparent",
      }}
    >
      {children}
    </div>
  );
}
