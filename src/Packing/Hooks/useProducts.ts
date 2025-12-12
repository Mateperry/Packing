// src/Packing/Hooks/useProducts.ts
// Hook personalizado para gestionar la lista de productos disponibles para empacar
// Este nos permite mantener el estado de los productos y proporciona funciones para modificar sus cantidades
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// IMPORTACIONES NECESARIAS
import { useState } from "react"; // Importamos useState de React para manejar el estado de los productos
import type { Product } from "../interfaces/Product"; // Importamos la interfaz Product para tipar los productos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// DEFINICION DEL HOOK useProducts

export function useProducts() {
  // Array de prodcutos iniciales con sus cantidades definidas 
  const [products, setProducts] = useState<Product[]>([ // Aquí noas aseguramos de que products siempre sera un array de Product
    // Arrat con Id, nombre, descripcion y cantidad inicial de cada producto 
    { id: 1, name: "AXN02N", description: "F-TOALLA MANO FAN-7710R M/Y GRANDE", quantity: 1 },
    { id: 2, name: "AXN02P", description: "CUADERNO JEAN BOOK ARGOLLADO GRANDE CUADRICULADO 80 HOJAS", quantity: 1 },
    { id: 3, name: "AXN02Q", description: "LIMPIADOR DESINFECTANTE PROASEO MULTIPODEROSO PINO 3000ML", quantity: 100 },
    { id: 4, name: "AXN03B", description: "GUANTE DE CAUCHO LATEXPORT INDUSTRIAL C25 T-8 AMARILLO PAR", quantity: 101 },
    { id: 5, name: "AXN03C", description: "BOLSA PARA BASURA NEGRA PROASEO 90X120 CALIBRE 8 ROLLO X 10", quantity: 6 },


  ]);

  // Reducir cantidad (cuando agregas a caja) y modificar cuanta cantidad hay en product List 
  const decreaseQuantity = (id: number, amount = 1) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(p.quantity - amount, 0) } : p
      )
    );
  };

  // Aumentar cantidad (cuando eliminas de caja) y modificar en product list 
  const increaseQuantity = (id: number, amount = 1) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + amount } : p
      )
    );
  };

  return { products, decreaseQuantity, increaseQuantity };
}
