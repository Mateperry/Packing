// src/Packing/components/Products/ProductList.tsx
import { useState } from "react";
import type { Product } from "../../interfaces/Product";

import SearchBar from "../Products/SearchBar";
import DraggableProduct from "../Products/DraggableProduct";
import PaginationButtons from "../Products/PaginationButtons";
import AssignItemsModal from "../UI/AssignItemsModal";

import { useSearchProducts } from "../../Hooks/useSearchProducts";
import { usePagination } from "../../Hooks/usePagination";
import { useResponsiveItems } from "../../Hooks/useResponsiveItems";
import { useToggleVisibility } from "../../Hooks/useToggleVisibility";

import EyeToggleButton from "../common/EyeToggleButton";

interface ProductListProps {
  products: Product[];
  usedProductIds?: number[];
  boxes: { id: number; productos: Product[] }[];
  decreaseQuantity: (id: number, amount: number) => void;
  assignToBox?: (product: Product | number, boxId: number, amount: number) => void;
  assignToMultipleBoxes?: (
    product: Product | number,
    amountPerBox: number,
    numberOfBoxes: number
  ) => void;
}

function ProductList({
  products,
  usedProductIds = [],
  boxes,
  decreaseQuantity,
  assignToBox,
  assignToMultipleBoxes,
}: ProductListProps) {
  const availableProducts = products.filter(
    (p) => p.quantity > 0 && !usedProductIds.includes(p.id)
  );

  const { search, onChange, filtered } = useSearchProducts(availableProducts);
  const itemsPerPage = useResponsiveItems();

  const { page, totalPages, currentItems, nextPage, prevPage, resetPage } =
    usePagination(filtered, itemsPerPage);

const { visible: showDescription, toggle } = useToggleVisibility(true);


  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
    resetPage();
  }

  // ---------------------------
  //  MODAL
  // ---------------------------
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openAssignModal(product: Product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }
  // ---------------------------

  return (
    <div className="w-full sm:w-2/12 md:w-3/12 lg:w-1/4 xl:w-1/5 bg-gray-50 rounded-xl p-4 flex flex-col gap-3 shadow-inner max-h-full">
      {/* Barra de búsqueda */}
      <SearchBar value={search} onChange={handleSearch} />

      {/* Cantidad de ítems */}
      <div className="bg-gray-200 rounded-xl px-4 py-2 flex flex-col items-center justify-center text-gray-700 shadow-sm w-full sm:w-auto relative">
        <div className="absolute top-1 right-1 bg-transparent">
          <EyeToggleButton active={showDescription} onToggle={toggle} size={15} />
        </div>
        <span className="text-base sm:text-xs md:text-xs lg:text-base">Cantidad de SKU:</span>
        <span className="text-base sm:text-sm md:text-sm lg:text-base font-semibold">
          {filtered.length}
        </span>
      </div>

      {/* Lista filtrada + paginada */}
      <div className="flex flex-col gap-2 max-h-[80vh] ">
        {currentItems.map((p) => (
          <DraggableProduct
            key={p.id}
            product={p}
            showDescription={showDescription}
            onOpenAssign={() => openAssignModal(p)}
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

      {/* ---------------------------
           MODAL FINAL
         --------------------------- */}
      <AssignItemsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        boxes={boxes}
        onAssignToOneBox={(boxId: number, amount: number) => {
          if (!selectedProduct) return;

          if (assignToBox) {
            assignToBox(selectedProduct, boxId, amount);
          } else {
            decreaseQuantity(selectedProduct.id, amount);
          }

          closeModal();
        }}
        onAssignToMultipleBoxes={(amountPerBox: number, numberOfBoxes: number) => {
          if (!selectedProduct) return;

          if (assignToMultipleBoxes) {
            assignToMultipleBoxes(selectedProduct, amountPerBox, numberOfBoxes);
          } else {
            const total = amountPerBox * numberOfBoxes;
            decreaseQuantity(selectedProduct.id, total);
          }

          closeModal();
        }}
      />
    </div>
  );
}

export default ProductList;

