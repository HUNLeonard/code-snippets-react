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
        { id: "11", name: "utils", slug: "utils", image: "" },
        { id: "12", name: "hooks", slug: "hooks", image: "" },
        { id: "13", name: "api's", slug: "apis", image: "" },
        { id: "14", name: "tailwind", slug: "tailwind", image: "" },
        { id: "15", name: "stack", slug: "stack", image: "" },
        { id: "16", name: "common", slug: "common", image: "" },
      ],
      addCategory: ({ newName, newImage }) => {
        const newCategory: TCategory = {
          id: crypto.randomUUID(),
          name: newName,
          slug: newName.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
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
