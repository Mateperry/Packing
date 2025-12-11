import { useState, useEffect } from "react";
import Modal from "./Modal";
import type { Product } from "../../interfaces/Product";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAssignToMultipleBoxes: (
    amountPerBox: number,
    numberOfBoxes: number
  ) => void;
}

export default function AssignItemsModal({
  isOpen,
  onClose,
  product,
  onAssignToMultipleBoxes,
}: Props) {
  if (!product) return null;

  const [amountPerBox, setAmountPerBox] = useState<number | "">("");
  const [numberOfBoxes, setNumberOfBoxes] = useState<number | "">("");

  const totalAvailable =
    typeof amountPerBox === "number" && typeof numberOfBoxes === "number"
      ? amountPerBox * numberOfBoxes
      : 0;

  const isInvalid =
    totalAvailable > product.quantity ||
    (amountPerBox !== "" && amountPerBox < 1) ||
    (numberOfBoxes !== "" && numberOfBoxes < 1);

  // Reset cuando cambia de producto
  useEffect(() => {
    setAmountPerBox("");
    setNumberOfBoxes("");
  }, [product]);

  // Validaciones: no negativos, no cero, inputs libres
  const handleAmountChange = (value: string) => {
    const num = Number(value);
    if (value === "") return setAmountPerBox("");
    if (isNaN(num) || num < 1) return setAmountPerBox(1);
    setAmountPerBox(num);
  };

  const handleNumberChange = (value: string) => {
    const num = Number(value);
    if (value === "") return setNumberOfBoxes("");
    if (isNaN(num) || num < 1) return setNumberOfBoxes(1);
    setNumberOfBoxes(num);
  };

  const handleAssign = () => {
    if (amountPerBox === "" || numberOfBoxes === "") return;
    onAssignToMultipleBoxes(amountPerBox as number, numberOfBoxes as number);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
<h2 className="text-sm font-semibold mb-3 text-center text-gray-800">
  Repartir unidades de:<br />
  <span className="text-[#152c48]  text-base">
    {product.description}
  </span>
</h2>

      <p className="text-center mb-4 text-gray-700">
        Unidades disponibles: <strong>{product.quantity}</strong>
      </p>

      <div className="space-y-4">
        {/* Cantidad por caja */}
        <label className="block text-gray-700 font-medium">
          Cantidad por caja
          <input
            type="number"
            placeholder="Ingrese cantidad"
            value={amountPerBox}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b8a1a] placeholder-gray-400 text-center border-[#80ac22]"
            min={1}
          />
        </label>

        {/* Número de cajas */}
        <label className="block text-gray-700 font-medium">
          Número de cajas
          <input
            type="number"
            placeholder="Ingrese cantidad"
            value={numberOfBoxes}
            onChange={(e) => handleNumberChange(e.target.value)}
            className="mt-2 w-full p-3 border border-[#80ac22] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b8a1a] placeholder-gray-400 text-center"
            min={1}
          />
        </label>

        {/* Mensaje de error */}
        {isInvalid && (
          <p className="text-red-600 text-sm text-center">
            La distribución excede las unidades disponibles.
          </p>
        )}

        {/* Botón Asignar */}
        <button
          className={`w-full py-3 rounded-lg font-medium transition text-white shadow-md
            ${
              isInvalid || amountPerBox === "" || numberOfBoxes === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#80ac22] hover:bg-[#6b8a1a]"
            }`}
          disabled={isInvalid || amountPerBox === "" || numberOfBoxes === ""}
          onClick={handleAssign}
        >
          Repartir en cajas
        </button>
      </div>
    </Modal>
  );
}
