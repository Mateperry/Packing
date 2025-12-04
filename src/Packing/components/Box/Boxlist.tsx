import type { Product } from "../../interfaces/Product";
import BoxCard from "./BoxCard";

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
  return (
    <div className="rounded-sm bg-gray-50 my-scroll overflow-auto">
      {/* GRID DE CAJAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 
            gap-3 overflow-auto 
            max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] lg:max-h-[95vh] xl:max-h-[100vh]
             pr-2">
        {boxes.map((box, index) => (
  <BoxCard
    key={index}
    titulo={`Caja ${index + 1}`}
    onEliminar={() => eliminarCaja(index)}
    boxId={box.id} //  ESTE ES EL IMPORTANTE
    productos={box.productos}
    decrementOne={decrementOne}
    removeProduct={removeProduct}
  />
))}

      </div>

      {/* BOTÓN PARA AGREGAR CAJA */}
<p className="text-center mt-4 text-gray-700 text-xs">
  Total de cajas: <strong>{boxes.length}</strong>
</p>

      <button
        onClick={agregarCaja}
        className="flex items-center gap-2 mx-auto mt-2 bg-orange-500 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-orange-600 transition"
      >
        + Agregar caja
      </button>

      {/* CONTADOR */}

      <p className="text-center mt-2 text-gray-700">
        Total de Productos:{" "}
      <strong>
    {boxes.reduce(
      (totalItems, box) =>
        totalItems + box.productos.reduce((sum, item) => sum + item.quantity, 0),
      0
    )}
  </strong>
</p>

    </div>
  );
}
