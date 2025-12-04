import { useDroppable } from "@dnd-kit/core";

interface Props {
  boxIndex: number;
  children: React.ReactNode;
}

export default function BoxDroppableZone({ boxIndex, children }: Props) {
  const { setNodeRef } = useDroppable({
    id: `box-${boxIndex}`,
    data: { type: "BOX", boxIndex },
  });

  return (
    <div ref={setNodeRef} className="min-h-[120px] flex justify-center items-center">
      {children}
    </div>
  );
}
