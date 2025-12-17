// Importamos la página principal de empaque
import PackingPage from './Packing/pages/PackingPage';

// Importamos hooks de React para manejar estado y efectos secundarios
import { useState } from 'react';

// Importamos los estilos globales de la aplicación
import './index.css';

// Importamos la página que lista todas las órdenes
import OrderListPage from './Packing/pages/OrderListPage';

// Importamos el tipo de producto para TypeScript
import type { Product } from './Packing/interfaces/Product';

// Importamos el hook personalizado para obtener las órdenes
import { useOrders } from './Packing/Hooks/Orders/useOrders';

function App() {
  // Estado que guarda el ID de la orden seleccionada
  // Inicialmente es null (ninguna orden seleccionada)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Obtenemos la lista de órdenes desde el hook useOrders
  const { orders } = useOrders();

  // Busca la orden seleccionada en la lista de órdenes
  const selectedOrder = orders.find(o => String(o.id) === selectedOrderId);

  // Prepara los productos de la orden seleccionada
  const orderProducts: Product[] = selectedOrder && Array.isArray(selectedOrder.products)
    ? selectedOrder.products.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description || '', // Si no tiene descripción, se pone vacío
        quantity: p.quantity || 1,       // Si no tiene cantidad, se pone 1 por defecto
      }))
    : []; // Si no hay orden seleccionada, devuelve array vacío

  return (
    <>
      {
        // Renderizado condicional:
        // Si no hay orden seleccionada, mostramos la página de lista de órdenes
        !selectedOrderId ? (
          <OrderListPage onSelect={setSelectedOrderId} /> 
        ) : (
          // Si hay una orden seleccionada, mostramos la página de empaque
          <PackingPage 
            orderId={selectedOrderId}          
            orderProducts={orderProducts}      
            onCancel={() => setSelectedOrderId(null)} 
          />
        )
      }
    </>
  );
}

// Exportamos el componente principal para que pueda ser renderizado por React
export default App;
