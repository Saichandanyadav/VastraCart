import api from './api';

export const getCart = () => api.get('/cart');
export const addToCart = (data) => api.post('/cart/add', data);
export const updateCart = (data) => api.put('/cart/update', data);
export const removeItem = (data) => api.delete('/cart/remove', { data });