import { create } from "zustand";
import { TCategory } from "../types/Category";
import { persist } from "zustand/middleware";

interface addCategory {
  newName: string;
  newImage: string;
  ownerId: string;
}

interface CategoryStore {
  categories: TCategory[];
  addCategory: ({ newName, newImage, ownerId }: addCategory) => void;
  updateCategory: (uCategory: TCategory) => void;
  removeCategory: (catId: TCategory["_id"]) => void;
}
export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [
        { _id: "11", name: "utils", image: "", ownerId: "1" },
        { _id: "12", name: "hooks", image: "", ownerId: "1" },
        { _id: "13", name: "api's", image: "", ownerId: "1" },
        { _id: "14", name: "tailwind", image: "", ownerId: "1" },
        { _id: "15", name: "stack", image: "", ownerId: "1" },
        { _id: "16", name: "common", image: "", ownerId: "1" },
      ],
      addCategory: ({ newName, newImage, ownerId = crypto.randomUUID() }) => {
        const newCategory: TCategory = {
          _id: crypto.randomUUID(),
          name: newName,
          image: newImage,
          ownerId,
        };
        return set((store) => ({
          categories: [...store.categories, newCategory],
        }));
      },
      updateCategory: (uCategory) =>
        set((store) => ({
          categories: store.categories.map((c) =>
            c._id !== uCategory._id
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
          categories: store.categories.filter((c) => c._id !== catId),
        })),
    }),
    { name: "RCSCategories" },
  ),
);
