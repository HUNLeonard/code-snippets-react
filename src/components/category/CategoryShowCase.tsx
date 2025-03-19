import { useCategoryStore } from "../../stores/category.store"
import { H2 } from "../common/H2";
import { CategoryScrollList } from "./CategoryScrollList";

export const CategoryShowCase = () => {
  const categories = useCategoryStore(store => store.categories)
  const duplicatedCategories = [...categories, ...categories]

  return (

    <section className="space-y-6 my-6">
      <H2>Categories</H2>
      <div className="relative overflow-hidden mx-auto w-19/20">
        <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-base-100 from-30% to-transparent z-10" />
        <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-r from-transparent to-30% to-base-100 z-10" />
        <CategoryScrollList categories={duplicatedCategories} />
      </div>
    </section>
  )
}
