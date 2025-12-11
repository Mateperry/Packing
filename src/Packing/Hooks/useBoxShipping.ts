import { useState } from "react";
import type { Product } from "../interfaces/Product";

export interface ReadyBox {
  id: number;
  titulo: string;
  productos: Product[];
  readyAt: Date;
  sourceIndex?: number;
}

export interface ShippedBox extends ReadyBox {
  shippedAt: Date;
  status: "shipped";
}

export function useBoxShipping() {
  const [readyBoxes, setReadyBoxes] = useState<ReadyBox[]>([]);
  const [shippedBoxes, setShippedBoxes] = useState<ShippedBox[]>([]);
  const [nextId, setNextId] = useState(1);

  const markBoxReady = (box: Omit<ReadyBox, "id" | "readyAt"> & { sourceIndex?: number }) => {

    const productosCopy = (box.productos || []).map((p) => ({ ...p }));
    setReadyBoxes((prev) => [
      ...prev,
      { id: nextId, ...box, productos: productosCopy, readyAt: new Date() },
    ]);
    setNextId((n) => n + 1);
  };

  const shipSingleBox = () => {
    const [first, ...rest] = readyBoxes;
    if (!first) return;

    setShippedBoxes((prev) => [
      ...prev,
      { ...first, shippedAt: new Date(), status: "shipped" as const },
    ]);
    setReadyBoxes(rest);
  };

  const shipAllBoxes = () => {
    setShippedBoxes((prev) => [
      ...prev,
      ...readyBoxes.map((b) => ({
        ...b,
        shippedAt: new Date(),
        status: "shipped" as const,
      })),
    ]);
    setReadyBoxes([]);
  };

  const unmarkBoxReady = (readyBoxId: number) => {
    setReadyBoxes((prev) => prev.filter((b) => b.id !== readyBoxId));
  };

  const clearReadyBoxes = () => {
    setReadyBoxes([]);
  };

  return {
    readyBoxes,
    shippedBoxes,
    markBoxReady,
    shipSingleBox,
    shipAllBoxes,
    clearReadyBoxes,
    unmarkBoxReady,
  };
}
