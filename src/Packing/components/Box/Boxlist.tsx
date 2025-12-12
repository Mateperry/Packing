// src/Packing/components/Boxes/BoxList.tsx
import type { Product } from "../../interfaces/Product";
import BoxCard from "./BoxCard";
import CheckIcon from '@mui/icons-material/Check';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface Props {
  boxes: { id: number; productos: Product[] }[];
  mostrarTitulos: boolean[];
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
    const visibleBoxes = boxes.filter((box) => !readyBoxIds.includes(box.id));

  
  const totalProductos = boxes.reduce(
    (totalItems, box) =>
      totalItems +
      box.productos.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
  const allBoxesEmpty = boxes.every((b) => b.productos.length === 0);

  return (
    <div className="rounded-sm bg-gray-50  overflow-visible max-h-screen">

      {/*  HEADER SUPERIOR (Opción 1 Profesional) */}
      <div className="flex justify-between items-center px-2 py-2 mb-2 border-b gap-2">

        {/*  Totales a la IZQUIERDA */}
        <div className="text-gray-700 text-xs flex gap-3">
          <span>
            Total de cajas: <strong>{visibleBoxes.length}</strong>
          </span>

          <span>
            Total de productos: <strong>{totalProductos}</strong>
          </span>
        </div>

        {/* Contenedor para DOS BOTONES a la DERECHA */}
<div className="flex items-center gap-2">

  {/* Botón Confirmar Caja */}
  <div className="relative group">
    <button
      onClick={() => {
        if (visibleBoxes.length > 0) {
          visibleBoxes.forEach((box) => {
            if (box.productos.length > 0) {
              onMarkBoxReady?.(box.id, box.productos);
            }
          });
        }
      }}
      className="bg-[#152c48] text-white p-2 rounded-full shadow-md hover:bg-[#12303f] text-sm transition flex items-center justify-center"
    >
      <CheckIcon className="text-white" fontSize="small" />
    </button>
    {/* Tooltip */}
    <span
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded-md opacity-0 
                 group-hover:opacity-100 transition pointer-events-none shadow"
    >
      Confirmar Todas
    </span>
  </div>


  {/* Botón Agregar Caja */}
  <div className="relative group">
    <button
      onClick={agregarCaja}
      className="bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 text-sm transition flex items-center justify-center"
    >
      <AddCircleIcon className="text-white" fontSize="small" />
    </button>
    {/* Tooltip */}
    <span
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded-md opacity-0 
                 group-hover:opacity-100 transition pointer-events-none shadow"
    >
      Agregar caja
    </span>
  </div>

  {/* Botón Cajas Listas (nuevo lugar, con icono original) */}
  {readyBoxesCount > 0 && (
    <div className="relative group">
      <IconButton
        onClick={onToggleReadyBoxes}
        size="small"
        sx={{
          backgroundColor: '#152c48',
          color: 'white',
          width: 32,
          height: 32,
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          '&:hover': {
            backgroundColor: '#0d2236',
            transform: 'scale(1.08)'
          }
        }}
        aria-label="Cajas listas"
      >
        {isReadyBoxesOpen ? (
          <ChevronRightIcon fontSize="small" />
        ) : (
          <ChevronLeftIcon fontSize="small" />
        )}
      </IconButton>
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
                   bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded-md opacity-0 
                   group-hover:opacity-100 transition pointer-events-none shadow"
      >
        Ver listas
      </span>
    </div>
  )}

</div>


      </div>

      {/* GRID DE CAJAS */}
      {productsCount === 0 && allBoxesEmpty ? (
        <div className="p-8 text-center text-gray-600">
          <div className="text-2xl"><AssignmentTurnedInIcon className="text-[#152c48]" /></div>
          <div className="mt-2 font-semibold">Ya empacamos todo</div>
          <div className="text-sm mt-1 text-gray-500">No hay productos pendientes de empacar.</div>
        </div>
      ) : (
        <div
          
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 
  gap-3 overflow-y-auto     max-h-[700px] px-3 
  pr-2"
>

          {visibleBoxes.map((box, index) => (
            <BoxCard
              key={box.id}
              titulo={`Caja ${index + 1}`}
              onEliminar={() => eliminarCaja(index)}
              boxId={box.id}
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
