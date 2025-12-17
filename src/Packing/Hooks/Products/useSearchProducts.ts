// Este componente lo que hace es tener la logica de busqueda, de nuestra barra de busqueda. 




// Importamos Hook directos de react, como lo son useState y useMemo
//useState para mantener un estado del texto de busqueda. 
//useMemo para memorizar  el resutldado filtrado y evitar un recalculador en cada render inecesariamente
import { useState, useMemo } from "react";

type Props = {
  onSearchChange?: () => void; 
};

export function useSearchProducts<
  T extends { name: string; description: string }
>(items: T[], props?: Props) {

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);

    // 👇 Notifica que hubo cambio en la búsqueda
    props?.onSearchChange?.();
  }

  return {
    search,
    onChange,
    filtered,
  };
}
