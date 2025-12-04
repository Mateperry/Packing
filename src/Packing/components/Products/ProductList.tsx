import type { Product } from "../../interfaces/Product";

import SearchBar from "../Products/SearchBar";
import DraggableProduct from "../Products/DraggableProduct";
import PaginationButtons from "../Products/PaginationButtons";

import { useSearchProducts } from "../../Hooks/useSearchProducts";
import { usePagination } from "../../Hooks/usePagination";
import { useResponsiveItems } from "../../Hooks/useResponsiveItems";
import { useToggleVisibility } from "../../Hooks/useToggleVisibility";

import EyeToggleButton from "../common/EyeToggleButton";

interface ProductListProps {
  products: Product[];
  usedProductIds?: number[];
}

function ProductList({ products, usedProductIds = [] }: ProductListProps) {
  const availableProducts = products.filter(
    (p) => p.quantity > 0 && !usedProductIds.includes(p.id)
  );

  const { search, onChange, filtered } = useSearchProducts(availableProducts);
  const itemsPerPage = useResponsiveItems();

  const { page, totalPages, currentItems, nextPage, prevPage, resetPage } =
    usePagination(filtered, itemsPerPage);

  const { visible: showDescription, toggle } = useToggleVisibility(false);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
    resetPage();
  }

  return (
    <div className="w-full sm:w-2/12 md:w-3/12 lg:w-1/4 xl:w-1/5 bg-gray-50 rounded-xl p-4 flex flex-col gap-3 shadow-inner max-h-full">

      {/* OJO ARRIBA DERECHA */}

      {/* Barra de búsqueda */}
      <SearchBar value={search} onChange={handleSearch} />

      {/* Cantidad de ítems */}
<div className="bg-gray-200 rounded-xl px-4 py-2 flex flex-col items-center justify-center text-gray-700 shadow-sm w-full sm:w-auto relative">
  {/* Ojito en la esquina superior derecha */}
  <div className="absolute top-1 right-1 bg-transparent">
    <EyeToggleButton  active={showDescription} onToggle={toggle} size={15} />
  </div>

  {/* Contenido centrado */}
  <span className="text-base sm:text-xs md:text-xs lg:text-base">
    Cantidad de ítems:
  </span>
  <span className="text-base sm:text-sm md:text-sm lg:text-base font-semibold">
    {filtered.reduce((sum, item) => sum + item.quantity, 0)}
  </span>
</div>


      {/* Lista filtrada + paginada */}
      <div className="flex flex-col gap-2 max-h-[50hvh]">
        {currentItems.map((p) => (
          <DraggableProduct
            key={p.id}
            product={p}
            showDescription={showDescription}
          />
        ))}
      </div>

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
