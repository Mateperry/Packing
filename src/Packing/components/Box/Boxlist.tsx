// Tipos
import type { Product } from "../../interfaces/Product";

// Componentes hijos e iconos
import BoxCard from "./BoxCard";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Props del componente
interface Props {
  boxes: { id: number; productos: Product[] }[];
  eliminarCaja: (index: number) => void;
  agregarCaja: () => void;
  decrementOne: (boxId: number, productId: number) => void;
  removeProduct: (boxId: number, productId: number) => void;
  onMarkBoxReady?: (boxId: number, productos: Product[]) => void;
  readyBoxIds?: number[];
  productsCount?: number;
  isReadyBoxesOpen?: boolean;
  onToggleReadyBoxes?: () => void;
  readyBoxesCount?: number;
}

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
  // cajas visibles SOLO para render
  const visibleBoxes = boxes
    .map((box, index) => ({ box, index }))
    .filter(({ box }) => !readyBoxIds.includes(box.id));

  const totalProductos = boxes.reduce(
    (total, box) =>
      total + box.productos.reduce((sum, p) => sum + p.quantity, 0),
    0
  );

  const allBoxesEmpty = boxes.every((b) => b.productos.length === 0);

  const visibleBoxesCount =
    productsCount === 0 && allBoxesEmpty ? 0 : visibleBoxes.length;

  // ✅ Verificamos si hay alguna caja vacía
  const anyEmptyBox = visibleBoxes.some(({ box }) => box.productos.length === 0);

  return (
    <div className="rounded-sm bg-gray-50 overflow-visible m">
      {/* HEADER */}
      <div className="flex justify-between items-center px-2 py-2 mb-2 border-b gap-2">
        <div className="text-gray-700 text-xs flex gap-3">
          <span>
            Total de cajas: <strong>{visibleBoxesCount}</strong>
          </span>
          <span>
            Total de productos: <strong>{totalProductos}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Confirmar cajas */}
          <button
            onClick={() => {
              visibleBoxes.forEach(({ box, index }) => {
                if (box.productos.length > 0) {
                  onMarkBoxReady?.(index, box.productos);
                }
              });
            }}
            disabled={anyEmptyBox || visibleBoxes.length === 0} 
            className="bg-[#152c48] disabled:opacity-50 disabled:cursor-not-allowed
                       text-white px-3 py-2 rounded-full shadow-md 
                       hover:bg-[#12303f] transition flex items-center gap-1 text-sm"
          >
            <CheckIcon className="text-white text-sm" />
            <span className="hidden md:inline">Confirmar cajas</span>
          </button>

          {/* Agregar caja */}
          <button
            onClick={agregarCaja}
            disabled={productsCount === 0 && allBoxesEmpty} // ✅ Desactiva si no hay productos
            className="bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed
                       text-white px-3 py-2 rounded-full shadow-md 
                       hover:bg-orange-600 transition flex items-center gap-1 text-sm"
          >
            <AddCircleIcon className="text-white text-sm" />
            <span className="hidden md:inline">Agregar caja</span>
          </button>

          {/* Panel de cajas listas */}
          {readyBoxesCount > 0 && (
            <button
              onClick={onToggleReadyBoxes}
              className="bg-[#152c48] text-white px-3 py-2 rounded-full shadow-md 
                         hover:bg-[#0d2236] transition flex items-center gap-1 text-sm"
            >
              {isReadyBoxesOpen ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
              <span className="hidden md:inline">Ver listas</span>
            </button>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      {productsCount === 0 && allBoxesEmpty ? (
        <div className="p-8 text-center text-gray-600 align-center mt-10" >
          <AssignmentTurnedInIcon className="text-[#152c48] text-3xl" />
          <div className="mt-2 font-semibold">Ya empacamos todo</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-3 max-h-[700px] overflow-y-auto">
          {visibleBoxes.map(({ box, index }) => (
            <BoxCard
              key={index}
              titulo="Caja"
              onEliminar={() => eliminarCaja(index)}
              boxId={index}
              productos={box.productos}
              decrementOne={decrementOne}
              removeProduct={removeProduct}
              onMarkBoxReady={onMarkBoxReady}
            />
          ))}
        </div>
      )}
    </div>
  );
}
