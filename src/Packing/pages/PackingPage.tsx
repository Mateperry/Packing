// pages/PackingPage.tsx
// Este apartado es donde llegara todo el componente packing, donde traemos componentes especificos como Product List, Box List y DndContext. 
//Aqui manejaremos de igual forma la exportacion para utlizarlo en app
//
import { DndContext } from "@dnd-kit/core"; // 
import { useProducts } from "../Hooks/useProducts";
import { usePackingManager } from "../Hooks/usePackingManager";
import ProductList from "../components/ProductList";
import BoxList from "../components/Boxlist";
import HomeButtons from "../components/HomeButtons";

function PackingPage() {
  const { products, decreaseQuantity } = useProducts();
  const { addToBox } = usePackingManager(); // Solo usamos lo que necesitamos

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    const isProduct = active.data.current?.type === "PRODUCT";
    const isBox = over.data.current?.type === "BOX";

    if (isProduct && isBox) {
      const product = active.data.current.product;
      const boxId = over.data.current.boxId;

      addToBox(boxId, product);
      decreaseQuantity(product.id);
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center mb-6 gap-6">
          <h2 className="bg-green-600 text-white text-center py-3 px-6 rounded-full text-lg font-semibold w-full">
            DISTRIBUCIÓN DE PRODUCTOS
          </h2>
          <HomeButtons />
        </div>

        <div className="flex gap-6">
          {/* Lista de productos con drag & drop */}
          <ProductList products={products} />

          {/* Lista de cajas */}
          <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-inner">
            <BoxList /> {/* BoxList usa su propio estado */}
          </div>
        </div>
      </DndContext>
    </div>
  );
}

export default PackingPage;
