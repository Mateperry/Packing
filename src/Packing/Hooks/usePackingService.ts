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

  // 🔥 IDs de productos que ya están en cajas
  const usedProductIds = boxes
    .flatMap((box) => box.productos)
    .map((p) => p.id);

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

  // Eliminar producto con la X (toda la cantidad)
  const handleRemoveProduct = (boxId: number, productId: number) => {
    const box = boxes[boxId];
    const prodInBox = box.productos.find((p) => p.id === productId);
    if (!prodInBox) return;

    increaseQuantity(productId, prodInBox.quantity); // Devuelve todo al inventario
    removeProduct(boxId, productId); // Elimina de la caja
  };

const handleDecreaseProduct = (boxId: number, productId: number) => {
  const box = boxes[boxId];
  const prodInBox = box.productos.find((p) => p.id === productId);
  if (!prodInBox) return;

  // si era 1 → va a desaparecer
  const willDisappear = prodInBox.quantity === 1;

  updateProductQuantity(boxId, productId, -1);

  if (willDisappear) {
    increaseQuantity(productId, 1);
  }
};




  return {
    products,
    boxes,
    usedProductIds, // 🔥 para ProductList
    mostrarTitulos,
    alternarTitulo,
    eliminarCaja,
    aumentarCajas,
    handleDragEnd,
    handleRemoveProduct,
    handleDecreaseProduct,
  };
}
