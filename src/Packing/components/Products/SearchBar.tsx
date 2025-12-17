// Importamos el icono de búsqueda de Material UI
import SearchIcon from "@mui/icons-material/Search";

// Props del componente
interface SearchBarProps {
  value: string; // Valor actual del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función que se ejecuta al cambiar el texto
}

// Componente principal
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className="
        flex items-center gap-2 bg-white border border-[#152c48] rounded-full 
        shadow-sm 
        px-2 py-1       /* Padding en mobile */
        sm:px-3 sm:py-2 /* Padding en tablets */
        md:px-4 md:py-2 /* Padding en desktop */
      "
    >
      {/* Icono de lupa */}
      <SearchIcon
        className="
          text-gray-500 
          text-sm 
          sm:text-base   /* Tamaño en tablets */
          md:text-lg     /* Tamaño en desktop */
        "
      />

      {/* Input de búsqueda */}
      <input
        type="text"
        value={value}        // Valor controlado por el estado externo
        onChange={onChange}  // Llama a la función al cambiar texto
        placeholder="Buscar producto" // Texto guía
        className="
          w-full text-sm 
          sm:text-sm 
        "
      />
    </div>
  );
}
