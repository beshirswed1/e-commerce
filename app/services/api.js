// src/services/api.js
import axios from 'axios';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://fakestoreapi.com/products';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
