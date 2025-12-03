// src/Packing/Hooks/usePackingManager.ts
// Controla toda la lógica de empacar productos en cajas, manteniendo sincronizado el inventario y lo que hay dentro de cada caja.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Importaciones de React y tipos 
import { useState } from "react"; // useState para manejar estados internos
import type { Product } from "../interfaces/Product"; // Tipo Product para definir la estructura de los productos

// Hook personalizado para gestionar el empaquetado de productos en cajas, manteniendo sincronizado el inventario y lo que hay dentro de cada caja

export function usePackingManager(initial = 6) { // Valor inicial de cajas a mostrar 6 
  const [cantidadDeCajas, setCantidadDeCajas] = useState(initial); // Estado para la cantidad de cajas empezamos en el valor initial (6)
  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>( // Estado para controlar si se muestran los títulos de las cajas 
    Array(initial).fill(true) // Inicialmente todos los títulos están visibles 
  );
/////////////////////////////////////////////////////////////////////// Control de Items "" ////////////////////////////////////////////////////////// 
  // INVENTARIO GLOBAL ORIGINAL
  const [productos, setProductos] = useState<Product[]>([]); // Estado para el inventario global de productos No estan dentrdo de las cajas 

  // PRODUCTOS DENTRO DE LAS CAJAS 
  const [productosPorCaja, setProductosPorCaja] = useState<  // Estado para los productos dentro de cada caja  
    (Product & { quantity: number })[][] // Cada caja contiene un array de productos con su cantidad 
  >(Array.from({ length: initial }, () => [])); // Inicialmente hay 'initial' cajas vacías 

///////////////////////////////////////////////////////////////////////// Control de Aumento de cajas /////////////////////////////////////////////////////////

  const aumentarCajas = () => {
    const hayCajaVacia = productosPorCaja.some((caja) => caja.length === 0);
    if (hayCajaVacia) return;

    setCantidadDeCajas((prev) => prev + 1);
    setMostrarTitulos((prev) => [...prev, true]);
    setProductosPorCaja((prev) => [...prev, []]);
  };
///////////////////////////////////////////////////////////////////////// Control de Mostrar Titulo /////////////////////////////////////////////////////////
  const alternarTitulo = (index: number) => {
    setMostrarTitulos((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };
////////////////////////////////////////////////////////////////////////// Control de Eliminar Caja /////////////////////////////////////////////////////////
  const eliminarCaja = (index: number) => {
    if (cantidadDeCajas === 1) return;

    setCantidadDeCajas((prev) => prev - 1);
    setMostrarTitulos((prev) => prev.filter((_, i) => i !== index));
    setProductosPorCaja((prev) => prev.filter((_, i) => i !== index));
  };
//////////////////////////////////////////////////////////////////////// Agregar Producto a Caja /////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////// Actualizar Cantidad de Producto en Caja /////////////////////////////////////////////////

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

    if (newQuantity <= 0) {
      productos.splice(index, 1);
    } else {
      productos[index] = { ...productos[index], quantity: newQuantity };
    }

    copy[boxId] = productos;
    return copy;
  });
};

 
  ///////////////////////////////////////////////////////////////////////////ELIMINAR CON LA X////////////////////////////////////////////////////////////////////////////
  

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


  ////////////////////////////////////////////////////////////// FORMATO PARA EL COMPONENTE//////////////////////////////////////////////////////////////////////////////////
 

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
