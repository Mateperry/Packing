// src/Packing/components/UI/AssignItemsModal.tsx

import { useState, useEffect } from "react";
import Modal from "./Modal"; // Componente base para mostrar modal
import type { Product } from "../../interfaces/Product";

// Props del componente
interface Props {
  isOpen: boolean; // Estado del modal abierto/cerrado
  onClose: () => void; // Función para cerrar el modal
  product: Product | null; // Producto seleccionado para repartir
  onAssignToMultipleBoxes: (
    amountPerBox: number, // cantidad que irá en cada caja
    numberOfBoxes: number // cantidad de cajas
  ) => void; 
}

// Componente principal
export default function AssignItemsModal({
  isOpen,
  onClose,
  product,
  onAssignToMultipleBoxes,
}: Props) {
  // Si no hay producto seleccionado, no renderizamos nada
  if (!product) return null;

  // Estado para inputs: cantidad por caja y número de cajas
  const [amountPerBox, setAmountPerBox] = useState<number | "">("");
  const [numberOfBoxes, setNumberOfBoxes] = useState<number | "">("");

  // Calcula el total que se distribuiría según los inputs
  const totalAvailable =
    typeof amountPerBox === "number" && typeof numberOfBoxes === "number"
      ? amountPerBox * numberOfBoxes
      : 0;

  // Validación: no se puede superar la cantidad total, ni poner valores < 1
  const isInvalid =
    totalAvailable > product.quantity ||
    (amountPerBox !== "" && amountPerBox < 1) ||
    (numberOfBoxes !== "" && numberOfBoxes < 1);

  // Resetear inputs cada vez que cambie el producto
  useEffect(() => {
    setAmountPerBox("");
    setNumberOfBoxes("");
  }, [product]);

  // === Funciones para manejar cambios en inputs ===
  
  const handleAmountChange = (value: string) => {
    const num = Number(value);
    if (value === "") return setAmountPerBox(""); // input vacío
    if (isNaN(num) || num < 1) return setAmountPerBox(1); // no negativos ni cero
    setAmountPerBox(num);
  };

  const handleNumberChange = (value: string) => {
    const num = Number(value);
    if (value === "") return setNumberOfBoxes(""); // input vacío
    if (isNaN(num) || num < 1) return setNumberOfBoxes(1); // no negativos ni cero
    setNumberOfBoxes(num);
  };

  // Confirmar asignación
  const handleAssign = () => {
    if (amountPerBox === "" || numberOfBoxes === "") return; // validar que haya valores
    onAssignToMultipleBoxes(amountPerBox as number, numberOfBoxes as number); // llamamos al padre
    onClose(); // cerramos modal
  };

  // === Render del modal ===
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Título */}
      <h2 className="text-sm font-semibold mb-3 text-center text-gray-800">
        Repartir unidades de:<br />
        <span className="text-[#152c48]  text-base">
          {product.description}
        </span>
      </h2>

      {/* Información de unidades disponibles */}
      <p className="text-center mb-4 text-gray-700">
        Unidades disponibles: <strong>{product.quantity}</strong>
      </p>

      <div className="space-y-4">
        {/* Input: cantidad por caja */}
        <label className="block text-gray-700 font-medium">
          Cantidad por caja
          <input
            type="number"
            placeholder="Ingrese cantidad"
            value={amountPerBox}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="mt-2 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152c48] placeholder-gray-400 text-center border-[#152c48]"
            min={1}
          />
        </label>

        {/* Input: número de cajas */}
        <label className="block text-gray-700 font-medium">
          Número de cajas
          <input
            type="number"
            placeholder="Ingrese cantidad"
            value={numberOfBoxes}
            onChange={(e) => handleNumberChange(e.target.value)}
            className="mt-2 w-full p-3 border border-[#152c48] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152c48] placeholder-gray-400 text-center"
            min={1}
          />
        </label>

        {/* Mensaje de error si la distribución excede el stock */}
        {isInvalid && (
          <p className="text-red-600 text-sm text-center">
            La distribución excede las unidades disponibles.
          </p>
        )}

        {/* Botón de acción */}
        <button
          className={`w-full py-3 rounded-lg font-medium transition text-white shadow-md
            ${
              isInvalid || amountPerBox === "" || numberOfBoxes === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#152c48] hover:bg-[#123140]"
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
