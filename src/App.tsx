import { useState } from "react";
import "./index.css";

import OrderListPage from "./Packing/pages/OrderListPage";
import PackingPage from "./Packing/pages/PackingPage";
import LabelsPage from "./Packing/pages/LabelsPage";

import type { Product } from "./Packing/interfaces/Product";
import { useOrders } from "./Packing/Hooks/Orders/useOrders";

type View = "orders" | "packing" | "labels";

function App() {
  /* ======================
      ESTADOS PRINCIPALES
  ====================== */
  const [view, setView] = useState<View>("orders");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  //  PRODUCTOS DE LA ORDEN (SE CARGAN UNA SOLA VEZ)
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);

  //  CAJAS LISTAS
  const [readyBoxes, setReadyBoxes] = useState<any[]>([]);

  const { orders } = useOrders();

  /* ======================
      FINALIZAR PROCESO
  ====================== */
  const handleFinalizeProcess = async () => {
    if (!selectedOrderId || readyBoxes.length === 0) return;

    const payload = {
      orderId: selectedOrderId,
      cajas: readyBoxes,
      finishedAt: new Date().toISOString(),
    };

    console.log(" Enviando a base de datos:", payload);

    //  FUTURO (Supabase / API)
    // await supabase.from("packed_orders").insert(payload);

    //  LIMPIEZA TOTAL
    setReadyBoxes([]);
    setOrderProducts([]);
    setSelectedOrderId(null);
    setView("orders");
  };

  /* ======================
     1️ LISTA DE ÓRDENES
  ====================== */
  if (view === "orders") {
    return (
      <OrderListPage
        onSelect={(id) => {
          const order = orders.find((o) => String(o.id) === id);

          if (order && Array.isArray(order.products)) {
            setOrderProducts(
              order.products.map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description || "",
                quantity: p.quantity || 1,
              }))
            );
          }

          setSelectedOrderId(id);
          setView("packing");
        }}
      />
    );
  }

  return (
    <>
      {/* ======================
          2️ PACKING
          (SE MANTIENE MONTADO)
      ====================== */}
      <div className={view === "labels" ? "hidden" : "block"}>
        <PackingPage
          orderId={selectedOrderId!}
          orderProducts={orderProducts}
          onCancel={() => {
            //  cancelar = volver limpio
            setView("orders");
            setSelectedOrderId(null);
            setReadyBoxes([]);
            setOrderProducts([]);
          }}
          onFinishProcess={(boxes) => {
            setReadyBoxes(boxes);
            setView("labels");
          }}
        />
      </div>

      {/* ======================
          3️ RÓTULOS
      ====================== */}
      {view === "labels" && (
        <LabelsPage
          readyBoxes={readyBoxes}
          onExit={() => {
            // 🔙 vuelve SIN resetear packing
            setView("packing");
          }}
          onFinish={handleFinalizeProcess}
        />
      )}
    </>
  );
}

export default App;
