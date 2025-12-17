// Importamos la instancia de Supabase ya configurada
import { supabase } from "./supabaseClient";

// Importamos el tipo Product para tipar correctamente los datos que obtenemos
import type { Product } from "../interfaces/Product";

// Definimos un objeto ProductsService que contiene métodos para trabajar con productos
export const ProductsService = {

  // Método asincrónico para obtener todos los productos
  async getProducts(): Promise<Product[]> {
    // Consulta la tabla "products" en Supabase
    const { data, error } = await supabase
      .from("products") // Especifica la tabla
      .select("id, name, description, quantity, color"); // Selecciona solo las columnas necesarias

    // Si hay un error en la consulta, lo lanzamos para que quien llame pueda manejarlo
    if (error) throw error;

    // Retorna los datos obtenidos, o un array vacío si no hay datos
    return data || [];
  },

  // Método para actualizar la cantidad de un producto específico
  async updateProductQuantity(id: number, quantity: number) {
    // Actualiza la tabla "products" estableciendo la nueva cantidad
    const { data, error } = await supabase
      .from("products") // Tabla donde se hará la actualización
      .update({ quantity }) // Campo que queremos actualizar
      .eq("id", id) // Condición: solo actualizar el producto con el ID especificado
      .single(); // Devuelve solo un registro (el producto actualizado)

    // Si hay error, lanzarlo
    if (error) throw error;

    // Retorna el producto actualizado
    return data;
  }
};
