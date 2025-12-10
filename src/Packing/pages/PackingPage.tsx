// src/Packing/pages/PackingPage.tsx
import {
  DndContext,     
  PointerSensor, 
  TouchSensor,   
  MouseSensor,   
  useSensor,     
  useSensors,    
} from "@dnd-kit/core";

import ProductList from "../components/Products/ProductList";
import BoxList from "../components/Box/Boxlist";
import HomeButtons from "../components/common/HomeButtons";
import { usePackingService } from "../Hooks/usePackingService";

function PackingPage() {
  const {
    products,
    boxes,
    mostrarTitulos,
    eliminarCaja,
    aumentarCajas,
    handleDragEnd,
    handleRemoveProduct,
    decrementOne,
    assignToBox,
    assignToMultipleBoxes,
    decreaseQuantity,
  } = usePackingService();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 5, tolerance: 0 },
    }),
    useSensor(PointerSensor)
  );

  return (
    <div className="p-3 bg-white rounded-xl shadow-lg max-w-full mx-auto mb-5 my-scroll">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center mb-6 gap-6">
          <h2 className="bg-green-600 text-white text-center py-3 px-6 rounded-full text-lg font-sans w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>
          <HomeButtons />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Lista de productos disponibles */}
          <ProductList
            products={products}
            boxes={boxes}
            assignToBox={assignToBox}
            assignToMultipleBoxes={assignToMultipleBoxes}
            decreaseQuantity={decreaseQuantity}
            
          />

          {/* Contenedor de cajas */}
          <div className="flex-1 bg-gray-50 rounded-xl p-2 shadow-inner">
            <BoxList
              boxes={boxes}
              mostrarTitulos={mostrarTitulos}
              eliminarCaja={eliminarCaja}
              agregarCaja={aumentarCajas}
              decrementOne={decrementOne}
              removeProduct={handleRemoveProduct}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default PackingPage;
