const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


const handleResponse = async (res) => {
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(data.error || data || `Error: ${res.status}`);
  return data;
};

const getProducts = async () => {
  const products = await fetch(`${API_URL}/products`).then(handleResponse);
  if (!products || products.length === 0) {
    throw new Error('Products not found');
  }
  return products.map((product) => ({
    ...product,
  }))
}

const getProductById = async (productId) => {
  let product = await fetch(`${API_URL}/products/${productId}`).then(handleResponse);

  if (!product) {
    throw new Error(`Product ${productId} not found.`);
  }
  return product;
}

const getProductsByCategory = async (category) => {
  let products = await fetch(`${API_URL}/products/category/${category}`).then(handleResponse);
  if (!products || products.length === 0) {
    throw new Error(`${category} not found.`);
  }
  return products;
}

// ONLY ADMINS
const createProduct = async (productData) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(productData),
  });
  return handleResponse(res);
};


// ONLY ADMINS
const updateProductById = async (id, updatedFields) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(updatedFields)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Failed to update product ${id}`);
  }

  return res.json();
};

// ONLY ADMINS
const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Failed to delete product ${id}`);
  }
};
export {
  getProductsByCategory,
  getProductById,
  getProducts,
  updateProductById,
  createProduct,
  deleteProduct,
};