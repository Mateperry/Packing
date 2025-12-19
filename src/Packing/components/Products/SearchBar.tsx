// Importamos el icono de búsqueda de Material UI
import SearchIcon from "@mui/icons-material/Search";

// Props del componente
interface SearchBarProps {
  value: string; // Valor actual del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función al cambiar texto
}

// Componente principal
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className="
        flex items-center gap-2
        bg-white
        border border-[#152c48]
        rounded-full
        shadow-sm

        px-2 py-1
        sm:px-3 sm:py-2
        md:px-4 md:py-2

        transition
        focus-within:ring-2
        focus-within:ring-[#152c48]
        focus-within:ring-opacity-40
      "
    >
      {/* Icono de lupa */}
      <SearchIcon
        className="
          text-gray-500
          text-sm
          sm:text-base
          md:text-lg
          pointer-events-none
        "
      />

      {/* Input de búsqueda */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar producto"
        className="
          w-full
          bg-transparent
          text-sm
          sm:text-sm

          outline-none
          focus:outline-none

          placeholder-gray-400
          caret-[#152c48]

          [-webkit-tap-highlight-color:transparent]
        "
      />
    </div>
  );
}
