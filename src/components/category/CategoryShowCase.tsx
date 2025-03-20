
import { useCategoryStore } from "../../stores/category.store"
import { H2 } from "../common/H2";
import { CategoryScrollList } from "./CategoryScrollList";

export const CategoryShowCase = () => {
  const categories = useCategoryStore(store => store.categories)
  // const duplicatedCategories = [...categories, ...categories]

  return (

    <section className="space-y-6 mx-2">
      <H2>Categories</H2>
      <div className="relative mx-auto sm:px-4">
        <div className="max-md:hidden md:absolute left-0 inset-y-0 w-14 bg-gradient-to-r from-base-100 from-80% to-transparent z-10" />
        <div className="max-md:hidden md:absolute right-0 inset-y-0 w-14 bg-gradient-to-r from-transparent to-20% to-base-100 z-10" />
        <CategoryScrollList categories={categories} />

      </div>
    </section>
  )
}
