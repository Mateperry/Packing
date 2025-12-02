// Packing/Page/PackingPage.tsx
// Este sera el componente principal de la pagina de packing, donde treemos lo que son parte por parte lo que mostraremos en pantalla
// aquí de igual forma lo que haremos es exportar para que App.tsx pueda importarlo y mostrarlo en pantalla
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// IMPORTACIONES
import { DndContext } from "@dnd-kit/core"; // Aqui traemos la erramienta para poder mover las cosas, el arrastras y soltar que aplicaremos en las productos, necesaria la herramienta
import ProductList from "../components/ProductList"; //Aqui importamos el componente de la lista de productos que mostraremos en pantalla, lo que es el componente principal de los productos
import BoxList from "../components/Boxlist"; // Aqui importamos el componente de la lista de cajas que mostraremos en pantalla, lo que es el componente principal de las cajas
import HomeButtons from "../components/HomeButtons";// Aqui importamos el componente de los botones principales que mostraremos en pantalla los dos principales que son Cancelar Proceso y Finalizar proceso
import { usePackingService } from "../Hooks/usePackingService"; // Este es el asistente personal, un hook que guarda todos los datos y funciones necesarias para organizar los productos.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// COMPONENTE PRINCIPAL DE LA PAGINA DE PACKING
function PackingPage() {
  // Petición a el Asistente usePackingService para obtener datos y funciones necesarias 
  const {
    products, // Lista de productos disponibles para empacar 
    boxes,     // Lista de cajas con productos empacados                                     
    mostrarTitulos, // Estado que indica si se deben mostrar los títulos de las cajas   
    alternarTitulo, // Función para alternar la visibilidad del título de una caja
    eliminarCaja,// Función para eliminar una caja
    aumentarCajas, // Función para aumentar el número de cajas
    handleDragEnd, // Función para manejar el evento de finalización del arrastre
    handleRemoveProduct, // Función para manejar la eliminación de un producto
    handleUpdateQuantity, // Función para manejar la actualización de la cantidad de un producto
    
  } = usePackingService(); // Aquí usamos el asistente para obtener los datos y funciones necesarias

  return (
    <div className="p-3 bg-white rounded-xl shadow-lg max-w-full mx-auto mb-5">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center mb-6 gap-6">
          <h2 className="bg-green-600 text-white text-center py-3 px-6 rounded-full text-lg font-sans w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>
          <HomeButtons />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <ProductList products={products}  />


          <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-inner">
            <BoxList
              boxes={boxes}
              mostrarTitulos={mostrarTitulos}
              alternarTitulo={alternarTitulo}
              eliminarCaja={eliminarCaja}
              agregarCaja={aumentarCajas}
              updateProductQuantity={handleUpdateQuantity}
              removeProduct={handleRemoveProduct}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default PackingPage;
