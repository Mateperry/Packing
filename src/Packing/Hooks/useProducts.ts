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
    { id: 5, name: "AXN03C", description: "BOLSA PARA BASURA NEGRA PROASEO 90X120 CALIBRE 8 ROLLO X 10", quantity: 50 },
    { id: 6, name: "AXN03D", description: "DETERGENTE LÍQUIDO PROASEO LAVALOZA LIMÓN 3000ML", quantity: 32 },
    { id: 7, name: "AXN03E", description: "PAPEL HIGIÉNICO INSTITUCIONAL DOBLE HOJA 500 METROS", quantity: 120 },
    { id: 8, name: "AXN03F", description: "JABÓN DE MANOS ESPUMA ANTIBACTERIAL 1000ML REPUESTO", quantity: 5 },
    { id: 9, name: "AXN03G", description: "ESCOBA INDUSTRIAL CERDA DURA MANGO MADERA 120CM", quantity: 14 },
    { id: 10, name: "AXN03H", description: "RECOGEDOR PLÁSTICO INDUSTRIAL CON MANGO METÁLICO", quantity: 29 },
    { id: 11, name: "AXN03J", description: "CARPETA PLÁSTICA OFICIO TRANSPARENTE CON BROCHE", quantity: 80 },
    { id: 12, name: "AXN03K", description: "RESALTADOR PELIKAN SURTIDO PACK X 6 COLORES", quantity: 6 },
    { id: 13, name: "AXN03L", description: "BOLÍGRAFO PUNTA MEDIA AZUL GELLINE CAJA X 12 UNIDADES", quantity: 75 },
    { id: 14, name: "AXN03M", description: "MARCADOR PERMANENTE SHARPIE PUNTA FINA NEGRO", quantity: 130 },
    { id: 15, name: "AXN03N", description: "EXTENSION ELÉCTRICA INDUSTRIAL 10 METROS CALIBRE 14", quantity: 8 },
    { id: 16, name: "AXN03P", description: "GUANTE NITRILO NEGRO PROFESIONAL TALLA L CAJA X 100", quantity: 65 },
    { id: 17, name: "AXN03Q", description: "BOTELLA SPRAY PROASEO 500ML PARA DESINFECTANTE", quantity: 40 },
    { id: 18, name: "AXN03R", description: "CEPILLO MULTIUSO CERDA MEDIA MANGO PLÁSTICO", quantity: 2 },
    { id: 19, name: "AXN03S", description: "TAPABOCAS QUIRÚRGICO TRIPAPEL AZUL CAJA X 50", quantity: 200 },
    { id: 20, name: "AXN03T", description: "SILLA APOYO ERGONÓMICA PLÁSTICA RESISTENTE NEGRA", quantity: 4 },

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
