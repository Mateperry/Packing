import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className="
        flex items-center gap-2 bg-white border border-[#152c48] rounded-full 
        shadow-sm 
        px-2 py-1       /* Mobile */
        sm:px-3 sm:py-2 /* Tablets */
        md:px-4 md:py-2 /* Desktop */
      "
    >
      <SearchIcon
        className="
          text-gray-500 
          text-sm 
          sm:text-base   /* Tablets */
          md:text-lg     /* Desktop */
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar producto"
        className="
          w-full text-sm 
          sm:text-sm 
          focus:outline-none
        "
      />
    </div>
  );
}
