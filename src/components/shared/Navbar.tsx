import { Link, useNavigate } from "react-router";
import { useCartStore } from "@/store/cartStore";

export function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">🛒</div>
            <span className="text-xl font-bold text-gray-900">Shop</span>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/search")}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Search
            </button>
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
