import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCategory } from "../types/Category";
import {
  fetchCategories,
  createCategory,
  updateCategory as updateCategoryAPI,
  deleteCategory,
} from "../api/api-client";
import { CATEGORIES_QUERY_KEY } from "../shared/const";

// Hook to access categories
export const useCategoryStore = () => {
  const queryClient = useQueryClient();

  // fetch
  const { data: categories = [], isLoading: isFetching } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: fetchCategories,
  });

  // add
  const addCategoryMutation = useMutation({
    mutationFn: (newCategory: {
      newName: string;
      newImage: string;
      ownerId: string;
    }) => {
      return createCategory({
        name: newCategory.newName,
        image: newCategory.newImage,
        ownerId: newCategory.ownerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });

  // update
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });

  // remove
  const removeCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });

  return {
    categories,
    addCategory: (data: {
      newName: string;
      newImage: string;
      ownerId: string;
    }) => addCategoryMutation.mutate(data),
    updateCategory: (category: TCategory) =>
      updateCategoryMutation.mutate(category),
    removeCategory: (id: string) => removeCategoryMutation.mutate(id),
    isLoading:
      isFetching ||
      addCategoryMutation.isPending ||
      updateCategoryMutation.isPending ||
      removeCategoryMutation.isPending,
  };
};
