import { useState } from "react";
import type { Product } from "../interfaces/Product";

export function usePackingManager(initial = 5) {
  const [cantidadDeCajas, setCantidadDeCajas] = useState(initial);
  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>(Array(initial).fill(true));
  const [productosPorCaja, setProductosPorCaja] = useState<Product[][]>(
    Array.from({ length: initial }, () => [])
  );

  // Aumentar cajas
  const aumentarCajas = () => {
    setCantidadDeCajas(prev => prev + 1);
    setMostrarTitulos(prev => [...prev, true]);
    setProductosPorCaja(prev => [...prev, []]);
  };

  // Alternar mostrar/ocultar título
  const alternarTitulo = (index: number) => {
    setMostrarTitulos(prev => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // Eliminar caja
  const eliminarCaja = (index: number) => {
    if (cantidadDeCajas === 1) return;
    setCantidadDeCajas(prev => prev - 1);
    setMostrarTitulos(prev => prev.filter((_, i) => i !== index));
    setProductosPorCaja(prev => prev.filter((_, i) => i !== index));
  };

  // Agregar producto a una caja
  const agregarProductoACaja = (index: number, product: Product) => {
    setProductosPorCaja(prev => {
      const copy = [...prev];
      copy[index] = [...copy[index], product];
      return copy;
    });
  };

  // ✅ Exponemos las propiedades necesarias para PackingPage
  const boxes = productosPorCaja.map((productos, i) => ({
    id: i,
    productos,
  }));

  const addToBox = (boxId: number, product: Product) => {
    agregarProductoACaja(boxId, product);
  };

  return {
    cantidadDeCajas,
    mostrarTitulos,
    productosPorCaja,
    aumentarCajas,
    alternarTitulo,
    eliminarCaja,
    agregarProductoACaja,
    boxes,
    addToBox,
  };
}
