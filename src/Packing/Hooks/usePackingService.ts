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

  // IDs de productos ya empacados (para ocultar en lista)
  const usedProductIds = boxes.flatMap((b) => b.productos.map((p) => p.id));

  // Helper: extraer boxId robustamente (por si over.id tiene prefijo o over.data)
  const resolveBoxIdFromOver = (over: any) => {
    if (!over) return undefined;
    if (over?.data?.current?.boxId !== undefined) return over.data.current.boxId;
    if (typeof over.id === "string" && over.id.startsWith("box-")) {
      const maybe = parseInt(over.id.replace("box-", ""), 10);
      if (!Number.isNaN(maybe)) return maybe;
    }
    if (typeof over.id === "number") return over.id;
    return undefined;
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const isProduct = active?.data?.current?.type === "PRODUCT";
    const product: Product | undefined = active?.data?.current?.product;
    const boxId = resolveBoxIdFromOver(over);

    if (isProduct && product && boxId !== undefined) {
      // agregar 1 unidad a la caja y descontar del inventario
      addToBox(boxId, product, 1);
      decreaseQuantity(product.id, 1);
    }
  };

  const handleRemoveProduct = (boxId: number, productId: number) => {
    const prodInBox = boxes[boxId]?.productos.find((p) => p.id === productId);
    if (!prodInBox) return;

    increaseQuantity(productId, prodInBox.quantity);
    removeProduct(boxId, productId);
  };

  const decrementOneFromBox = (boxId: number, productId: number) => {
    increaseQuantity(productId, 1);
    decrementOne(boxId, productId);
  };

  // Exponer funciones para que ProductList / Modal las usen
  function assignToBox(product: Product | number, boxId: number, amount = 1) {
    const productId = typeof product === "number" ? product : product.id;
    decreaseQuantity(productId, amount);
    addToBox(boxId, product, amount);
  }

  function assignToMultipleBoxes(
    product: Product | number,
    amountPerBox: number,
    numberOfBoxes: number
  ) {
    const productId = typeof product === "number" ? product : product.id;
    const total = amountPerBox * numberOfBoxes;
    decreaseQuantity(productId, total);

    for (let i = 0; i < numberOfBoxes; i++) {
      const boxId = boxes[i]?.id;
      if (boxId !== undefined) {
        addToBox(boxId, product, amountPerBox);
      }
    }
  }

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
