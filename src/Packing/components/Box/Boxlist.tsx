// src/Packing/components/Boxes/BoxList.tsx
import type { Product } from "../../interfaces/Product";
import BoxCard from "./BoxCard";
import CheckIcon from '@mui/icons-material/Check';
import AddCircleIcon from '@mui/icons-material/AddCircle';
interface Props {
  boxes: { id: number; productos: Product[] }[];
  mostrarTitulos: boolean[];
  eliminarCaja: (index: number) => void;
  agregarCaja: () => void;
  decrementOne: (boxId: number, productId: number) => void;
  removeProduct: (boxId: number, productId: number) => void;
}

export default function BoxList({
  boxes,
  eliminarCaja,
  agregarCaja,
  decrementOne,
  removeProduct,
}: Props) {
  
  const totalProductos = boxes.reduce(
    (totalItems, box) =>
      totalItems +
      box.productos.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  return (
    <div className="rounded-sm bg-gray-50  overflow-visible">

      {/*  HEADER SUPERIOR (Opción 1 Profesional) */}
      <div className="flex justify-between items-center px-3 py-3 mb-3 border-b">

        {/*  Totales a la IZQUIERDA */}
        <div className="text-gray-700 text-sm flex gap-6">
          <span>
            Total de cajas: <strong>{boxes.length}</strong>
          </span>

          <span>
            Total de productos: <strong>{totalProductos}</strong>
          </span>
        </div>

        {/* Contenedor para DOS BOTONES a la DERECHA */}
<div className="flex items-center gap-3">

  {/* Botón Confirmar Caja */}
  <div className="relative group">
    <button
      onClick={() => console.log("Confirmar cajas")}
      className="bg-[#152c48] text-white p-3 rounded-full shadow-md hover:bg-[#12303f] 
                 transition flex items-center justify-center"
    >
      <CheckIcon className="text-white" />
    </button>

    {/* Tooltip */}
    <span
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 
                 group-hover:opacity-100 transition pointer-events-none shadow"
    >
      Confirmar cajas
    </span>
  </div>

  {/* Botón Agregar Caja */}
  <div className="relative group">
    <button
      onClick={agregarCaja}
      className="bg-orange-500 text-white p-3 rounded-full shadow-md hover:bg-orange-600 
                 transition flex items-center justify-center"
    >
      <AddCircleIcon className="text-white" />
    </button>

    {/* Tooltip */}
    <span
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 
                 group-hover:opacity-100 transition pointer-events-none shadow"
    >
      Agregar caja
    </span>
  </div>

</div>


      </div>

      {/* GRID DE CAJAS */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 
        gap-3 overflow-auto 
        max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] lg:max-h-[95vh] xl:max-h-[90vh]
        pr-2"
      >
        {boxes.map((box, index) => (
          <BoxCard
            key={box.id}
            titulo={`Caja ${index + 1}`}
            onEliminar={() => eliminarCaja(index)}
            boxId={box.id}
            productos={box.productos}
            decrementOne={decrementOne}
            removeProduct={removeProduct}
          />
        ))}
      </div>

    </div>
  );
}
