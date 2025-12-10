// src/Packing/components/UI/AssignItemsModal.tsx
import { useState } from "react";
import Modal from "./Modal";
import type { Product } from "../../interfaces/Product";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  boxes: { id: number; productos: Product[] }[];
  onAssignToOneBox: (boxId: number, amount: number) => void;
  onAssignToMultipleBoxes: (amountPerBox: number, numberOfBoxes: number) => void;
}

export default function AssignItemsModal({
  isOpen,
  onClose,
  product,
  boxes,
  onAssignToOneBox,
  onAssignToMultipleBoxes,
}: Props) {
  if (!product) return null;

  const [mode, setMode] = useState<"one" | "multiple">("one");
  const [selectedBox, setSelectedBox] = useState<number>(boxes[0]?.id ?? 0);
  const [amountPerBox, setAmountPerBox] = useState(1);
  const [numberOfBoxes, setNumberOfBoxes] = useState(1);

  const totalAvailable = product.quantity;
  const totalDistributed = amountPerBox * numberOfBoxes;
  const isInvalid = totalDistributed > totalAvailable;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Asignar unidades de: {product.name}
      </h2>

      <p className="text-center mb-4">
        Unidades disponibles: <strong>{product.quantity}</strong>
      </p>

      {/* Selección de modo */}
      <div className="mb-4">
        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            checked={mode === "one"}
            onChange={() => setMode("one")}
          />
          <span>Enviar todo a UNA caja</span>
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            checked={mode === "multiple"}
            onChange={() => setMode("multiple")}
          />
          <span>Repartir en VARIAS cajas</span>
        </label>
      </div>

      {/* Modo UNA caja */}
      {mode === "one" && (
        <div className="space-y-4">
          <label className="block">
            Seleccionar caja:
            <select
              className="w-full mt-2 border rounded p-2"
              value={selectedBox}
              onChange={(e) => setSelectedBox(Number(e.target.value))}
            >
              {boxes.map((b) => (
                <option key={b.id} value={b.id}>
                  Caja #{b.id + 1}
                </option>
              ))}
            </select>
          </label>

          <button
            className="w-full bg-blue-600 text-white rounded py-2 mt-3"
            onClick={() => onAssignToOneBox(selectedBox, product.quantity)}
          >
            Asignar a caja
          </button>
        </div>
      )}

      {/* Modo VARIAS cajas */}
      {mode === "multiple" && (
        <div className="space-y-4">
          <label className="block">
            Cantidad por caja:
            <input
              type="number"
              className="w-full mt-2 border rounded p-2"
              min={1}
              value={amountPerBox}
              onChange={(e) => setAmountPerBox(Number(e.target.value))}
            />
          </label>

          <label className="block">
            Número de cajas:
            <input
              type="number"
              min={1}
              className="w-full mt-2 border rounded p-2"
              value={numberOfBoxes}
              onChange={(e) => setNumberOfBoxes(Number(e.target.value))}
            />
          </label>

          {isInvalid && (
            <p className="text-red-600 text-sm">
              No puedes distribuir más de lo disponible.
            </p>
          )}

          <button
            className="w-full bg-blue-600 text-white rounded py-2 mt-3 disabled:bg-gray-400"
            disabled={isInvalid}
            onClick={() => {
              onAssignToMultipleBoxes(amountPerBox, numberOfBoxes);
              onClose();
            }}
          >
            Repartir en cajas
          </button>
        </div>
      )}
    </Modal>
  );
}
