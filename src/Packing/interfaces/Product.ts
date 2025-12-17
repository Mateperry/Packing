// Definimos la interfaz Product que representa la estructura de un producto
export interface Product {
  id: number; // ID único del producto
  name: string; // Nombre del producto
  description: string; // Descripción del producto
  quantity: number; // Cantidad disponible en inventario
  color?: string; // Color del producto (opcional)
}
