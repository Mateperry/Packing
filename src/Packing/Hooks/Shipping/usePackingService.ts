import type { Product } from "../../interfaces/Product";
import { useProducts } from "../../Hooks/Products/useProducts";
import { usePackingManager } from "./usePackingManager";
import { useQuantityModal } from "../UI/useQuantityModal";

/* =========================
   HOOK PRINCIPAL
========================= */
export function usePackingService(initialProducts?: Product[]) {
  const { products, decreaseQuantity, increaseQuantity } =
    useProducts(initialProducts);

  const {
    boxes,
    mostrarTitulos,
    eliminarCaja,
    aumentarCajas,
    addToBox,
    decrementOne,
    removeProduct,
    cantidadDeCajas,
    resetBox,
    createEmptyBoxes,
  } = usePackingManager();

  const {
    isOpen: isQuantityModalOpen,
    selectedProduct: quantityModalProduct,
    selectedBox: quantityModalBoxId,
    quantity: quantityModalQuantity,
    openModal: openQuantityModal,
    closeModal: closeQuantityModal,
    updateQuantity: updateQuantityModalQuantity,
  } = useQuantityModal();

  /* =========================
     HELPERS
  ========================= */
  const sanitizeAmount = (amount: number) =>
    Math.max(0, Math.floor(Number(amount) || 0));

  const sanitizeBoxId = (boxId: number) =>
    Number.isInteger(boxId) && boxId >= 0 ? boxId : undefined;

  /* =========================
     ASIGNAR A UNA CAJA
  ========================= */
  function assignToBox(product: Product | number, boxId: number, amount = 1) {
    if (!product || typeof product === "number") return;

    const sanitizedBoxId = sanitizeBoxId(boxId);
    const sanitizedAmount = sanitizeAmount(amount);

    if (sanitizedBoxId === undefined || sanitizedAmount === 0) return;

    decreaseQuantity(product.id, sanitizedAmount);
    addToBox(sanitizedBoxId, product, sanitizedAmount);
  }

  /* =========================
     REPARTIR EN MÚLTIPLES CAJAS
  ========================= */
  function assignToMultipleBoxes(
    product: Product | number,
    amountPerBox: number,
    numberOfBoxes: number
  ) {
    if (!product || typeof product === "number") return;

    const boxesNeeded = Math.floor(numberOfBoxes);
    const amount = Math.floor(amountPerBox);

    if (boxesNeeded <= 0 || amount <= 0) return;
    if (product.quantity < boxesNeeded * amount) return;

    // 1️⃣ Cajas vacías existentes
    const emptyBoxIndexes = boxes
      .map((b, i) => ({ i, productos: b.productos }))
      .filter((b) => b.productos.length === 1)
      .map((b) => b.i);

    const boxesToUse: number[] = [];

    // 2️⃣ Usar vacías primero
    for (const idx of emptyBoxIndexes) {
      if (boxesToUse.length < boxesNeeded) boxesToUse.push(idx);
    }

    // 3️⃣ Crear cajas faltantes
    const missing = boxesNeeded - boxesToUse.length;
    if (missing > 0) {
      createEmptyBoxes(missing);
      const newIndexes = Array.from(
        { length: missing },
        (_, i) => boxes.length + i
      );
      boxesToUse.push(...newIndexes);
    }

    // 4️⃣ Repartir productos
    for (const boxIndex of boxesToUse) {
      addToBox(boxIndex, product, amount);
    }

    // 5️⃣ Descontar inventario
    decreaseQuantity(product.id, boxesNeeded * amount);
  }

  /* =========================
     RESTAURAR PRODUCTOS A CAJAS
  ========================= */
  const restoreProductsToIndex = (boxIndex: number, productos: Product[]) => {
    resetBox(boxIndex);
    productos.forEach((p) => addToBox(boxIndex, p, p.quantity));
  };

  const restoreProductsToFirstEmptyBox = (productos: Product[]) => {
    const firstEmptyIndex = boxes.findIndex((b) => b.productos.length === 0);
    if (firstEmptyIndex >= 0) {
      restoreProductsToIndex(firstEmptyIndex, productos);
    } else {
      aumentarCajas(); // crea nueva caja
      const newIndex = boxes.length; // nueva caja es la última
      restoreProductsToIndex(newIndex, productos);
    }
  };

  /* =========================
     DRAG & DROP
  ========================= */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const isProduct = active?.data?.current?.type === "PRODUCT";
    const product: Product | undefined = active?.data?.current?.product;

    const boxId = sanitizeBoxId(
      over?.data?.current?.boxId ?? (typeof over.id === "number" ? over.id : undefined)
    );

    if (isProduct && product && boxId !== undefined) {
      if (product.quantity > 5) {
        openQuantityModal(product, boxId);
      } else {
        addToBox(boxId, product, 1);
        decreaseQuantity(product.id, 1);
      }
    }
  };

  const handleConfirmDragQuantity = (
    product: Product,
    boxId: number,
    quantity: number
  ) => {
    addToBox(boxId, product, quantity);
    decreaseQuantity(product.id, quantity);
    closeQuantityModal();
  };

  /* =========================
     REMOVER / AJUSTAR
  ========================= */
  const handleRemoveProduct = (boxId: number, productId: number) => {
    const sanitizedBoxId = sanitizeBoxId(boxId);
    if (sanitizedBoxId === undefined) return;

    const prodInBox = boxes[sanitizedBoxId]?.productos.find((p) => p.id === productId);
    if (!prodInBox) return;

    increaseQuantity(productId, prodInBox.quantity);
    removeProduct(sanitizedBoxId, productId);
  };

  const decrementOneFromBox = (boxId: number, productId: number) => {
    const sanitizedBoxId = sanitizeBoxId(boxId);
    if (sanitizedBoxId === undefined) return;

    increaseQuantity(productId, 1);
    decrementOne(boxId, productId);
  };

  /* =========================
     API FINAL
  ========================= */
  return {
    products,
    boxes,
    mostrarTitulos,
    eliminarCaja,
    aumentarCajas,
    resetBox,

    handleDragEnd,
    handleRemoveProduct,
    decrementOne: decrementOneFromBox,

    assignToBox,
    assignToMultipleBoxes,

    cantidadDeCajas,
    decreaseQuantity,

    isQuantityModalOpen,
    quantityModalProduct,
    quantityModalBoxId,
    quantityModalQuantity,
    openQuantityModal,
    closeQuantityModal,
    updateQuantityModalQuantity,
    handleConfirmDragQuantity,

    // RESTAURAR
    restoreProductsToIndex,
    restoreProductsToFirstEmptyBox,
  };
}
