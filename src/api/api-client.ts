import axios from "axios";
import { TCategory } from "../types/Category";
import { TCode } from "../types/Code";
import { API_URL } from "../shared/const";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Category API
export const fetchCategories = async (): Promise<TCategory[]> => {
  const response = await apiClient.get("/api/categories");
  return response.data;
};

export const createCategory = async (
  category: Omit<TCategory, "_id">,
): Promise<TCategory> => {
  const response = await apiClient.post("/api/categories", category);
  return response.data;
};

export const updateCategory = async (
  category: TCategory,
): Promise<TCategory> => {
  const response = await apiClient.put(
    `/api/categories/${category._id}`,
    category,
  );
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/categories/${id}`);
};

// Code API
export const fetchCodes = async (): Promise<TCode[]> => {
  const response = await apiClient.get("/api/codes");
  return response.data;
};

export const createCode = async (code: Omit<TCode, "_id">): Promise<TCode> => {
  const response = await apiClient.post("/api/codes", code);
  return response.data;
};

export const updateCode = async (code: TCode): Promise<TCode> => {
  const response = await apiClient.put(`/api/codes/${code._id}`, code);
  return response.data;
};

export const deleteCode = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/codes/${id}`);
};
