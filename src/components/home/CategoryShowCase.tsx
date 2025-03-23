
import { Tag } from "lucide-react";
import { useCategoryStore } from "../../stores/category.store"
import { H2 } from "../common/H2";
import { CategoryScrollList } from "./CategoryScrollList";

export const CategoryShowCase = () => {
  const { categories, isLoading } = useCategoryStore()
  // const duplicatedCategories = [...categories, ...categories]

  return (

    <section className="mx-2 p-6 bg-base-300 rounded-xl backdrop-blur-sm shadow-lg opacity-0 animation-floatUp" style={{ animationDelay: "300ms", animationDuration: "500ms" }}>
      <H2 className="relative flex items-center gap-3 !m-0 !mb-6"><Tag size={32} className="text-primary" />Categories</H2>
      <div className="relative mx-auto md:px-4">
        <CategoryScrollList categories={categories} isLoading={isLoading} />
      </div>
    </section>
  )
}
