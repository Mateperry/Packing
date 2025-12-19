import { useState } from "react";
import type { Product } from "../../interfaces/Product";

export function usePackingManager(initial = 1) {
  /* =========================
     STATE (FUENTE DE VERDAD)
  ========================= */

  const [productosPorCaja, setProductosPorCaja] = useState<
    (Product & { quantity: number })[][]
  >(Array.from({ length: initial }, () => []));

  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>(
    Array.from({ length: initial }, () => true)
  );

  const cantidadDeCajas = productosPorCaja.length;

  /* =========================
     CAJAS (MANUALES)
  ========================= */

  const aumentarCajas = () => {
    setProductosPorCaja((prev) => [...prev, []]);
    setMostrarTitulos((prev) => [...prev, true]);
  };

  const eliminarCaja = (index: number) => {
    setProductosPorCaja((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });

    setMostrarTitulos((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const resetBox = (index: number) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      if (copy[index]) copy[index] = [];
      return copy;
    });
  };

  /* =========================
     RESTORE (NO CREA CAJAS)
  ========================= */

  const restoreProductsToFirstEmptyBox = (
    products: (Product & { quantity: number })[]
  ) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      const idx = copy.findIndex((p) => p.length === 0);
      if (idx === -1) return prev;

      copy[idx] = products.map((p) => ({ ...p }));
      return copy;
    });
  };

  const restoreProductsToIndex = (
    index: number,
    products: (Product & { quantity: number })[]
  ) => {
    if (index < 0) return;

    setProductosPorCaja((prev) => {
      if (!prev[index]) return prev;
      const copy = [...prev];
      copy[index] = products.map((p) => ({ ...p }));
      return copy;
    });
  };

  /* =========================
     PRODUCTOS
  ========================= */

  const addToBox = (
    boxId: number,
    product: Product,
    amount = 1
  ) => {
    setProductosPorCaja((prev) => {
      if (!prev[boxId]) return prev;

      const copy = [...prev];
      const productosCaja = [...copy[boxId]];
      const idx = productosCaja.findIndex((p) => p.id === product.id);

      if (idx >= 0) {
        productosCaja[idx] = {
          ...productosCaja[idx],
          quantity: productosCaja[idx].quantity + amount,
        };
      } else {
        productosCaja.push({ ...product, quantity: amount });
      }

      copy[boxId] = productosCaja;
      return copy;
    });
  };

  const decrementOne = (boxId: number, productId: number) => {
    setProductosPorCaja((prev) => {
      if (!prev[boxId]) return prev;

      const copy = [...prev];
      const productosCaja = [...copy[boxId]];
      const i = productosCaja.findIndex((p) => p.id === productId);
      if (i === -1) return prev;

      if (productosCaja[i].quantity <= 1) {
        productosCaja.splice(i, 1);
      } else {
        productosCaja[i] = {
          ...productosCaja[i],
          quantity: productosCaja[i].quantity - 1,
        };
      }

      copy[boxId] = productosCaja;
      return copy;
    });
  };

  const removeProduct = (boxId: number, productId: number) => {
    setProductosPorCaja((prev) => {
      if (!prev[boxId]) return prev;

      const copy = [...prev];
      copy[boxId] = copy[boxId].filter(
        (p) => p.id !== productId
      );
      return copy;
    });
  };

  /* =========================
     CREAR CAJAS (ÚNICO LUGAR)
  ========================= */

  const createEmptyBoxes = (n: number): number[] => {
    const newIndexes: number[] = [];

    setProductosPorCaja((prev) => {
      const copy = [...prev];
      for (let i = 0; i < n; i++) {
        newIndexes.push(copy.length);
        copy.push([]);
      }
      return copy;
    });

    setMostrarTitulos((prev) => [...prev, ...Array(n).fill(true)]);

    return newIndexes;
  };

  /* =========================
     OUTPUT
  ========================= */

  const boxes = productosPorCaja.map((productos, i) => ({
    id: i,
    productos,
  }));

  return {
    cantidadDeCajas,
    mostrarTitulos,

    aumentarCajas,
    eliminarCaja,
    resetBox,

    restoreProductsToFirstEmptyBox,
    restoreProductsToIndex,

    addToBox,
    decrementOne,
    removeProduct,

    createEmptyBoxes,
    boxes,
  };
}
