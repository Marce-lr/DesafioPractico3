import axios from "axios";

const api = axios.create({
  baseURL: "https://booklistme-production.up.railway.app",
});

let token = null;

export const setToken = (newToken) => {
  token = newToken;
};

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (userData) =>
  api.post("/api/auth/register", userData);
export const loginUser = (credentials) =>
  api.post("/api/auth/login", credentials);

// Books
export const getAllBooks = () => api.get("/api/books");
export const getBookById = (id) => api.get(`/api/books/${id}`);
export const createBook = (bookData) => api.post("/api/books", bookData);
export const updateBook = (id, bookData) =>
  api.put(`/api/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/api/books/${id}`);
