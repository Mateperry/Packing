import { useState } from "react";
import type { Product } from "../interfaces/Product";

export function usePackingManager(initial = 5) {
  const [cantidadDeCajas, setCantidadDeCajas] = useState(initial);
  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>(Array(initial).fill(true));
  const [productosPorCaja, setProductosPorCaja] = useState<(Product & { quantity: number })[][]>(
    Array.from({ length: initial }, () => [])
  );

  // Aumentar cajas
  const aumentarCajas = () => {
    // Solo agregar si todas las cajas tienen al menos 1 producto
    const hayCajaVacia = productosPorCaja.some(caja => caja.length === 0);
    if (hayCajaVacia) return;

    setCantidadDeCajas(prev => prev + 1);
    setMostrarTitulos(prev => [...prev, true]);
    setProductosPorCaja(prev => [...prev, []]);
  };

  const alternarTitulo = (index: number) => {
    setMostrarTitulos(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const eliminarCaja = (index: number) => {
    if (cantidadDeCajas === 1) return;
    setCantidadDeCajas(prev => prev - 1);
    setMostrarTitulos(prev => prev.filter((_, i) => i !== index));
    setProductosPorCaja(prev => prev.filter((_, i) => i !== index));
  };

  const agregarProductoACaja = (index: number, product: Product) => {
    setProductosPorCaja(prev => {
      const copy = [...prev];
      const productos = [...copy[index]];
      const existingIndex = productos.findIndex(p => p.id === product.id);

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

  const updateProductQuantity = (boxId: number, productId: number, delta: number) => {
    setProductosPorCaja(prev => {
      const copy = [...prev];
      const productos = [...copy[boxId]];
      const index = productos.findIndex(p => p.id === productId);
      if (index === -1) return prev;

      const newQuantity = productos[index].quantity + delta;

      if (newQuantity <= 0) {
        productos.splice(index, 1);
      } else {
        productos[index] = { ...productos[index], quantity: newQuantity };
      }

      copy[boxId] = productos;
      return copy;
    });
  };

  const removeProduct = (boxId: number, productId: number) => {
    setProductosPorCaja(prev => {
      const copy = [...prev];
      copy[boxId] = copy[boxId].filter(p => p.id !== productId);
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
    productosPorCaja,
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
