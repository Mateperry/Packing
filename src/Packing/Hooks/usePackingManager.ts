// src/Packing/Hooks/usePackingManager.ts
import { useState } from "react";
import type { Product } from "../interfaces/Product";

export function usePackingManager(initial = 1) {
  const [cantidadDeCajas, setCantidadDeCajas] = useState(initial);
  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>(
    Array(initial).fill(true)
  );

  // inventario local (puede estar vacío; la fuente de verdad es useProducts)
  const [productos, ] = useState<Product[]>([]);

  // productos por caja (cada caja: array de { ...Product, quantity })
  const [productosPorCaja, setProductosPorCaja] = useState<
    (Product & { quantity: number })[][]
  >(Array.from({ length: initial }, () => []));

  const aumentarCajas = () => {
    setCantidadDeCajas((p) => p + 1);
    setMostrarTitulos((p) => [...p, true]);
    setProductosPorCaja((p) => [...p, []]);
  };

  const ensureBoxes = (n: number) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      while (copy.length < n) copy.push([]);
      return copy;
    });
    setCantidadDeCajas((prev) => (prev < n ? n : prev));
    setMostrarTitulos((prev) => {
      const copy = [...prev];
      while (copy.length < n) copy.push(true);
      return copy;
    });
  };

  const resetBox = (index: number) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      if (index >= 0 && index < copy.length) {
        copy[index] = [];
      }
      return copy;
    });
  };

  const restoreProductsToFirstEmptyBox = (products: (Product & { quantity: number })[]) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      let idx = copy.findIndex((p) => p.length === 0);
      if (idx === -1) {
        idx = copy.length;
        copy.push([]);
        setCantidadDeCajas((p) => p + 1);
        setMostrarTitulos((p) => [...p, true]);
      }
      // insert products into the chosen box
      copy[idx] = products.map((p) => ({ ...p }));
      return copy;
    });
  };

  const restoreProductsToIndex = (index: number, products: (Product & { quantity: number })[]) => {
    if (index < 0) return;
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      // ensure array length
      while (copy.length <= index) copy.push([]);
      copy[index] = products.map((p) => ({ ...p }));
      return copy;
    });
    setCantidadDeCajas((p) => (p <= index ? index + 1 : p));
    setMostrarTitulos((p) => {
      const copy = [...p];
      while (copy.length <= index) copy.push(true);
      return copy;
    });
  };

  const eliminarCaja = (index: number) => {
    if (cantidadDeCajas === 1) return;
    setCantidadDeCajas((p) => p - 1);
    setMostrarTitulos((p) => p.filter((_, i) => i !== index));
    setProductosPorCaja((p) => p.filter((_, i) => i !== index));
  };

  /**
   * addToBox flexible:
   * - addToBox(boxId, product: Product, amount = 1)
   * - addToBox(boxId, productId: number, amount = 1)
   *
   * Si recibe Product lo usa directamente (preferido).
   * Si recibe productId intenta buscar en `productos` (compatibilidad).
   */
  const addToBox = (
    boxId: number,
    productOrId: Product | number,
    amount = 1
  ) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      const productosCaja = [...(copy[boxId] || [])];

      // Resolver producto
      let productObj: Product | undefined;
      if (typeof productOrId === "number") {
        productObj = productos.find((p) => p.id === productOrId);
      } else {
        productObj = productOrId;
      }

      if (!productObj) {
        const id = typeof productOrId === "number" ? productOrId : productOrId.id;
        productObj = {
          id,
          name: (typeof productOrId === "number" ? `Producto ${id}` : productOrId.name) || "Sin nombre",
          description: (typeof productOrId === "number" ? "" : productOrId.description) || "",
          quantity: 0,
        } as Product;
      }

      const idx = productosCaja.findIndex((p) => p.id === productObj!.id);

      if (idx >= 0) {
        // ya existe dentro de la caja -> sumar cantidad
        productosCaja[idx] = {
          ...productosCaja[idx],
          quantity: productosCaja[idx].quantity + amount,
        };
      } else {
        // insertar nuevo con la cantidad indicada
        productosCaja.push({
          ...productObj!,
          quantity: amount,
        });
      }

      copy[boxId] = productosCaja;
      return copy;
    });
  };

  const decrementOne = (boxId: number, productId: number) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      const productosCaja = [...(copy[boxId] || [])];
      const i = productosCaja.findIndex((p) => p.id === productId);
      if (i === -1) return prev;

      const prod = productosCaja[i];
      if (prod.quantity <= 1) {
        productosCaja.splice(i, 1);
      } else {
        productosCaja[i] = { ...prod, quantity: prod.quantity - 1 };
      }

      copy[boxId] = productosCaja;
      return copy;
    });
  };

  const removeProduct = (boxId: number, productId: number) => {
    setProductosPorCaja((prev) => {
      const copy = [...prev];
      copy[boxId] = (prev[boxId] || []).filter((p) => p.id !== productId);
      return copy;
    });
  };

  const boxes = productosPorCaja.map((productos, i) => ({
    id: i,
    productos,
  }));

  return {
    cantidadDeCajas,
    mostrarTitulos,
    productos, // inventario local (puede permanecer vacío)
    productosPorCaja,

    aumentarCajas,
    eliminarCaja,
    resetBox,
    restoreProductsToFirstEmptyBox,
    restoreProductsToIndex,
    ensureBoxes,

    addToBox, // firma flexible: (boxId, product|id, amount)
    decrementOne,
    removeProduct,

    boxes,
  };
}
