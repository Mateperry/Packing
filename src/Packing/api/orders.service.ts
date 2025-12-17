// Importa la instancia de Supabase ya configurada
import { supabase } from "./supabaseClient";

// Definimos un objeto llamado OrdersService que contendrá métodos para trabajar con las órdenes
export const OrdersService = {

  // Método asincrónico para obtener todas las órdenes
  async getOrders() {
    // Usamos Supabase para consultar la tabla "orders"
    // Supabase devuelve un objeto con `data` y `error`
    const { data, error } = await supabase
      .from("orders") // Tabla de la que queremos obtener los datos
      .select(`  // Seleccionamos únicamente las columnas necesarias
        id,          // ID de la orden
        status,      // Estado de la orden (ej. pendiente, completada)
        products,    // Lista de productos asociados a la orden
        created_at,  // Fecha de creación de la orden
        client,      // Nombre del cliente
        id_client,   // ID del cliente
        Destino,     // Dirección o destino de la entrega
        Valor_total  // Valor total de la orden
      `)
      .order("id", { ascending: true }); // Ordenamos las órdenes por ID de manera ascendente

    // Si hubo un error en la consulta, lo lanzamos para que pueda ser manejado por quien llame este método
    if (error) throw error;

    // Retornamos los datos obtenidos de la tabla
    return data;
  }

};
