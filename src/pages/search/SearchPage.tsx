import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { searchProducts, Product, ProductsResponse } from "@/lib/api";
import { ProductCard } from "@/components/shared/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Pagination } from "@/components/shared/Pagination";

const LIMIT = 12;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(() => searchParams.get("q") ?? "");
  const [committedQuery, setCommittedQuery] = useState(searchInput);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce: commit query, reset to page 1, sync URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setCommittedQuery(searchInput);
      setCurrentPage(1);
      setSearchParams({ q: searchInput }, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchParams]);

  // Fetch when committed query or page changes (no debounce — query is already settled)
  useEffect(() => {
    if (!committedQuery.trim()) return;

    const doFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const skip = (currentPage - 1) * LIMIT;
        const data: ProductsResponse = await searchProducts(committedQuery, LIMIT, skip);
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / LIMIT));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    doFetch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [committedQuery, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Products</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              autoFocus
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : committedQuery.trim() === "" ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Enter a search term to find products</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found for "{committedQuery}"</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Found {products.length} product{products.length !== 1 ? "s" : ""} for "{committedQuery}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/products/${product.id}`}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
