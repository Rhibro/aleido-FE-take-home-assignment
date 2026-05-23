import { useEffect, useState } from "react";
import { fetchProducts, Product, ProductsResponse } from "@/lib/api";
import { ProductCard } from "@/components/shared/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

const LIMIT = 12;

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const skip = (currentPage - 1) * LIMIT;
        const data: ProductsResponse = await fetchProducts(LIMIT, skip);
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / LIMIT));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Shop</h1>
          <p className="text-gray-600">Browse our collection of products</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/products/${product.id}`}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {pageNumbers.map((page, i) =>
                page === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-3 py-2 text-sm text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      page === currentPage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
