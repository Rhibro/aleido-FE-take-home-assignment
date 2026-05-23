const API_BASE = "https://dummyjson.com";

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating?: number;
  stock?: number;
  [key: string]: unknown;
}

export async function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_BASE}/products?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
  return response.json();
}

export async function searchProducts(
  query: string,
  limit = 12
): Promise<ProductsResponse> {
  const response = await fetch(`${API_BASE}/products/search?q=${query}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to search products");
  return response.json();
}
