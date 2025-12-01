// Hooks/usePackingService.ts
import { useProducts } from "./useProducts";
import { usePackingManager } from "./usePackingManager";

export function usePackingService() {
  const { products, decreaseQuantity, increaseQuantity } = useProducts();
  const {
    boxes,
    mostrarTitulos,
    alternarTitulo,
    eliminarCaja,
    aumentarCajas,
    addToBox,
    updateProductQuantity,
    removeProduct,
  } = usePackingManager();

  // Cuando se arrastra un producto a la caja
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const isProduct = active.data.current?.type === "PRODUCT";
    const isBox = over.data.current?.type === "BOX";

    if (isProduct && isBox) {
      const product = active.data.current.product;
      const boxId = over.data.current.boxId;

      addToBox(boxId, product);
      decreaseQuantity(product.id); // Disminuye 1 en ProductList
    }
  };

  // Eliminar producto de la caja
  const handleRemoveProduct = (boxId: number, productId: number) => {
    const box = boxes[boxId];
    const prodInBox = box.productos.find((p) => p.id === productId);
    if (!prodInBox) return;

    increaseQuantity(productId, prodInBox.quantity);
    removeProduct(boxId, productId);
  };

  // Actualizar cantidad dentro de la caja
  const handleUpdateQuantity = (boxId: number, productId: number, delta: number) => {
    updateProductQuantity(boxId, productId, delta);

    if (delta < 0) {
      const box = boxes[boxId];
      const prodInBox = box.productos.find((p) => p.id === productId);
      if (!prodInBox) {
        increaseQuantity(productId, 1);
      }
    } else if (delta > 0) {
      decreaseQuantity(productId, delta);
    }
  };

  return {
    products,
    boxes,
    mostrarTitulos,
    alternarTitulo,
    eliminarCaja,
    aumentarCajas,
    handleDragEnd,
    handleRemoveProduct,
    handleUpdateQuantity,
  };
}
