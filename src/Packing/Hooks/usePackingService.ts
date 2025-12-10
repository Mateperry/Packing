// src/Packing/Hooks/usePackingService.ts
import type { Product } from "../interfaces/Product";
import { useProducts } from "./useProducts";
import { usePackingManager } from "./usePackingManager";

export function usePackingService() {
  const { products, decreaseQuantity, increaseQuantity } = useProducts();
  const {
    boxes,
    mostrarTitulos,
    eliminarCaja,
    aumentarCajas,
    addToBox,
    decrementOne,
    removeProduct,
    cantidadDeCajas,
  } = usePackingManager();

  // IDs de productos que ya están en cajas
  const usedProductIds = boxes.flatMap((b) => b.productos.map((p) => p.id));

  // ---------------------------
  //  FUNCIONES AUXILIARES
  // ---------------------------

  const sanitizeAmount = (amount: number) => {
    const n = Math.floor(Number(amount) || 0);
    return n < 0 ? 0 : n;
  };

  const sanitizeBoxId = (boxId: number) => {
    return Number.isInteger(boxId) && boxId >= 0 ? boxId : undefined;
  };

  // ---------------------------
  //  FUNCIONES PRINCIPALES
  // ---------------------------

  // Asignar un producto a una sola caja
  function assignToBox(product: Product | number, boxId: number, amount = 1) {
    if (!product) return;

    const sanitizedBoxId = sanitizeBoxId(boxId);
    const sanitizedAmount = sanitizeAmount(amount);
    if (sanitizedBoxId === undefined || sanitizedAmount === 0) return;

    const productId = typeof product === "number" ? product : product.id;
    decreaseQuantity(productId, sanitizedAmount);
    addToBox(sanitizedBoxId, product, sanitizedAmount);
  }

  // Asignar a varias cajas y crear cajas faltantes si es necesario
  function assignToMultipleBoxes(
    product: Product | number,
    amountPerBox: number,
    numberOfBoxes: number
  ) {
    if (!product) return;

    const boxesCount = sanitizeAmount(numberOfBoxes);
    const amount = sanitizeAmount(amountPerBox);
    if (boxesCount === 0 || amount === 0) return;

    const productId = typeof product === "number" ? product : product.id;

    // 🔹 Calcular cuántas cajas faltan y agregarlas
    const missingBoxes = boxesCount - cantidadDeCajas;
    for (let i = 0; i < missingBoxes; i++) {
      aumentarCajas();
    }

    // 🔹 IDs de las cajas donde se asignará el producto
    const currentBoxIds = Array.from({ length: boxesCount }, (_, i) => i);

    // 🔹 Restar inventario total
    decreaseQuantity(productId, amount * boxesCount);

    // 🔹 Asignar productos a cada caja
    currentBoxIds.forEach((boxId) => {
      addToBox(boxId, product, amount);
    });
  }

  // Manejo de drag & drop
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const isProduct = active?.data?.current?.type === "PRODUCT";
    const product: Product | undefined = active?.data?.current?.product;
    const boxId = sanitizeBoxId(
      over?.data?.current?.boxId ?? (typeof over.id === "number" ? over.id : undefined)
    );

    if (isProduct && product && boxId !== undefined) {
      addToBox(boxId, product, 1);
      decreaseQuantity(product.id, 1);
    }
  };

  // Eliminar un producto de una caja
  const handleRemoveProduct = (boxId: number, productId: number) => {
    const sanitizedBoxId = sanitizeBoxId(boxId);
    if (sanitizedBoxId === undefined) return;

    const prodInBox = boxes[sanitizedBoxId]?.productos.find((p) => p.id === productId);
    if (!prodInBox) return;

    increaseQuantity(productId, prodInBox.quantity);
    removeProduct(sanitizedBoxId, productId);
  };

  // Decrementar uno de un producto en una caja
  const decrementOneFromBox = (boxId: number, productId: number) => {
    const sanitizedBoxId = sanitizeBoxId(boxId);
    if (sanitizedBoxId === undefined) return;

    increaseQuantity(productId, 1);
    decrementOne(sanitizedBoxId, productId);
  };

  return {
    products,
    boxes,
    usedProductIds,
    mostrarTitulos,
    eliminarCaja,
    aumentarCajas,
    handleDragEnd,
    handleRemoveProduct,
    decrementOne: decrementOneFromBox,
    assignToBox,
    assignToMultipleBoxes,
    cantidadDeCajas,
    decreaseQuantity,
  };
}
