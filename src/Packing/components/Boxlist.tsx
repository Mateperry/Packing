// BoxList.tsx
import { useState } from "react";
import BoxCard from "./BoxCard";

function BoxList() {
  const [cantidadDeCajas, setCantidadDeCajas] = useState(5);

  // Estado para controlar si se muestra el título de cada caja
  const [mostrarTitulos, setMostrarTitulos] = useState<boolean[]>(Array(5).fill(true));

  // Aumentar cajas
  const aumentarCajas = () => {
    setCantidadDeCajas(prev => prev + 1);
    setMostrarTitulos(prev => [...prev, true]); // Añadir un título visible para la nueva caja
  };

  // Alternar mostrar/ocultar título de una caja
  const alternarTitulo = (index: number) => {
    setMostrarTitulos(prev => {
      const nuevos = [...prev];
      nuevos[index] = !nuevos[index];
      return nuevos;
    });
  };

  // Disminuir cajas
  const eliminarCaja = (index: number) => {
    if (cantidadDeCajas > 1) {
      setCantidadDeCajas(prev => prev - 1);
      setMostrarTitulos(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="  rounded-2xl  bg-gray-50 ">
      {/* GRID DE CAJAS */}
      <div className="grid grid-cols-2 gap-1">
        {Array.from({ length: cantidadDeCajas }).map((_, index) => (
          <BoxCard
            key={index}
            titulo={`Caja ${index + 1}`}
            onEliminar={() => eliminarCaja(index)}
            mostrarTitulo={mostrarTitulos[index]}
            alternarTitulo={() => alternarTitulo(index)}
          />
        ))}
      </div>

      {/* BOTÓN PARA AGREGAR */}
      <button
        onClick={aumentarCajas}
        className="flex items-center gap-2 mx-auto mt-6 bg-orange-500 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-orange-600 transition"
      >
        + Agregar caja
      </button>

      {/* CONTADOR */}
      <p className="text-center mt-4 text-gray-700">
        Total de cajas: <strong>{cantidadDeCajas}</strong>
      </p>
    </div>
  );
}

export default BoxList;
