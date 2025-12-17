import { useRef, useState } from "react";
import type { Product } from "../../interfaces/Product";

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

  const nextIdRef = useRef(1);

  const markBoxReady = (box: Omit<ReadyBox, "id" | "readyAt">) => {
    const productosCopy = box.productos.map((p) => ({ ...p }));

    const id = nextIdRef.current;
    nextIdRef.current += 1;

    setReadyBoxes((prev) => [
      ...prev,
      {
        ...box,
        id,
        productos: productosCopy,
        readyAt: new Date(),
      },
    ]);
  };

  const shipSingleBox = () => {
    setReadyBoxes((prev) => {
      if (prev.length === 0) return prev;

      const [first, ...rest] = prev;

      setShippedBoxes((shipped) => [
        ...shipped,
        {
          ...first,
          shippedAt: new Date(),
          status: "shipped" as const,
        },
      ]);

      return rest;
    });
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
