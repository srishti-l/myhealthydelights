const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};


const handleResponse = async (res) => {
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(data.error || data || `Error: ${res.status}`);
  return data;
};

const getUserById = async (id) => {
  const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users/me`;
  const res = await fetch(url, { headers: getAuthHeaders() });
  return handleResponse(res);
};


const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: getAuthHeaders() });
  return handleResponse(res);
};


const createUser = async (userData) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

const updateUser = async (id, updatedFields) => {
  const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users/me`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders()},
    body: JSON.stringify(updatedFields),
  });
  return handleResponse(res);
}

const deleteUser = async (id) => {
  const url = id ? `${API_URL}/users/${id}` : `${API_URL}/users/me`;
  const res = await fetch(url, {
    method: 'DELETE', 
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders()}
  })
  return handleResponse(res);
}


const validateLogin = async (username, password) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await handleResponse(res);

  if (data.jwt) localStorage.setItem('token', data.jwt);
  return data;
};

export {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  validateLogin,
};
