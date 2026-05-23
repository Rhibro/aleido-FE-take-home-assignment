import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import { searchProducts, Product, ProductsResponse } from "@/lib/api";
import { ProductCard } from "@/components/shared/ProductCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data: ProductsResponse = await searchProducts(searchQuery, 12);
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== query) {
        setSearchParams({ q: searchInput }, { replace: true });
      }
      performSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, query, setSearchParams, performSearch]);

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
        ) : searchInput.trim() === "" ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Enter a search term to find products</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found for "{searchInput}"</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Found {products.length} product{products.length !== 1 ? "s" : ""} for "{searchInput}"
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
          </>
        )}
      </div>
    </div>
  );
}
