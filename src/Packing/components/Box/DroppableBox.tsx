// src/Packing/components/Box/DroppableBox.tsx

// Importamos useDroppable de dnd-kit para crear una zona donde se pueden soltar elementos arrastrables
import { useDroppable } from "@dnd-kit/core";

// Definimos las props del componente
interface Props {
  boxId: number;               // ID o índice de la caja
  children?: React.ReactNode;  // Elementos hijos que se mostrarán dentro de la caja
}

// Componente funcional DroppableBox
export default function DroppableBox({ boxId, children }: Props) {
  // Configuramos el hook useDroppable para esta caja
  const { isOver, setNodeRef } = useDroppable({
    id: `box-${boxId}`,          // ID único de la zona droppable (ej: box-0, box-1...)
    data: { type: "BOX", boxId }, // Información adicional que se puede usar cuando un producto se suelta aquí
  });

  return (
    // Contenedor de la zona droppable
    // `setNodeRef` conecta el div con la lógica de DnD (drag & drop)
    <div
      ref={setNodeRef}
      className="
        text-sm sm:text-xs md:text-xs lg:text-sm
        rounded-xl
        min-h-[150px]   /* altura mínima para la caja */
        max-h-[200px]   /* altura máxima antes de scroll */
        p-1
        overflow-y-auto  /* scroll vertical si el contenido supera la altura */
      "
      style={{
        // Cambiamos el borde si un elemento está sobre la caja
        border: isOver ? "2px dashed #152c48" : "2px solid transparent",
      }}
    >
      {/* Renderizamos los hijos dentro de la caja, generalmente productos */}
      {children}
    </div>
  );
}

