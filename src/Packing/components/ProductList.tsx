import type { Product } from "../interfaces/Product";
import SearchBar from "./SearchBar";
import DraggableProduct from "./DraggableProduct";
import { useSearchProducts } from "../Hooks/useSearchProducts";
import { usePagination } from "../Hooks/usePagination";
import PaginationButtons from "./PaginationButtons";
import { useResponsiveItems } from "../Hooks/useResponsiveItems"; // ⬅️ nuevo

interface ProductListProps {
  products: Product[];
  usedProductIds?: number[]; // IDs de productos que ya están en cajas
}

function ProductList({ products, usedProductIds = [] }: ProductListProps) {
  // Filtramos productos que ya están en cajas o que su cantidad es 0
  const availableProducts = products.filter(
    (p) => p.quantity > 0 && !usedProductIds.includes(p.id)
  );

  // Hook de búsqueda
  const { search, onChange, filtered } = useSearchProducts(availableProducts);

  // ⬅️ NEW: items por página según dispositivo
  const itemsPerPage = useResponsiveItems();

  // Hook de paginación SOLO sobre los filtrados
  const { page, totalPages, currentItems, nextPage, prevPage, resetPage } =
    usePagination(filtered, itemsPerPage);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
    resetPage();
  }

  return (
    <div className=" w-full sm:w-2/12 md:w-3/12  lg:w-1/4 xl:w-1/6  bg-gray-50  rounded-xl  p-4  flex  flex-col  gap-3  shadow-inner max-h-full ">

      <SearchBar value={search} onChange={handleSearch} />

      {/* Cantidad de items */}
      <div className="bg-gray-200 rounded-xl px-4 py-2 flex flex-col items-center justify-center text-gray-700 shadow-sm w-full sm:w-auto ">
        <span className="text-base sm:text-xs md:text-xs lg:text-base">Cantidad de ítems:</span>
        <span className="text-base sm:text-sm  md:text-sm lg:text-base font-semibold">
          {filtered.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>

      {/* Lista filtrada + paginada */}
      <div className="flex flex-col gap-2  max-h-[50hvh]">
        {currentItems.map((p) => (
          <DraggableProduct key={p.id} product={p} />
        ))}
      </div>

      {/* Botones de paginación */}
      {filtered.length > itemsPerPage && (
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
