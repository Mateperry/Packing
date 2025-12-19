// src/Packing/components/distribution/RepartirPanel.tsx

import { useState } from "react";
import type { Product } from "../../interfaces/Product";

interface Props {
  product: Product;
  onConfirm: (amountPerBox: number, numberOfBoxes: number) => void;
  onClose: () => void;
}

export default function RepartirPanel({
  product,
  onConfirm,
  onClose,
}: Props) {
  const [numberOfBoxes, setNumberOfBoxes] = useState(1);
  const [amountPerBox, setAmountPerBox] = useState(1);

  const total = numberOfBoxes * amountPerBox;

  const isInvalid =
    numberOfBoxes <= 0 ||
    amountPerBox <= 0 ||
    total > product.quantity;

  return (
    <div className="flex flex-col gap-4">
      {/* INFO */}
      <p className="text-gray-700">
        Repartir{" "}
        <span className="font-semibold">{product.name}</span>{" "}
        ({product.quantity} unidades disponibles)
      </p>

      {/* NÚMERO DE CAJAS */}
      <div className="flex items-center gap-2">
        <label className="w-32">Número de cajas</label>
        <input
          type="number"
          min={1}
          value={numberOfBoxes}
          onChange={(e) =>
            setNumberOfBoxes(
              Math.max(1, Number(e.target.value))
            )
          }
          className="border rounded px-2 py-1 w-24"
        />
      </div>

      {/* CANTIDAD POR CAJA */}
      <div className="flex items-center gap-2">
        <label className="w-32">Unidades por caja</label>
        <input
          type="number"
          min={1}
          value={amountPerBox}
          onChange={(e) =>
            setAmountPerBox(
              Math.max(1, Number(e.target.value))
            )
          }
          className="border rounded px-2 py-1 w-24"
        />
      </div>

      {/* VALIDACIÓN */}
      {isInvalid && (
        <p className="text-red-600 text-sm">
          El total a repartir ({total}) no puede superar
          las unidades disponibles ({product.quantity})
        </p>
      )}

      {/* BOTONES */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>

        <button
          disabled={isInvalid}
          onClick={() => {
            onConfirm(amountPerBox, numberOfBoxes);
            onClose();
          }}
          className="px-4 py-2 bg-green-600 text-white rounded
                     hover:bg-green-700 disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          Repartir
        </button>
      </div>
    </div>
  );
}
