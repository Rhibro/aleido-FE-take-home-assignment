import { Link } from "react-router";
import type { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  href: string;
}

export function ProductCard({ product, href }: ProductCardProps) {
  return (
    <Link to={href}>
      <div className="h-full rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white flex flex-col">
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 mb-auto">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.rating && (
              <span className="text-xs text-yellow-600 font-medium">
                ⭐ {product.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
