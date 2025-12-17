// src/Packing/components/Box/BoxDroppableZone.tsx

// Importamos useDroppable de dnd-kit, que nos permite crear zonas donde se pueden "soltar" elementos arrastrables
import { useDroppable } from "@dnd-kit/core";

// Definimos las props del componente
interface Props {
  boxIndex: number;       // índice o identificador de la caja
  children: React.ReactNode;  // cualquier contenido que se quiera renderizar dentro de la zona droppable
}

// Componente funcional BoxDroppableZone
export default function BoxDroppableZone({ boxIndex, children }: Props) {
  // Configuramos el hook useDroppable para esta caja
  const { setNodeRef } = useDroppable({
    id: `box-${boxIndex}`,      // ID único de la zona droppable (ej: box-0, box-1...)
    data: { type: "BOX", boxIndex }, // información adicional que se puede usar cuando un producto se suelta aquí
  });

  return (
    // contenedor de la zona droppable
    // setNodeRef conecta este div con la lógica de DnD (drag & drop)
    <div 
      ref={setNodeRef} 
      className="min-h-[150px] flex justify-center items-center"
    >
      {/* Renderizamos los hijos que se pasen, generalmente los productos dentro de la caja */}
      {children}
    </div>
  );
}
