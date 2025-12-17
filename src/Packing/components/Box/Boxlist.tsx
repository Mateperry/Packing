// Tipos
import type { Product } from "../../interfaces/Product";

// Componentes hijos y iconos
import BoxCard from "./BoxCard";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Props del componente
interface Props {
  boxes: { id: number; productos: Product[] }[];   // Lista de cajas con sus productos
  eliminarCaja: (index: number) => void;          // Función para eliminar una caja
  agregarCaja: () => void;                        // Función para agregar una caja
  decrementOne: (boxId: number, productId: number) => void; // Decrementar cantidad de producto en caja
  removeProduct: (boxId: number, productId: number) => void; // Quitar producto de la caja
  onMarkBoxReady?: (boxId: number, productos: Product[]) => void; // Marcar caja como lista
  readyBoxIds?: number[];   // IDs de cajas ya listas
  productsCount?: number;   // Cantidad total de productos restantes
  isReadyBoxesOpen?: boolean;   // Estado de visibilidad del panel de cajas listas
  onToggleReadyBoxes?: () => void;  // Función para abrir/cerrar panel
  readyBoxesCount?: number;         // Cantidad de cajas listas
}

// Componente principal
export default function BoxList({
  boxes,
  eliminarCaja,
  agregarCaja,
  decrementOne,
  removeProduct,
  onMarkBoxReady,
  readyBoxIds = [],
  productsCount = 0,
  isReadyBoxesOpen = false,
  onToggleReadyBoxes,
  readyBoxesCount = 0,
}: Props) {

  /** ⛔ Excluir cajas que ya están listas */
  const visibleBoxes = boxes.filter((box) => !readyBoxIds.includes(box.id));

  /** 📦 Total de productos en todas las cajas */
  const totalProductos = boxes.reduce(
    (total, box) =>
      total + box.productos.reduce((sum, p) => sum + p.quantity, 0),
    0
  );

  /** Verificar si todas las cajas están vacías */
  const allBoxesEmpty = boxes.every((b) => b.productos.length === 0);

  /** Contar cajas visibles (si no hay productos ni cajas, count = 0) */
  const visibleBoxesCount = productsCount === 0 && allBoxesEmpty ? 0 : visibleBoxes.length;

  return (
    <div className="rounded-sm bg-gray-50 overflow-visible max-h-screen">
      
      {/* --------------------------- HEADER --------------------------- */}
{/* --------------------------- HEADER --------------------------- */}
<div className="flex justify-between items-center px-2 py-2 mb-2 border-b gap-2">

  {/* Información de total de cajas y productos */}
  <div className="text-gray-700 text-xs flex gap-3">
    <span>
      Total de cajas: <strong>{visibleBoxesCount}</strong>
    </span>
    <span>
      Total de productos: <strong>{totalProductos}</strong>
    </span>
  </div>

  {/* Botones de acciones */}
  <div className="flex items-center gap-2">

    {/* ✅ Botón Confirmar todas las cajas visibles */}
    <button
      onClick={() => {
        visibleBoxes
          .filter((box) => box.productos.length > 0)
          .forEach((box) => onMarkBoxReady?.(box.id, box.productos));
      }}
      disabled={visibleBoxes.length === 0}
      className="bg-[#152c48] disabled:opacity-50 disabled:cursor-not-allowed
                 text-white px-3 py-2 rounded-full shadow-md 
                 hover:bg-[#12303f] transition flex items-center gap-1 text-sm"
    >
      <CheckIcon className="text-white text-sm" />
      <span className="hidden md:inline">Confirmar cajas</span>
    </button>

    {/* ➕ Botón Agregar caja */}
    <button
      onClick={agregarCaja}
      className="bg-orange-500 text-white px-3 py-2 rounded-full shadow-md 
                 hover:bg-orange-600 transition flex items-center gap-1 text-sm"
    >
      <AddCircleIcon className="text-white text-sm" />
      <span className="hidden md:inline">Agregar caja</span>
    </button>

    {/* 🔄 Botón para abrir/cerrar panel de cajas listas */}
    {readyBoxesCount > 0 && (
      <button
        onClick={onToggleReadyBoxes}
        className="bg-[#152c48] text-white px-3 py-2 rounded-full shadow-md 
                   hover:bg-[#0d2236] transition flex items-center gap-1 text-sm"
      >
        {isReadyBoxesOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        <span className="hidden md:inline">Ver listas</span>
      </button>
    )}
  </div>
</div>


      {/* --------------------------- GRID DE CAJAS O MENSAJE EMPTY --------------------------- */}
      {productsCount === 0 && allBoxesEmpty ? (
        // Mensaje cuando no hay productos y todas las cajas están vacías
        <div className="p-8 text-center text-gray-600">
          <AssignmentTurnedInIcon className="text-[#152c48] text-3xl" />
          <div className="mt-2 font-semibold">Ya empacamos todo</div>
        </div>
      ) : (
        // Grid de cajas visibles
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-3 max-h-[700px] overflow-y-auto">
          {visibleBoxes.map((box) => {
            const realIndex = boxes.findIndex((b) => b.id === box.id); // índice real en array original
            return (
              <BoxCard
                key={box.id}
                titulo={`Caja ${box.id + 1}`}   // título de caja
                onEliminar={() => eliminarCaja(realIndex)} // eliminar caja
                boxId={box.id}                // id de la caja
                productos={box.productos}      // productos dentro de la caja
                decrementOne={decrementOne}   // decrementar cantidad de un producto
                removeProduct={removeProduct} // quitar producto
                onMarkBoxReady={onMarkBoxReady} // marcar caja lista
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
