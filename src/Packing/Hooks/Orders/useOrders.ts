// src/Packing/Hooks/Hooks/useOrders.ts

// Importamos useState y useEffect de React
// useState nos permite tener estados en un componente o hook
// useEffect nos permite ejecutar código cuando el componente se monta o cuando cambian ciertas dependencias
import { useState, useEffect } from "react";

// Importamos el servicio que tiene la función para obtener los pedidos
// Ajusta la ruta según la estructura de tu proyecto
import { OrdersService } from "../../api/orders.service";

// Creamos un hook personalizado llamado useOrders
// Los hooks personalizados empiezan con "use" y nos permiten encapsular lógica reutilizable
export function useOrders() {
  // Estado para almacenar la lista de pedidos
  // Inicialmente es un array vacío
  const [orders, setOrders] = useState<any[]>([]);

  // Estado para manejar la carga de datos
  // Inicialmente true porque estamos por obtener los pedidos
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta cuando el componente que use este hook se monta
  useEffect(() => {
    // Llamamos al servicio para obtener los pedidos
    OrdersService.getOrders()
      .then(data => 
        // Cuando la promesa se resuelve, guardamos los pedidos en el estado
        setOrders(data)
      )
      .finally(() => 
        // Independientemente de si la promesa se resolvió o hubo un error,
        // cambiamos loading a false para indicar que terminó la carga
        setLoading(false)
      );
    // El array vacío [] significa que esto se ejecuta solo una vez al montar el hook
  }, []);

  // Retornamos los estados para que puedan ser usados en cualquier componente
  // orders: contiene los pedidos
  // loading: indica si los pedidos aún se están cargando
  return { orders, loading };
}

