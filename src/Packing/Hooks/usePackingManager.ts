import { useState } from "react";
import type { Product } from "../interfaces/Product";

export function usePackingManager(initial = 5) {
  const [cantidadDeCajas, setCantidadDeCajas] = useState(initial);
  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>(
    Array(initial).fill(true)
  );

  // INVENTARIO GLOBAL ORIGINAL
  const [productos, setProductos] = useState<Product[]>([]);

  // PRODUCTOS DENTRO DE LAS CAJAS
  const [productosPorCaja, setProductosPorCaja] = useState<
    (Product & { quantity: number })[][]
  >(Array.from({ length: initial }, () => []));

  // -------------------------------------------
  //  CAJAS
  // -------------------------------------------

  const aumentarCajas = () => {
    const hayCajaVacia = productosPorCaja.some((caja) => caja.length === 0);
    if (hayCajaVacia) return;

    setCantidadDeCajas((prev) => prev + 1);
    setMostrarTitulos((prev) => [...prev, true]);
    setProductosPorCaja((prev) => [...prev, []]);
  };

  const alternarTitulo = (index: number) => {
    setMostrarTitulos((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const eliminarCaja = (index: number) => {
    if (cantidadDeCajas === 1) return;

    setCantidadDeCajas((prev) => prev - 1);
    setMostrarTitulos((prev) => prev.filter((_, i) => i !== index));
    setProductosPorCaja((prev) => prev.filter((_, i) => i !== index));
  };

  // -------------------------------------------
  //  AGREGAR A CAJA
  // -------------------------------------------

  const agregarProductoACaja = (index: number, product: Product) => {
    // 1) Descontar 1 del inventario global
    setProductos((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );

    // 2) Agregar dentro de la caja
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      const productos = [...copy[index]];
      const existingIndex = productos.findIndex((p) => p.id === product.id);

      if (existingIndex >= 0) {
        productos[existingIndex] = {
          ...productos[existingIndex],
          quantity: productos[existingIndex].quantity + 1,
        };
      } else {
        productos.push({ ...product, quantity: 1 });
      }

      copy[index] = productos;
      return copy;
    });
  };

  // -------------------------------------------
  //  MODIFICAR CANTIDAD DENTRO DE UNA CAJA
  // -------------------------------------------

  const updateProductQuantity = (
    boxId: number,
    productId: number,
    delta: number
  ) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      const productos = [...copy[boxId]];
      const index = productos.findIndex((p) => p.id === productId);
      if (index === -1) return prev;

      const newQuantity = productos[index].quantity + delta;

      // Si delta es -1, devolvemos 1 al inventario
      if (delta < 0) {
        setProductos((prevInv) =>
          prevInv.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
          )
        );
      }

      if (newQuantity <= 0) {
        productos.splice(index, 1);
      } else {
        productos[index] = { ...productos[index], quantity: newQuantity };
      }

      copy[boxId] = productos;
      return copy;
    });
  };

  // -------------------------------------------
  //  ELIMINAR CON LA X
  // -------------------------------------------

  const removeProduct = (boxId: number, productId: number) => {
    // 1) Sacar el producto de la caja
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      const productosCaja = copy[boxId];

      const product = productosCaja.find((p) => p.id === productId);

      // 2) Devolver TODA la cantidad al inventario global
      if (product) {
        setProductos((prevInv) =>
          prevInv.map((p) =>
            p.id === productId
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          )
        );
      }

      // 3) Eliminarlo de la caja
      copy[boxId] = productosCaja.filter((p) => p.id !== productId);
      return copy;
    });
  };

  // -------------------------------------------
  // FORMATO PARA EL COMPONENTE
  // -------------------------------------------

  const boxes = productosPorCaja.map((productos, i) => ({
    id: i,
    productos,
  }));

  return {
    cantidadDeCajas,
    mostrarTitulos,
    productosPorCaja,
    productos, // inventario global
    aumentarCajas,
    alternarTitulo,
    eliminarCaja,
    agregarProductoACaja,
    boxes,
    addToBox: agregarProductoACaja,
    updateProductQuantity,
    removeProduct,
  };
}
