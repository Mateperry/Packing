// src/Packing/components/distribution/RepartirPanel.tsx

import { useState } from "react"; 
import type { Product } from "../../interfaces/Product";

// Props que recibe el componente
interface Props {
  product: Product;                  // Producto a repartir
  cantidadDeCajas: number;           // Número total de cajas disponibles
  onConfirm: (reparto: number[]) => void; // Función que recibe un array con la cantidad asignada a cada caja
  onClose: () => void;               // Función para cerrar el panel
}

// Componente principal
export default function RepartirPanel({ product, cantidadDeCajas, onConfirm, onClose }: Props) {
  // Estado del modo de reparto: "normal" (manual), "pares", "impares"
  const [modo, setModo] = useState<"normal" | "pares" | "impares">("normal");

  // Estado de las cajas: array con la cantidad de unidades por caja
  const [cajas, setCajas] = useState<number[]>(Array(cantidadDeCajas).fill(0));

  // === FUNCIONES ===

  // Actualiza la cantidad de una caja específica
  const handleChange = (index: number, value: number) => {
    const copy = [...cajas]; // copiamos el array para no mutar directamente
    copy[index] = value;      // actualizamos la posición correspondiente
    setCajas(copy);           // actualizamos el estado
  };

  // Confirmar reparto
  const handleConfirm = () => {
    const total = cajas.reduce((sum, n) => sum + n, 0); // sumamos todas las unidades
    if (total !== product.quantity) {
      // Validación: el total debe coincidir con la cantidad del producto
      alert(`Debes repartir exactamente ${product.quantity} unidades.`);
      return;
    }
    onConfirm(cajas); // enviamos el reparto al padre
    onClose();        // cerramos el panel
  };

  // Función rápida para asignar unidades por modo "pares" o "impares"
  const aplicarModo = (modo: "pares" | "impares") => {
    const copy = Array(cantidadDeCajas).fill(0); // iniciamos con ceros
    let remaining = product.quantity;            // unidades restantes por repartir
    for (let i = 0; i < cantidadDeCajas; i++) {
      if (modo === "pares") {
        copy[i] = remaining >= 2 ? 2 : remaining; // asignamos 2 por caja hasta agotar
      } else {
        copy[i] = remaining >= 1 ? 1 : 0;        // asignamos 1 por caja hasta agotar
      }
      remaining -= copy[i]; // descontamos del total restante
      if (remaining <= 0) break; // salimos si ya no queda nada
    }
    setCajas(copy); // actualizamos el estado
  };

  // === RENDER ===
  return (
    <div className="flex flex-col gap-4">
      {/* Información del producto y cantidad total */}
      <p className="text-gray-700">
        Repartir <span className="font-semibold">{product.name}</span> ({product.quantity} unidades)
      </p>

      {/* Selección de modo de reparto */}
      <div className="flex gap-2 items-center">
        <label>Modo: </label>
        <select
          value={modo}
          onChange={(e) => {
            const value = e.target.value as "normal" | "pares" | "impares";
            setModo(value); 
            // Si es pares o impares, aplicamos el modo automáticamente
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

      {/* Inputs individuales para cada caja */}
      <div className="flex flex-col gap-2">
        {cajas.map((n, i) => (
          <div key={i} className="flex items-center gap-2">
            <span>Caja {i + 1}:</span>
            <input
              type="number"
              min={0}
              max={product.quantity} // no puede superar la cantidad total
              value={n}             // valor actual
              onChange={(e) => handleChange(i, Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
        ))}
      </div>

      {/* Botones de acción */}
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


