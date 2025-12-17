import type { Product } from "../../interfaces/Product";
import { useProducts } from "../../Hooks/Products/useProducts";
import { usePackingManager } from "./usePackingManager";
import { useQuantityModal } from "../UI/useQuantityModal";

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
    restoreProductsToFirstEmptyBox,
    restoreProductsToIndex,
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

  const sanitizeAmount = (amount: number) =>
    Math.max(0, Math.floor(Number(amount) || 0));

  const sanitizeBoxId = (boxId: number) =>
    Number.isInteger(boxId) && boxId >= 0 ? boxId : undefined;

  function assignToBox(product: Product | number, boxId: number, amount = 1) {
    if (!product || typeof product === "number") return;

    const sanitizedBoxId = sanitizeBoxId(boxId);
    const sanitizedAmount = sanitizeAmount(amount);
    if (sanitizedBoxId === undefined || sanitizedAmount === 0) return;

    decreaseQuantity(product.id, sanitizedAmount);
    addToBox(sanitizedBoxId, product, sanitizedAmount);
  }

  // 🔥 FIX DEFINITIVO
function assignToMultipleBoxes(
  product: Product | number,
  amountPerBox: number,
  numberOfBoxes: number
) {
  if (!product || typeof product === "number") return;

  const boxesNeeded = Math.floor(numberOfBoxes);
  const amount = Math.floor(amountPerBox);
  if (boxesNeeded <= 0 || amount <= 0) return;

  const totalToRemove = boxesNeeded * amount;
  if (product.quantity < totalToRemove) return;

  // 1️⃣ buscar cajas vacías existentes
  const emptyBoxIndexes = boxes
    .map((b, i) => ({ i, productos: b.productos }))
    .filter((b) => b.productos.length === 0)
    .map((b) => b.i);

  const boxesToUse: number[] = [];

  // 2️⃣ usar las vacías primero
  for (const idx of emptyBoxIndexes) {
    if (boxesToUse.length < boxesNeeded) {
      boxesToUse.push(idx);
    }
  }

  // 3️⃣ crear solo las que falten
  if (boxesToUse.length < boxesNeeded) {
    const missing = boxesNeeded - boxesToUse.length;
    const newIndexes = createEmptyBoxes(missing);
    boxesToUse.push(...newIndexes);
  }

  // 4️⃣ repartir
  for (const boxIndex of boxesToUse) {
    addToBox(boxIndex, product, amount);
  }

  // 5️⃣ descontar inventario
  decreaseQuantity(product.id, totalToRemove);
}

 

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const isProduct = active?.data?.current?.type === "PRODUCT";
    const product: Product | undefined =
      active?.data?.current?.product;

    const boxId = sanitizeBoxId(
      over?.data?.current?.boxId ??
        (typeof over.id === "number" ? over.id : undefined)
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

  const handleRemoveProduct = (boxId: number, productId: number) => {
    const sanitizedBoxId = sanitizeBoxId(boxId);
    if (sanitizedBoxId === undefined) return;

    const prodInBox =
      boxes[sanitizedBoxId]?.productos.find(
        (p) => p.id === productId
      );

    if (!prodInBox) return;

    increaseQuantity(productId, prodInBox.quantity);
    removeProduct(sanitizedBoxId, productId);
  };

  const decrementOneFromBox = (boxId: number, productId: number) => {
    const sanitizedBoxId = sanitizeBoxId(boxId);
    if (sanitizedBoxId === undefined) return;

    increaseQuantity(productId, 1);
    decrementOne(sanitizedBoxId, productId);
  };

  return {
    products,
    boxes,
    mostrarTitulos,
    eliminarCaja,
    aumentarCajas,
    resetBox,
    restoreProductsToFirstEmptyBox,
    restoreProductsToIndex,
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
  };
}
