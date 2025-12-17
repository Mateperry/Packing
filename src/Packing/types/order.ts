// Importamos el tipo Product que representa la estructura de cada producto
import type { Product } from "../interfaces/Product";

// Definimos la interfaz Order, que representa un pedido
export interface Order {
  id: number; // ID único del pedido
  status: string; // Estado del pedido (ej. "pendiente", "enviado", "entregado")
  products: Product[]; // Array de productos incluidos en este pedido
  created_at?: string; // Fecha de creación del pedido (opcional)
  client: string; // Nombre del cliente
  id_client: string; // ID del cliente en la base de datos
  Destino: string; // Dirección o lugar de entrega
  Valor_total: number; // Valor total del pedido en moneda local
}

