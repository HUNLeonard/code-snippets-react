import { CategoryLister } from '../components/category/CategoryLister';
import { H2 } from '../components/common/H2'
import { useCategoryStore } from '../stores/category.store';

const ManageCategories = () => {
  const categories = useCategoryStore(store => store.categories)

  return (
    <main className="mx-2">
      <H2>Category Manager</H2>
      <CategoryLister categories={categories} manager={true} />
    </main>
  )
}

export default ManageCategories;