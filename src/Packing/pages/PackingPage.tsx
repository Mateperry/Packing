// src/Packing/pages/PackingPage.tsx
import {
  DndContext,     
  PointerSensor, 
  TouchSensor,   
  MouseSensor,   
  useSensor,     
  useSensors,    
} from "@dnd-kit/core";

import { useState } from 'react';
import ProductList from "../components/Products/ProductList";
import BoxList from "../components/Box/Boxlist";
import HomeButtons from "../components/common/HomeButtons";
import DragQuantityModal from "../components/UI/DragQuantityModal";
import ReadyBoxesPanel from "../components/UI/ReadyBoxesPanel";
import { usePackingService } from "../Hooks/usePackingService";
import { useBoxShipping } from "../Hooks/useBoxShipping";

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
    assignToMultipleBoxes,
    decreaseQuantity,
    isQuantityModalOpen,
    quantityModalProduct,
    quantityModalBoxId,
    quantityModalQuantity,
    closeQuantityModal,
    updateQuantityModalQuantity,
    handleConfirmDragQuantity,
    resetBox,
    restoreProductsToFirstEmptyBox,
    restoreProductsToIndex,
  } = usePackingService();

  const { readyBoxes, markBoxReady, unmarkBoxReady } = useBoxShipping();
  const [isReadyBoxesOpen, setIsReadyBoxesOpen] = useState(false);

  const handleMarkBoxReady = (boxId: number, productos: any[]) => {
    // create a title based on position (human-friendly)
    markBoxReady({
      titulo: `Caja ${boxId + 1}`,
      productos,
      sourceIndex: boxId,
    });

    // reset the current box to be empty (keeps slot number)
    resetBox(boxId);
  };

  const handleRestoreReady = (readyBoxId: number) => {
    const box = readyBoxes.find((b) => b.id === readyBoxId);
    if (!box) return;

    // Prefer restore to the original sourceIndex if available and empty.
    const sourceIndex = typeof box.sourceIndex === "number" ? box.sourceIndex : undefined;
    if (typeof sourceIndex === "number" && boxes[sourceIndex] && boxes[sourceIndex].productos.length === 0) {
      restoreProductsToIndex(sourceIndex, box.productos.map((p) => ({ ...p })) as any);
    } else {
      // Otherwise restore to the first empty box available
      restoreProductsToFirstEmptyBox(box.productos.map((p) => ({ ...p })) as any);
    }

    // remove from ready list
    unmarkBoxReady(readyBoxId);
  };


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
        <div className="flex flex-col items-center mb-6 gap-6 w-full">
          <h2 className="bg-[#152c48] text-[#fff] text-center py-3 px-6 rounded-full text-lg font-sans w-full">
            DISTRIBUCIÓN DE PRODUCTOS 
          </h2>
          <HomeButtons
            

          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Lista de productos disponibles */}
          <ProductList
            products={products}
            assignToMultipleBoxes={assignToMultipleBoxes}
            decreaseQuantity={decreaseQuantity}
          />

          {/* Contenedor de cajas */}
          <div className="flex-1 bg-gray-50 rounded-xl p-2 shadow-inner">
            {/* pass total item count (sum of quantities) so BoxList shows 'Ya empacamos todo' only when inventory is empty */}
            <BoxList
              boxes={boxes}
              mostrarTitulos={mostrarTitulos}
              eliminarCaja={eliminarCaja}
              agregarCaja={aumentarCajas}
              decrementOne={decrementOne}
              removeProduct={handleRemoveProduct}
              onMarkBoxReady={handleMarkBoxReady}
              readyBoxIds={readyBoxes.map((b) => b.sourceIndex ?? -1)}
              productsCount={products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
              isReadyBoxesOpen={isReadyBoxesOpen}
              onToggleReadyBoxes={() => setIsReadyBoxesOpen((s) => !s)}
              readyBoxesCount={readyBoxes.length}
            />
          </div>
        </div>
      </DndContext>

      {/* Panel de cajas listas para envío */}
      <ReadyBoxesPanel
        readyBoxes={readyBoxes}
        onRestore={handleRestoreReady}
        isOpen={isReadyBoxesOpen}
        onClose={() => setIsReadyBoxesOpen(false)}
      />

      {/* Modal de cantidad para drag & drop */}
      <DragQuantityModal
        isOpen={isQuantityModalOpen}
        product={quantityModalProduct}
        quantity={quantityModalQuantity}
        onQuantityChange={updateQuantityModalQuantity}
        onConfirm={() => {
          if (quantityModalProduct && quantityModalBoxId !== null) {
            handleConfirmDragQuantity(
              quantityModalProduct,
              quantityModalBoxId,
              quantityModalQuantity
            );
          }
        }}
        onCancel={closeQuantityModal}
      />
    </div>
  );
}

export default PackingPage;
