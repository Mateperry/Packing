import type { Product } from "../interfaces/Product";
import SearchBar from "./SearchBar";
import DraggableProduct from "./DraggableProduct";
import { useSearchProducts } from "../Hooks/useSearchProducts";
import { usePagination } from "../Hooks/usePagination";
import PaginationButtons from "./PaginationButtons";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  // Hook de búsqueda
  const { search, onChange, filtered } = useSearchProducts(products);

  // Hook de paginación SOLO sobre los filtrados
  const { page, totalPages, currentItems, nextPage, prevPage, resetPage } = usePagination(filtered, 4);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
    resetPage();
  }

  return (
    <div className="w-full md:w-1/4 bg-gray-50 rounded-xl p-4 flex flex-col gap-3 shadow-inner max-h-20% overflow-y-hidden ">
      <SearchBar value={search} onChange={handleSearch} />

      {/* Cantidad de items */}
      <div className="bg-gray-200 rounded-xl px-4 py-2 flex flex-col items-center justify-center text-gray-700 shadow-sm w-full sm:w-auto">
        <span className="text-xs sm:text-sm">Cantidad de ítems:</span>
        <span className="text-lg sm:text-xl font-semibold">
          {filtered.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>

      {/* Lista filtrada + paginada */}
      <div className="flex flex-col gap-2">
        {currentItems.map((p) => (
          <DraggableProduct key={p.id} product={p} />
        ))}
      </div>

      {/* Botones de paginación */}
      {filtered.length > 4 && (
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
}

export default ProductList;
