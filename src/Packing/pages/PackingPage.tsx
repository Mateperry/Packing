import Boxlist from "../components/Boxlist";

function Packing() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="bg-green-500 text-white text-center py-2 px-6 rounded-full text-lg font-semibold w-full md:w-auto">
          DISTRIBUCIÓN DE PRODUCTOS
        </h2>
        <div className="flex gap-2">
          <button className="bg-red-100 text-red-500 px-4 py-2 rounded-full border border-red-300 hover:bg-red-200 transition">
            Cancelar proceso
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
            Finalizar proceso
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar izquierda */}
        <div className="w-full md:w-1/4 bg-gray-50 rounded-xl p-4 flex flex-col gap-3 shadow-inner max-h-[500px] overflow-y-auto">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="text-center text-gray-500 font-medium mb-2">Cantidad de items: 16</div>

          <div className="flex flex-col gap-2">
            {/* Items */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-gray-100 transition">
              <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center rounded">1</div>
              <span className="text-sm font-medium">AXN02N</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow hover:bg-gray-100 transition">
              <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center rounded">1</div>
              <span className="text-sm font-medium">AXN02P</span>
            </div>
            {/* Agregar más items aquí */}
          </div>
        </div>

        {/* Contenido principal (Boxlist) */}
        <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-inner">
          <Boxlist />
        </div>
      </div>
    </div>
  );
}

export default Packing;






















