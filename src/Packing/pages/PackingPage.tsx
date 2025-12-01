import { DndContext } from "@dnd-kit/core";
import ProductList from "../components/ProductList";
import BoxList from "../components/Boxlist";
import HomeButtons from "../components/HomeButtons";
import { usePackingService } from "../Hooks/usePackingService";

function PackingPage() {
  const {
    products,
    boxes,
    mostrarTitulos,
    alternarTitulo,
    eliminarCaja,
    aumentarCajas,
    handleDragEnd,
    handleRemoveProduct,
    handleUpdateQuantity,
  } = usePackingService();

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto mb-10">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center mb-6 gap-6">
          <h2 className="bg-green-600 text-white text-center py-3 px-6 rounded-full text-lg font-semibold w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>
          <HomeButtons />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <ProductList products={products} />

          <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-inner">
            <BoxList
              boxes={boxes}
              mostrarTitulos={mostrarTitulos}
              alternarTitulo={alternarTitulo}
              eliminarCaja={eliminarCaja}
              agregarCaja={aumentarCajas}
              updateProductQuantity={handleUpdateQuantity}
              removeProduct={handleRemoveProduct}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default PackingPage;
