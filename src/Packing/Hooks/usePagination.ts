import { useState, useMemo, useEffect } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number = 4) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, page, itemsPerPage]);

  // Funciones de navegación
  function nextPage() {
    setPage((p) => Math.min(p + 1, totalPages));
  }

  function prevPage() {
    setPage((p) => Math.max(p - 1, 1));
  }

  function goToPage(n: number) {
    setPage(Math.min(Math.max(1, n), totalPages));
  }

  function resetPage() {
    setPage(1);
  }

  // Ajustar la página si la actual ya no existe
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  return {
    page,
    totalPages,
    currentItems,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  };
}
