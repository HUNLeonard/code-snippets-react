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
  ownerId: string,
): Promise<TCategory> => {
  const response = await apiClient.put(`/api/categories/${category._id}`, {
    name: category.name,
    image: category.image,
    ownerId,
  });
  return response.data;
};

export const deleteCategory = async (
  id: string,
  ownerId: string,
): Promise<void> => {
  await apiClient.delete(`/api/categories/${id}`, {
    data: { ownerId },
  });
};

// Code API
export const fetchCodes = async (userId?: string): Promise<TCode[]> => {
  // const headers = userId ? { "x-user-id": userId } : {};
  const response = await apiClient.get("/api/codes", {
    headers: { "x-user-id": userId },
  });
  return response.data;
};
export const fetchCode = async (
  codeId: TCode["_id"],
  userId?: string,
): Promise<TCode[]> => {
  const headers = userId ? { "x-user-id": userId } : {};
  const response = await apiClient.get(`/api/codes/${codeId}`, { headers });
  return response.data;
};

export const createCode = async (code: Omit<TCode, "_id">): Promise<TCode> => {
  const response = await apiClient.post("/api/codes", code);
  return response.data;
};

export const updateCode = async (
  code: TCode,
  ownerId: string,
): Promise<TCode> => {
  const response = await apiClient.put(`/api/codes/${code._id}`, {
    name: code.name,
    code: code.code,
    desc: code.desc,
    categories: code.categories,
    ownerId,
    visibleToOthers: code.visibleToOthers,
  });
  return response.data;
};

export const deleteCode = async (
  id: string,
  ownerId: string,
): Promise<void> => {
  await apiClient.delete(`/api/codes/${id}`, {
    data: { ownerId },
  });
};
