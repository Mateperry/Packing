import { useState } from "react";
import type { Product } from "../interfaces/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "AXN02N", description: "F-TOALLA MANO FAN-7710R M/Y GRANDE", quantity: 1 },
    { id: 2, name: "AXN02P", description: "PRODUCTO B", quantity: 1 },
    { id: 3, name: "AXN02Q", description: "PRODUCTO C", quantity: 1 },
    { id: 4, name: "AXN03B", description: "PRODUCTO G", quantity: 1 },
    { id: 5, name: "AXN02X", description: "PRODUCTO D", quantity: 2 },
    { id: 6, name: "AXN02Z", description: "PRODUCTO E", quantity: 5 },
    { id: 7, name: "AXN03A", description: "PRODUCTO F", quantity: 3 },
    { id: 8, name: "AXN03C", description: "PRODUCTO H", quantity: 2 },
  ]);

  // Reducir cantidad (cuando agregas a caja)
  const decreaseQuantity = (id: number, amount = 1) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(p.quantity - amount, 0) } : p
      )
    );
  };

  // Aumentar cantidad (cuando eliminas de caja)
  const increaseQuantity = (id: number, amount = 1) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + amount } : p
      )
    );
  };

  return { products, decreaseQuantity, increaseQuantity };
}
