import { useState, useEffect } from "react";

export function useResponsiveItems() {
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) {
        // Móviles (menor a sm)
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerPage;
}
