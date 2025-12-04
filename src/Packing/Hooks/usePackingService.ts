// src/Packing/Hooks/usePackingService.ts
// Asistente personal para la página de packing, que combina la gestión de productos y cajas.
//
//
import { useProducts } from "./useProducts"; // Hook para gestionar el inventario de productos
import { usePackingManager } from "./usePackingManager"; // Hook para gestionar las cajas y su contenido

export function usePackingService() {
  const { products, decreaseQuantity, increaseQuantity } = useProducts();
  const {
    boxes, // Lista de cajas con productos empacados
    mostrarTitulos, // Estado que indica si se deben mostrar los títulos de las cajas
    eliminarCaja, // Función para eliminar una caja
    aumentarCajas, // Función para aumentar el número de cajas
    addToBox,// Función para agregar un producto a una caja
    decrementOne, // Función para decrementar la cantidad de un producto en una caja
    removeProduct, // Función para eliminar un producto de una caja
    cantidadDeCajas,  // Número total de cajas disponibles
  } = usePackingManager(); // Usamos el hook para gestionar las cajas

  const usedProductIds = boxes.flatMap((b) => b.productos.map((p) => p.id)); // IDs de productos ya empacados

  const handleDragEnd = (event: any) => {// Manejador para el evento de finalización del arrastre
    const { active, over } = event; // Obtenemos el elemento activo y el destino del arrastre
    if (!over) return; // Si no hay un destino válido, no hacemos nada

    const isProduct = active.data.current?.type === "PRODUCT"; // Verificamos si el elemento arrastrado es un producto
    const isBox = over.data.current?.type === "BOX"; // Verificamos si el destino es una caja

    if (isProduct && isBox) { // Si es un producto arrastrado a una caja
      const product = active.data.current.product; // Obtenemos el producto arrastrado
      const boxId = over.data.current.boxId; // Obtenemos el ID de la caja destino

      addToBox(boxId, product); // Agregamos el producto a la caja
      decreaseQuantity(product.id); // Disminuimos la cantidad del producto en el inventario global
    }
  };

  const handleRemoveProduct = (boxId: number, productId: number) => { // Manejador para eliminar un producto de una caja
    const prodInBox = boxes[boxId].productos.find((p) => p.id === productId); // Buscamos el producto en la caja 
    if (!prodInBox) return; // Si no se encuentra, no hacemos nada

    increaseQuantity(productId, prodInBox.quantity);// Aumentamos la cantidad del producto en el inventario global
    removeProduct(boxId, productId);// Eliminamos el producto de la caja
  };

  const decrementOneFromBox = (boxId: number, productId: number) => { // Manejador para decrementar la cantidad de un producto en una caja
    const product = boxes[boxId].productos.find((p) => p.id === productId); // Buscamos el producto en la caja
    if (!product) return; // Si no se encuentra, no hacemos nada

    increaseQuantity(productId, 1); // Aumentamos la cantidad del producto en el inventario global
    decrementOne(boxId, productId); // Decrementamos la cantidad del producto en la caja
  };

  return {
    products, // Lista de productos disponibles
    boxes,    // Lista de cajas con productos empacados
    usedProductIds, // IDs de productos ya empacados
    mostrarTitulos, // Estado que indica si se deben mostrar los títulos de las cajas
    eliminarCaja,   // Función para eliminar una caja
    aumentarCajas,  // Función para aumentar el número de cajas
    handleDragEnd,  // Manejador para el evento de finalización del arrastre
    handleRemoveProduct, // Manejador para eliminar un producto de una caja
    decrementOne: decrementOneFromBox, // Manejador para decrementar la cantidad de un producto en una caja
    addToBox,           // Función para agregar un producto a una caja
    cantidadDeCajas,    // Número total de cajas disponibles
  };
}
