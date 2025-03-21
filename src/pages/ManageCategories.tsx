import { useCallback } from 'react';
import { CategoryLister } from '../components/category/CategoryLister';
import { H2 } from '../components/common/H2'
import { useCategoryStore } from '../stores/category.store';
import EmptyList from '../components/common/EmptyList';
import { OWNERID } from '../shared/const';

const ManageCategories = () => {
  const categories = useCategoryStore(store => store.categories)
  const ownersCategories = categories.filter(c => c.ownerId === OWNERID);

  const renderContent = useCallback(() => {
    if (ownersCategories.length === 0) {
      return <EmptyList
        className="my-12"
        text="No category has been created yet!"
        buttonText='Create Category'
        to='/category/new'
      />
    }
    else {
      return <CategoryLister categories={ownersCategories} manager={true} />
    }
  }, [ownersCategories])


  return (
    <main className="mx-2">
      <H2>Category Manager</H2>
      {renderContent()}
    </main>
  )
}

export default ManageCategories;