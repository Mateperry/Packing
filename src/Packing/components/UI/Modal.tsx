// Definimos las props que recibirá el componente
interface Props {
  isOpen: boolean; // Controla si el modal está abierto o cerrado
  onClose: () => void; // Función que se ejecuta al cerrar el modal
  children: React.ReactNode; // Contenido que se mostrará dentro del modal
}

// Componente principal
export default function Modal({ isOpen, onClose, children }: Props) {
  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    // Contenedor principal del modal
    // fixed: se mantiene en pantalla, inset-0: ocupa toda la pantalla
    // bg-black/40: fondo semitransparente
    // flex justify-center items-center: centra el contenido
    // z-50: se asegura que esté por encima de otros elementos
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      {/* Contenedor interno del modal */}
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl relative">
        
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose} // ejecuta la función de cerrar
          className="absolute top-2 right-2 text-gray-500 text-xl" // posición y estilo
        >
          ✕ {/* icono de cerrar */}
        </button>

        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
}
