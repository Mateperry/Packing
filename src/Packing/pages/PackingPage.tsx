// src/Packing/pages/PackingPage.tsx

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// Componentes
import ProductList from "../components/Products/ProductList";
import BoxList from "../components/Box/Boxlist";
import HomeButtons from "../components/common/HomeButtons";
import DragQuantityModal from "../components/UI/DragQuantityModal";
import ReadyBoxesPanel from "../components/UI/ReadyBoxesPanel";

// Hooks personalizados
import { usePackingService } from "../Hooks/Shipping/usePackingService";
import { useBoxShipping } from "../Hooks/Shipping/useBoxShipping";

// Tipos
import type { Product } from "../interfaces/Product";

interface PackingPageProps {
  orderId: string;
  orderProducts?: Product[];
  onCancel?: () => void;
}

function PackingPage({ orderProducts, onCancel }: PackingPageProps) {
  // ⚡ Hooks principales
  const {
    products,
    boxes,
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
  } = usePackingService(orderProducts);

  const { readyBoxes, markBoxReady, unmarkBoxReady } = useBoxShipping();
  const [isReadyBoxesOpen, setIsReadyBoxesOpen] = useState(false);

  // Marcar caja lista
  const handleMarkBoxReady = (boxId: number, productos: Product[]) => {
    markBoxReady({
      titulo: `Caja ${boxId + 1}`,
      productos,
      sourceIndex: boxId,
    });
    resetBox(boxId);
  };

  // Restaurar caja lista
  const handleRestoreReady = (readyBoxId: number) => {
    const box = readyBoxes.find((b) => b.id === readyBoxId);
    if (!box) return;

    const sourceIndex =
      typeof box.sourceIndex === "number" ? box.sourceIndex : undefined;

    if (typeof sourceIndex === "number" && boxes[sourceIndex]?.productos.length === 0) {
      restoreProductsToIndex(sourceIndex, box.productos.map((p) => ({ ...p })));
    } else {
      restoreProductsToFirstEmptyBox(box.productos.map((p) => ({ ...p })));
    }

    unmarkBoxReady(readyBoxId);
  };

  // Sensores para drag & drop
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 5, tolerance: 0 } }),
    useSensor(PointerSensor)
  );

  return (
    <div className="p-3 bg-white rounded-xl shadow-lg max-w-full mx-auto mb-5 my-scroll">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {/* HEADER */}
        <div className="flex flex-col items-center mb-6 gap-6 w-full">
          <h2 className="bg-[#152c48] text-white text-center py-3 px-6 rounded-full text-lg font-sans w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>
          <HomeButtons onCancel={onCancel} />
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Lista de productos */}
          <ProductList
            products={products}
            assignToMultipleBoxes={assignToMultipleBoxes}
            decreaseQuantity={decreaseQuantity}
          />

          {/* Contenedor de cajas */}
          <div className="flex-1 bg-gray-50 rounded-xl p-2 shadow-inner">
            <BoxList
              boxes={boxes}
              eliminarCaja={eliminarCaja}
              agregarCaja={aumentarCajas}
              decrementOne={decrementOne}
              removeProduct={handleRemoveProduct}
              onMarkBoxReady={handleMarkBoxReady}
              readyBoxIds={readyBoxes.map((b) => b.id)}
              productsCount={products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
              isReadyBoxesOpen={isReadyBoxesOpen}
              onToggleReadyBoxes={() => setIsReadyBoxesOpen((s) => !s)}
              readyBoxesCount={readyBoxes.length}
            />
          </div>
        </div>
      </DndContext>

      {/* Panel de cajas listas */}
      <ReadyBoxesPanel
        readyBoxes={readyBoxes}
        onRestore={handleRestoreReady}
        isOpen={isReadyBoxesOpen}
        onClose={() => setIsReadyBoxesOpen(false)}
      />

      {/* Modal de cantidad para drag & drop */}
      <DragQuantityModal
        isOpen={isQuantityModalOpen}
        product={quantityModalProduct ?? undefined} // nunca null para evitar romper hooks
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
