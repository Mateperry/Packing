import type { Product } from "../interfaces/Product";
import BoxCard from "./BoxCard";

interface Props {
  boxes: { id: number; productos: Product[] }[];
  mostrarTitulos: boolean[];
  alternarTitulo: (index: number) => void;
  eliminarCaja: (index: number) => void;
  agregarCaja: () => void;
  updateProductQuantity: (boxId: number, productId: number, delta: number) => void;
  removeProduct: (boxId: number, productId: number) => void;
}

export default function BoxList({
  boxes,
  mostrarTitulos,
  alternarTitulo,
  eliminarCaja,
  agregarCaja,
  updateProductQuantity,
  removeProduct,
}: Props) {
  return (
    <div className="rounded-2xl bg-gray-50 p-2">
      {/* GRID DE CAJAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 overflow-auto max-h-[80vh]">
        {boxes.map((box, index) => (
          <BoxCard
            key={box.id}
            titulo={`Caja ${box.id + 1}`}
            mostrarTitulo={mostrarTitulos[index]}
            alternarTitulo={() => alternarTitulo(index)}
            onEliminar={() => eliminarCaja(index)}
            boxId={box.id}
            productos={box.productos}
            updateProductQuantity={updateProductQuantity}
            removeProduct={removeProduct}
          />
        ))}
      </div>

      {/* BOTÓN PARA AGREGAR CAJA */}
      <button
        onClick={agregarCaja}
        className="flex items-center gap-2 mx-auto mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-orange-600 transition"
      >
        + Agregar caja
      </button>

      {/* CONTADOR */}
      <p className="text-center mt-4 text-gray-700">
        Total de cajas: <strong>{boxes.length}</strong>
      </p>
    </div>
  );
}
