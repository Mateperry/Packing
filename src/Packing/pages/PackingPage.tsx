// Packing/Page/PackingPage.tsx
// Este será el componente principal de la página de packing,
// donde traeremos las partes que mostraremos en pantalla.
// Aquí de igual forma lo que haremos es exportarlo para que App.tsx pueda importarlo y mostrarlo en pantalla.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// IMPORTACIONES

// Importamos DndContext y los sensores necesarios para permitir arrastrar y soltar.
// 🚀 IMPORTANTE: TouchSensor Y PointerSensor son necesarios para que funcione en CELULARES (Android + iOS).
import {
  DndContext,
  PointerSensor, // Sensor para interacciones del mouse/puntero
  TouchSensor,   // Sensor que permite arrastrar con el dedo en dispositivos táctiles
  MouseSensor,   // Sensor clásico del mouse para PC
  useSensor,     // Hook para inicializar sensores individualmente
  useSensors,    // Hook para agrupar varios sensores
} from "@dnd-kit/core";

import ProductList from "../components/Products/ProductList"; // Lista de productos disponibles para empacar
import BoxList from "../components/Box/Boxlist"; // Lista de cajas con productos
import HomeButtons from "../components/common/HomeButtons"; // Botones principales (Cancelar / Finalizar)
import { usePackingService } from "../Hooks/usePackingService"; // Asistente que contiene datos y funciones para organizar los productos

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// COMPONENTE PRINCIPAL DE LA PÁGINA DE PACKING

function PackingPage() {
  // Petición al asistente usePackingService para obtener datos y funciones necesarias
  const {
    products,            // Lista de productos disponibles
    boxes,               // Lista de cajas existentes
    mostrarTitulos,      // Indica si se deben mostrar los títulos de cada caja
    eliminarCaja,        // Función para eliminar una caja
    aumentarCajas,       // Función para crear una nueva caja
    handleDragEnd,       // Función principal que maneja cuando termina un arrastre
    handleRemoveProduct, // Función para eliminar un producto de una caja
    decrementOne,        // Función para reducir la cantidad de un producto dentro de una caja
  } = usePackingService();

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // 🚀 CONFIGURACIÓN DE SENSORES PARA QUE FUNCIONE EL DRAG & DROP EN CELULARES Y PC
  //
  // dnd-kit NO habilita el arrastre táctil automáticamente.
  // Por eso necesitamos combinar: MouseSensor + TouchSensor + PointerSensor.
  // Esto asegura funcionamiento en:
  //  Computadores
  //  Android
  //  iPhone / iOS

  const sensors = useSensors(
    // Sensor para mouse tradicional (PC)
    useSensor(MouseSensor),

    // Sensor táctil para Android/iPhone
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,    // Tiempo mínimo para evitar que un tap accidental active el drag
        tolerance: 5, // Permite pequeños movimientos sin activar el arrastre
      },
    }),

    // Sensor universal adicional para punteros modernos
    useSensor(PointerSensor)
  );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // RENDERIZADO DEL COMPONENTE PRINCIPAL

  return (
    <div className="p-3 bg-white rounded-xl shadow-lg max-w-full mx-auto mb-5 my-scroll">
      {/* 
        🚀 Aquí envolvemos el contenido dentro del DndContext.
        Ahora incluye los SENSORS que permiten arrastrar en PC y CELULARES.
      */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>

        {/* Contenedor del título y botones principales */}
        <div className="flex flex-col items-center mb-6 gap-6">
          <h2 className="bg-green-600 text-white text-center py-3 px-6 rounded-full text-lg font-sans w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>

          <HomeButtons /> {/* Botones principales */}
        </div>

        {/* Contenedor de productos y cajas */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Lista de productos disponibles */}
          <ProductList products={products} />

          {/* Contenedor para la lista de cajas */}
          <div className="flex-1 bg-gray-50 rounded-xl p-2 shadow-inner">
            <BoxList
              boxes={boxes}                  // Lista de cajas
              mostrarTitulos={mostrarTitulos} // Estado de títulos visibles
              eliminarCaja={eliminarCaja}     // Función para eliminar caja
              agregarCaja={aumentarCajas}     // Función para agregar caja
              decrementOne={decrementOne}     // Reducir cantidad dentro de caja
              removeProduct={handleRemoveProduct} // Eliminar producto de una caja
            />
          </div>

        </div>

      </DndContext>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// EXPORTACIÓN DEL COMPONENTE PRINCIPAL

export default PackingPage;
