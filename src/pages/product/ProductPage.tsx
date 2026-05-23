import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchProductById, Product } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCartStore();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(parseInt(id));
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg min-h-96">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.rating && (
                    <span className="text-lg text-yellow-600">
                      ⭐ {product.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                {product.stock !== undefined && (
                  <p className="text-sm text-gray-600 mb-6">
                    {product.stock > 0 ? (
                      <span className="text-green-600 font-medium">
                        ✓ {product.stock} in stock
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of stock</span>
                    )}
                  </p>
                )}

                <p className="text-gray-700 mb-8 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock || 100}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : addedToCart
                      ? "bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {addedToCart ? "✓ Added to cart!" : "Add to Cart"}
                </button>

                <button
                  onClick={() => navigate("/cart")}
                  className="w-full py-3 px-4 rounded-lg font-bold text-blue-600 border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
