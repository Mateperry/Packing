import { useState } from "react";
import type { Product } from "../interfaces/Product";

interface Props {
  product: Product;
  cantidadDeCajas: number;
  onConfirm: (reparto: number[]) => void; // Array con cantidad de unidades por caja
  onClose: () => void;
}

export default function RepartirPanel({ product, cantidadDeCajas, onConfirm, onClose }: Props) {
  const [modo, setModo] = useState<"normal" | "pares" | "impares">("normal");
  const [cajas, setCajas] = useState<number[]>(Array(cantidadDeCajas).fill(0));

  // Actualiza la cantidad en cada caja
  const handleChange = (index: number, value: number) => {
    const copy = [...cajas];
    copy[index] = value;
    setCajas(copy);
  };

  // Confirmar reparto
  const handleConfirm = () => {
    const total = cajas.reduce((sum, n) => sum + n, 0);
    if (total !== product.quantity) {
      alert(`Debes repartir exactamente ${product.quantity} unidades.`);
      return;
    }
    onConfirm(cajas);
    onClose();
  };

  // Función rápida para aplicar pares/impres
  const aplicarModo = (modo: "pares" | "impares") => {
    const copy = Array(cantidadDeCajas).fill(0);
    let remaining = product.quantity;
    for (let i = 0; i < cantidadDeCajas; i++) {
      if (modo === "pares") {
        copy[i] = remaining >= 2 ? 2 : remaining;
      } else {
        copy[i] = remaining >= 1 ? 1 : 0;
      }
      remaining -= copy[i];
      if (remaining <= 0) break;
    }
    setCajas(copy);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-700">
        Repartir <span className="font-semibold">{product.name}</span> ({product.quantity} unidades)
      </p>

      <div className="flex gap-2 items-center">
        <label>Modo: </label>
        <select
          value={modo}
          onChange={(e) => {
            const value = e.target.value as "normal" | "pares" | "impares";
            setModo(value);
            if (value === "pares" || value === "impares") {
              aplicarModo(value);
            }
          }}
          className="border rounded px-2 py-1"
        >
          <option value="normal">Normal</option>
          <option value="pares">Pares</option>
          <option value="impares">Impares</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {cajas.map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>Caja {i + 1}:</span>
            <input
              type="number"
              min={0}
              max={product.quantity}
              value={n}
              onChange={(e) => handleChange(i, Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Repartir
        </button>
      </div>
    </div>
  );
}

