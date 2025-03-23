import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCategory } from "../types/Category";
import {
  fetchCategories,
  createCategory,
  updateCategory as updateCategoryAPI,
  deleteCategory,
} from "../api/api-client";
import { CATEGORIES_QUERY_KEY } from "../shared/const";

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
        image: newCategory.newImage || "",
        ownerId: newCategory.ownerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });

  // update
  const updateCategoryMutation = useMutation({
    mutationFn: ({
      category,
      ownerId,
    }: {
      category: TCategory;
      ownerId: string;
    }) => updateCategoryAPI(category, ownerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });

  // remove
  const removeCategoryMutation = useMutation({
    mutationFn: ({ id, ownerId }: { id: string; ownerId: string }) =>
      deleteCategory(id, ownerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
  });

  return {
    categories,
    addCategory: async (data: {
      newName: string;
      newImage: string;
      ownerId: string;
    }) => {
      return addCategoryMutation.mutateAsync(data);
    },
    updateCategory: async ({
      category,
      ownerId,
    }: {
      category: TCategory;
      ownerId: string;
    }) => {
      return updateCategoryMutation.mutateAsync({ category, ownerId });
    },
    removeCategory: async ({
      id,
      ownerId,
    }: {
      id: string;
      ownerId: string;
    }) => {
      return removeCategoryMutation.mutateAsync({ id, ownerId });
    },
    isLoading:
      isFetching ||
      addCategoryMutation.isPending ||
      updateCategoryMutation.isPending ||
      removeCategoryMutation.isPending,
  };
};
