// Importamos hook de estado de React
import { useState } from "react";

// Tipos
import type { Product } from "../../interfaces/Product";

// Componentes internos
import SearchBar from "../Products/SearchBar";           // Barra de búsqueda
import DraggableProduct from "../Products/DraggableProduct"; // Producto que se puede arrastrar
import PaginationButtons from "../Products/PaginationButtons"; // Botones de paginación
import AssignItemsModal from "../UI/AssignItemsModal";  // Modal para asignar producto a varias cajas

// Hooks personalizados
import { useSearchProducts } from "../../Hooks/Products/useSearchProducts"; // Lógica de búsqueda
import { usePagination } from "../../Hooks/Pagination/usePagination";         // Lógica de paginación
import { useResponsiveItems } from "../../Hooks/UI/useResponsiveItems"; // Items por página según pantalla
import { useToggleVisibility } from "../../Hooks/UI/useToggleVisibility"; // Mostrar/ocultar descripciones

// Botón para mostrar/ocultar información
import EyeToggleButton from "../common/EyeToggleButton";

// Props del componente
interface ProductListProps {
  products: Product[]; // Productos a mostrar
  usedProductIds?: number[]; // IDs de productos ya usados
  decreaseQuantity: (id: number, amount: number) => void; // Reducir cantidad
  assignToMultipleBoxes?: (
    product: Product | number,
    amountPerBox: number,
    numberOfBoxes: number
  ) => void; // Asignar a varias cajas
}

// Componente principal ProductList
function ProductList({
  products,
  usedProductIds = [],
  decreaseQuantity,
  assignToMultipleBoxes,
}: ProductListProps) {

  // Filtramos productos disponibles (cantidad > 0 y no usados)
  const availableProducts = products.filter(
    (p) => p.quantity > 0 && !usedProductIds.includes(p.id)
  );

  // Hook para búsqueda de productos
  const { search, onChange, filtered } = useSearchProducts(availableProducts);

  // Determinamos cantidad de items por página según tamaño de pantalla
  const itemsPerPage = useResponsiveItems();

  // Hook para paginación de productos
  const { page, totalPages, currentItems, nextPage, prevPage, resetPage } =
    usePagination(filtered, itemsPerPage);

  // Hook para mostrar/ocultar descripción de productos
  const { visible: showDescription, toggle } = useToggleVisibility(true);

  // Manejar cambio de búsqueda
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);     // Actualiza búsqueda
    resetPage();     // Reinicia paginación a la primera página
  }

  // ---------------------------
  //  MODAL DE ASIGNACIÓN A VARIAS CAJAS
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
    <div className="w-full sm:w-2/12 md:w-3/12 lg:w-1/6 xl:w-1/6 bg-gray-50 rounded-xl p-4 flex flex-col gap-3 shadow-inner max-h-full">

      {/* Barra de búsqueda */}
      <SearchBar value={search} onChange={handleSearch} />

      {/* Contador de SKU */}
      <div className="bg-gray-200 rounded-xl py-2 flex flex-col items-center justify-center text-gray-700 shadow-sm w-full sm:w-auto relative">
        <div className="absolute top-1 right-1 bg-transparent">
          <EyeToggleButton active={showDescription} onToggle={toggle} size={15} />
        </div>
        <span className="text-base sm:text-xs md:text-xs lg:text-base">Cantidad de SKU:</span>
        <span className="text-base sm:text-sm md:text-sm lg:text-base font-semibold">
          {filtered.length}
        </span>
      </div>

      {/* Lista filtrada y paginada de productos */}
      <div className="flex flex-col gap-2">
        {currentItems.map((p) => (
          <DraggableProduct
            key={p.id}
            product={p}
            showDescription={showDescription}      // Mostrar/ocultar descripción
            onOpenAssign={() => openAssignModal(p)} // Abrir modal de asignación
          />
        ))}
      </div>

      {/* Botones de paginación si hay más items que itemsPerPage */}
      {filtered.length > itemsPerPage && (
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}

      {/* ---------------------------
           MODAL FINAL: ASIGNAR A VARIAS CAJAS
         --------------------------- */}
      <AssignItemsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        onAssignToMultipleBoxes={(amountPerBox: number, numberOfBoxes: number) => {
          if (!selectedProduct) return;

          // Si existe función externa, la usamos
          if (assignToMultipleBoxes) {
            assignToMultipleBoxes(selectedProduct, amountPerBox, numberOfBoxes);
          } else {
            // Si no, reducimos cantidad directamente
            const total = amountPerBox * numberOfBoxes;
            decreaseQuantity(selectedProduct.id, total);
          }

          closeModal(); // Cerramos modal al final
        }}
      />
    </div>
  );
}

// Exportamos componente
export default ProductList;
