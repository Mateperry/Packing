import { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import ProductList from "../components/Products/ProductList";
import BoxList from "../components/Box/Boxlist";
import HomeButtons from "../components/common/HomeButtons";
import DragQuantityModal from "../components/UI/DragQuantityModal";
import ReadyBoxesPanel from "../components/UI/ReadyBoxesPanel";

import { usePackingService } from "./../Hooks/Shipping/usePackingService";
import { useBoxShipping } from "../Hooks/Shipping/useBoxShipping";

import type { Product } from "../interfaces/Product";

interface PackingPageProps {
  orderId: string;
  orderProducts?: Product[];
  onCancel?: () => void;
  onFinishProcess?: (readyBoxes: any[]) => void;
}

function PackingPage({
  orderProducts,
  onCancel,
  onFinishProcess,
}: PackingPageProps) {
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
  const [isReadyBoxesOpen, setIsReadyBoxesOpen] = useState(true);

  /* =========================
     ✅ CONDICIÓN FINALIZAR
  ========================= */
const remainingProducts = products.reduce(
  (sum, p) => sum + (p.quantity || 0),
  0
);

const canFinish =
  remainingProducts === 0 &&
  boxes.every((box) => box.productos.length === 0);


  const handleMarkBoxReady = (boxId: number, productos: Product[]) => {
    markBoxReady({
      titulo: `Caja ${boxId + 1}`,
      productos,
      sourceIndex: boxId,
    });

    resetBox(boxId);
    setIsReadyBoxesOpen(true);
  };

  const handleRestoreReady = (readyBoxId: number) => {
    const box = readyBoxes.find((b) => b.id === readyBoxId);
    if (!box) return;

    const sourceIndex =
      typeof box.sourceIndex === "number" ? box.sourceIndex : undefined;

    if (typeof sourceIndex === "number") {
      restoreProductsToIndex(
        sourceIndex,
        box.productos.map((p) => ({ ...p }))
      );
    } else {
      restoreProductsToFirstEmptyBox(
        box.productos.map((p) => ({ ...p }))
      );
    }

    unmarkBoxReady(readyBoxId);
  };

  const handleFinishProcess = () => {
    if (!canFinish || readyBoxes.length === 0) return;
    onFinishProcess?.(readyBoxes);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  return (
    <div className="p-3 bg-white rounded-xl shadow-lg max-w-full mx-auto mb-5 overflow-y-auto h-[100dvh]">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center mb-6 gap-6 w-full">
          <h2 className="bg-[#152c48] text-white text-center py-3 px-6 rounded-full text-lg font-sans w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>

          <HomeButtons
            onCancel={onCancel}
            onFinish={handleFinishProcess}
            canFinish={canFinish}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <ProductList
            products={products}
            assignToMultipleBoxes={assignToMultipleBoxes}
            decreaseQuantity={decreaseQuantity}
          />

          <div className="flex-1 bg-gray-50 rounded-xl p-2 shadow-inner">
            <BoxList
              boxes={boxes}
              eliminarCaja={eliminarCaja}
              agregarCaja={aumentarCajas}
              decrementOne={decrementOne}
              removeProduct={handleRemoveProduct}
              onMarkBoxReady={handleMarkBoxReady}
              readyBoxIds={readyBoxes
                .map((b) => b.sourceIndex)
                .filter((v): v is number => typeof v === "number")}
              productsCount={products.reduce(
                (sum, p) => sum + (p.quantity || 0),
                0
              )}
              isReadyBoxesOpen={isReadyBoxesOpen}
              onToggleReadyBoxes={() => setIsReadyBoxesOpen((s) => !s)}
              readyBoxesCount={readyBoxes.length}
            />
          </div>
        </div>
      </DndContext>

      <ReadyBoxesPanel
        readyBoxes={readyBoxes}
        onRestore={handleRestoreReady}
        isOpen={isReadyBoxesOpen}
        onClose={() => setIsReadyBoxesOpen(false)}
      />

      <DragQuantityModal
        isOpen={isQuantityModalOpen}
        product={quantityModalProduct ?? null}
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
