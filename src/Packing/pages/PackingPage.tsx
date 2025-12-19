// src/Packing/pages/PackingPage.tsx
import { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
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
  // =============================
  // HOOK PRINCIPAL DE PACKING
  // =============================
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

  // =============================
  // CAJAS LISTAS
  // =============================
  const { readyBoxes, markBoxReady, unmarkBoxReady } = useBoxShipping();
  const [isReadyBoxesOpen, setIsReadyBoxesOpen] = useState(true);

  // Marcar caja como lista y abrir panel
  const handleMarkBoxReady = (boxId: number, productos: Product[]) => {
    markBoxReady({
      titulo: `Caja ${boxId + 1}`,
      productos,
      sourceIndex: boxId,
    });

    resetBox(boxId);

    // Abrir panel para mostrar la caja recién marcada
    setIsReadyBoxesOpen(true);
  };

  // Restaurar caja desde el panel de listas
  const handleRestoreReady = (readyBoxId: number) => {
    const box = readyBoxes.find((b) => b.id === readyBoxId);
    if (!box) return;

    const sourceIndex =
      typeof box.sourceIndex === "number" ? box.sourceIndex : undefined;

    // Restaurar productos a la caja original si sourceIndex existe
    if (typeof sourceIndex === "number") {
      restoreProductsToIndex(
        sourceIndex,
        box.productos.map((p) => ({ ...p }))
      );
    } else {
      // Si no hay índice, restaurar a la primera caja vacía
      restoreProductsToFirstEmptyBox(
        box.productos.map((p) => ({ ...p }))
      );
    }

    // Quitar la caja del panel de listas
    unmarkBoxReady(readyBoxId);
  };

  // =============================
  // CONFIGURACIÓN DND-KIT
  // =============================
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  // =============================
  // RENDER
  // =============================
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

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* LISTA DE PRODUCTOS */}
          <ProductList
            products={products}
            assignToMultipleBoxes={assignToMultipleBoxes}
            decreaseQuantity={decreaseQuantity}
          />

          {/* LISTA DE CAJAS */}
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
              productsCount={products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
              isReadyBoxesOpen={isReadyBoxesOpen}
              onToggleReadyBoxes={() => setIsReadyBoxesOpen((s) => !s)}
              readyBoxesCount={readyBoxes.length}
            />
          </div>
        </div>
      </DndContext>

      {/* PANEL DE CAJAS LISTAS */}
      <ReadyBoxesPanel
        readyBoxes={readyBoxes}
        onRestore={handleRestoreReady}
        isOpen={isReadyBoxesOpen}
        onClose={() => setIsReadyBoxesOpen(false)}
      />

      {/* MODAL DE CANTIDAD */}
      <DragQuantityModal
        isOpen={isQuantityModalOpen}
        product={quantityModalProduct ?? null}
        quantity={quantityModalQuantity}
        onQuantityChange={updateQuantityModalQuantity}
        onConfirm={() => {
          if (quantityModalProduct && quantityModalBoxId !== null) {
            handleConfirmDragQuantity(quantityModalProduct, quantityModalBoxId, quantityModalQuantity);
          }
        }}
        onCancel={closeQuantityModal}
      />
    </div>
  );
}

export default PackingPage;
