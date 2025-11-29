import api from './api';

export const getProducts = (query = '') =>
  api.get(`/products${query}`);

export const getProductById = (id) =>
  api.get(`/products/${id}`);