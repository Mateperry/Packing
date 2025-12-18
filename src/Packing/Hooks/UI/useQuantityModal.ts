import { useState } from "react";
import type { Product } from "../../interfaces/Product";

export function useQuantityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openModal = (product: Product, boxId: number) => {
    setSelectedProduct(product);
    setSelectedBox(boxId);
    setQuantity(1);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
    setSelectedBox(null);
    setQuantity(1);
  };

  const updateQuantity = (newQuantity: number) => {
    if (selectedProduct) {
      const sanitized = Math.max(1, Math.min(newQuantity, selectedProduct.quantity));
      setQuantity(sanitized);
    }
  };

  return {
    isOpen,
    selectedProduct,
    selectedBox,
    quantity,
    openModal,
    closeModal,
    updateQuantity,
  };
}
