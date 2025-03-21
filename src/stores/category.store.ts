import { create } from "zustand";
import { TCategory } from "../types/Category";
import { persist } from "zustand/middleware";

interface addCategory {
  newName: string;
  newImage: string;
}

interface CategoryStore {
  categories: TCategory[];
  addCategory: ({ newName, newImage }: addCategory) => void;
  updateCategory: (uCategory: TCategory) => void;
  removeCategory: (catId: TCategory["id"]) => void;
}
export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [
        { id: "11", name: "utils", image: "" },
        { id: "12", name: "hooks", image: "" },
        { id: "13", name: "api's", image: "" },
        { id: "14", name: "tailwind", image: "" },
        { id: "15", name: "stack", image: "" },
        { id: "16", name: "common", image: "" },
      ],
      addCategory: ({ newName, newImage }) => {
        const newCategory: TCategory = {
          id: crypto.randomUUID(),
          name: newName,
          image: newImage,
        };
        return set((store) => ({
          categories: [...store.categories, newCategory],
        }));
      },
      updateCategory: (uCategory) =>
        set((store) => ({
          categories: store.categories.map((c) =>
            c.id !== uCategory.id
              ? c
              : {
                  ...c,
                  name: uCategory.name.length > 0 ? uCategory.name : c.name,
                  image: uCategory.image.length > 0 ? uCategory.image : c.image,
                },
          ),
        })),
      removeCategory: (catId) =>
        set((store) => ({
          categories: store.categories.filter((c) => c.id !== catId),
        })),
    }),
    { name: "RCSCategories" },
  ),
);
