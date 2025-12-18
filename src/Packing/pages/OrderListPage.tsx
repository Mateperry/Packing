import { useOrders } from "../Hooks/Orders/useOrders";
import { useState, useMemo } from "react";
import type { Order } from "../types/order";

interface OrderListPageProps {
  onSelect: (id: string) => void;
}

export default function OrderListPage({ onSelect }: OrderListPageProps) {
  const { orders, loading } = useOrders();
  const [search, setSearch] = useState("");
  const [dateSort, setDateSort] = useState<"desc" | "asc">("desc");

  const formatDate = (date?: string) => {
    if (!date) return "-";
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}/${m}/${day}`;
  };

  const filteredOrders = useMemo(() => {
    const term = search.toLowerCase();

    return orders
      .filter((order: Order) => {
        const formattedDate = formatDate(order.created_at).toLowerCase();
        return (
          order.id?.toString().includes(term) ||
          order.client?.toLowerCase().includes(term) ||
          order.id_client?.toLowerCase().includes(term) ||
          order.Destino?.toLowerCase().includes(term) ||
          formattedDate.includes(term)
        );
      })
      .sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (dateA !== dateB) return dateSort === "desc" ? dateB - dateA : dateA - dateB;
        return dateSort === "desc" ? (b.id ?? 0) - (a.id ?? 0) : (a.id ?? 0) - (b.id ?? 0);
      });
  }, [orders, search, dateSort]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Cargando órdenes…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="bg-[#152c48] text-white text-center py-3 px-6 rounded-full text-lg shadow">
          LISTADO DE ÓRDENES DE COMPRA
        </h2>

        <div className="text-sm text-gray-500 mt-2">
          Total de órdenes: <span className="font-semibold">{filteredOrders.length}</span>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por código, cliente, destino o fecha (YYYY/MM/DD)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-blue-100
                     focus:outline-none focus:ring-2 focus:ring-blue-200
                     text-sm shadow-sm sm:text-base sm:px-5 sm:py-4"
        />
      </div>

      {/* TABLA RESPONSIVE */}
      <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-[#152c48] text-white">
            <tr>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left">Código</th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left">Cliente</th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left">Destino</th>
              <th
                onClick={() => setDateSort(prev => (prev === "desc" ? "asc" : "desc"))}
                className="px-2 py-2 sm:px-4 sm:py-3 text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  Fecha
                  <span className="text-xs">{dateSort === "desc" ? "▼" : "▲"}</span>
                </div>
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-left">Estado</th>
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-right">Valor Total</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 font-medium">
                  No se encontraron órdenes con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order: Order) => (
                <tr
                  key={order.id}
                  onClick={() => onSelect(order.id?.toString() || "")}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium text-blue-900 flex items-center gap-1 sm:gap-2">
                    ORD-{order.id}
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <div className="font-medium">{order.client || "-"}</div>
                    <div className="text-xs text-gray-400">ID: {order.id_client || "-"}</div>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">{order.Destino || "-"}</td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-gray-500">{formatDate(order.created_at)}</td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      {order.status || "-"}
                    </span>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-right font-semibold">
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
