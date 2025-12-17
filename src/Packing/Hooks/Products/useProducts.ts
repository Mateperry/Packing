// src/Packing/Hooks/useProducts.ts
// Hook personalizado para gestionar la lista de productos disponibles para empacar
// Este nos permite mantener el estado de los productos y proporciona funciones para modificar sus cantidades
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// IMPORTACIONES NECESARIAS
import { useState, useEffect } from "react";
import { ProductsService } from "../../api/products.service";
import type { Product } from "../../interfaces/Product";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// DEFINICION DEL HOOK useProducts


export function useProducts(initialProducts?: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);


  // Si initialProducts cambia (por ejemplo, al cambiar de orden), actualiza el estado
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }
    setLoading(true);
    ProductsService.getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [initialProducts]);


  const decreaseQuantity = async (id: number, amount = 1) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newQuantity = Math.max(product.quantity - amount, 0);
    if (initialProducts) {
      // Solo modificar el estado local (productos de orden)
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
      );
    } else {
      // Inventario global: actualizar en Supabase
      await ProductsService.updateProductQuantity(id, newQuantity);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
      );
    }
  };

  const increaseQuantity = async (id: number, amount = 1) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newQuantity = product.quantity + amount;
    if (initialProducts) {
      // Solo modificar el estado local (productos de orden)
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
      );
    } else {
      // Inventario global: actualizar en Supabase
      await ProductsService.updateProductQuantity(id, newQuantity);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
      );
    }
  };

  return { products, loading, error, decreaseQuantity, increaseQuantity };
}
