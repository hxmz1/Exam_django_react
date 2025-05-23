import axios from 'axios';

const API_URL = 'https://localhost:8000/api';

export const login = (credentials) => {
  return axios.post(`${API_URL}/token/`, credentials, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const refreshToken = (refresh) => {
  return axios.post(`${API_URL}/token/refresh/`, { refresh }, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const getPosts = (token) => {
  return axios.get(`${API_URL}/posts/`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
};

// Création post avec FormData : ne PAS définir Content-Type ici !
export const createPost = (postFormData, token) => {
  return axios.post(`${API_URL}/posts/`, postFormData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Mise à jour post avec FormData : ne PAS définir Content-Type ici !
export const updatePost = (id, postFormData, token) => {
  return axios.put(`${API_URL}/posts/${id}/`, postFormData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Suppression post
export const deletePost = (id, token) => {
  return axios.delete(`${API_URL}/posts/${id}/`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
};
