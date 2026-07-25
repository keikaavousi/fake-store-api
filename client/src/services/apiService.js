const API_BASE_URL = import.meta.env.VITE_PRODUCT_API_URL || 'https://fakestoreapi.com';

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export const fetchProducts = () => request('/products');
export const fetchProductById = (productId) => request(`/products/${productId}`);
export const fetchCartItems = (userId) => request(`/carts/user/${userId}`);

export const addNewProduct = (productData) => request('/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(productData),
});

export const updateProduct = (productId, productData) => request(`/products/${productId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(productData),
});

export const deleteProduct = (productId) => request(`/products/${productId}`, {
  method: 'DELETE',
});
