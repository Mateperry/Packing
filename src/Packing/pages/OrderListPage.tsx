// Importamos el hook personalizado para obtener las órdenes
import { useOrders } from "../Hooks/Orders/useOrders";

// Importamos hooks de React para manejar estado y memorizar cálculos
import { useState, useMemo } from "react";

// Importamos el tipo de Order para TypeScript
import type { Order } from "../types/order";

// Definimos las props del componente
interface OrderListPageProps {
  // onSelect es una función que se llamará cuando el usuario seleccione una orden
  onSelect: (id: string) => void;
}

// Componente principal de la página de listado de órdenes
export default function OrderListPage({ onSelect }: OrderListPageProps) {

  // Obtenemos las órdenes, el estado de carga y posibles errores desde el hook useOrders
  const { orders, loading, error } = useOrders();

  // Estado para almacenar el término de búsqueda
  const [search, setSearch] = useState("");

  // Estado para definir el orden de las fechas (ascendente o descendente)
  const [dateSort, setDateSort] = useState<"desc" | "asc">("desc");

  // Función para formatear la fecha en formato YYYY/MM/DD
  const formatDate = (date?: string) => {
    if (!date) return "-"; // Si no hay fecha, mostramos "-"
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0"); // Mes con 2 dígitos
    const day = String(d.getDate()).padStart(2, "0");    // Día con 2 dígitos
    return `${y}/${m}/${day}`;
  };

  // Calcula la última orden creada usando useMemo para optimizar
  const latestOrderId = useMemo(() => {
    if (!orders.length) return null;

    // Reduce busca la orden con fecha más reciente
    return orders.reduce((latest, current) => {
      const latestDate = latest.created_at ? new Date(latest.created_at).getTime() : 0;
      const currentDate = current.created_at ? new Date(current.created_at).getTime() : 0;

      // Si las fechas son iguales, fallback por ID
      if (currentDate === latestDate) {
        return (current.id ?? 0) > (latest.id ?? 0) ? current : latest;
      }

      // Si no, devolvemos la más reciente
      return currentDate > latestDate ? current : latest;
    }).id;
  }, [orders]);

  // Filtra y ordena las órdenes según búsqueda y fecha
  const filteredOrders = useMemo(() => {
    const term = search.toLowerCase(); // Convertimos término de búsqueda a minúsculas

    return orders
      .filter((order: Order) => {
        // Formateamos la fecha para poder buscar también por ella
        const formattedDate = formatDate(order.created_at).toLowerCase();

        // Retorna true si el término coincide con ID, cliente, destino o fecha
        return (
          order.id?.toString().includes(term) ||
          order.client?.toLowerCase().includes(term) ||
          order.id_client?.toLowerCase().includes(term) ||
          order.Destino?.toLowerCase().includes(term) ||
          formattedDate.includes(term)
        );
      })
      .sort((a, b) => {
        // Ordenar por fecha
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

        if (dateA !== dateB) {
          return dateSort === "desc" ? dateB - dateA : dateA - dateB;
        }

        // Si las fechas son iguales, fallback por ID
        return dateSort === "desc"
          ? (b.id ?? 0) - (a.id ?? 0)
          : (a.id ?? 0) - (b.id ?? 0);
      });
  }, [orders, search, dateSort]);

  // Si está cargando, mostramos mensaje de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Cargando órdenes…
      </div>
    );
  }

  // Si hay error al cargar órdenes, lo mostramos
  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  // Renderizado principal de la página
  return (
    <div className="min-h-screen bg-white px-4 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="bg-[#152c48] text-white text-center py-3 px-6 rounded-full text-lg shadow">
          LISTADO DE ÓRDENES DE COMPRA
        </h2>

        {/* Mostrar total de órdenes filtradas */}
        <div className="text-sm text-gray-500 mt-2">
          Total de órdenes:{" "}
          <span className="font-semibold">{filteredOrders.length}</span>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por código, cliente, destino o fecha (YYYY/MM/DD)"
          value={search} // Valor del input vinculado al estado search
          onChange={(e) => setSearch(e.target.value)} // Actualiza estado al escribir
          className="w-full px-4 py-3 rounded-xl border border-blue-100
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     text-sm shadow-sm"
        />
      </div>

      {/* TABLA DE ÓRDENES */}
      <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[#152c48] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Código</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Destino</th>

              {/* ORDENAR POR FECHA */}
              <th
                onClick={() =>
                  setDateSort(prev => (prev === "desc" ? "asc" : "desc")) // Cambia asc/desc al hacer clic
                }
                className="px-4 py-3 text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  Fecha
                  <span className="text-xs">
                    {dateSort === "desc" ? "▼" : "▲"} {/* Flecha indica orden */}
                  </span>
                </div>
              </th>

              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-right">Valor Total</th>
            </tr>
          </thead>

          <tbody>
            {/* Si no hay órdenes filtradas, mostramos mensaje */}
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No se encontraron órdenes con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              // Mapear cada orden filtrada para mostrar en la tabla
              filteredOrders.map((order: Order) => (
                <tr
                  key={order.id} // Key única
                  onClick={() => onSelect(order.id?.toString() || "")} // Selecciona la orden al hacer clic
                  className={`cursor-pointer hover:bg-gray-50`} // Estilo al pasar el mouse
                >
                  {/* Código de la orden */}
                  <td className="px-4 py-3 font-medium text-blue-900 flex items-center gap-2">
                    ORD-{order.id}
                  </td>

                  {/* Cliente e ID de cliente */}
                  <td className="px-4 py-3">
                    <div className="font-medium">{order.client || "-"}</div>
                    <div className="text-xs text-gray-400">
                      ID: {order.id_client || "-"}
                    </div>
                  </td>

                  {/* Destino */}
                  <td className="px-4 py-3">{order.Destino || "-"}</td>

                  {/* Fecha */}
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(order.created_at)}
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {order.status || "-"}
                    </span>
                  </td>

                  {/* Valor total */}
                  <td className="px-4 py-3 text-right font-semibold">
                    {order.Valor_total !== undefined
                      ? `$${order.Valor_total.toLocaleString()}`
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
