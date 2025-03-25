import { useCallback } from 'react';
import { CategoryLister } from '../components/category/CategoryLister';
import { H2 } from '../components/common/H2'
import { useCategoryStore } from '../stores/category.store';
import EmptyList from '../components/common/EmptyList';
import { OWNERID } from '../shared/const';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ManageCategories = () => {
  const { categories, isLoading } = useCategoryStore();

  const renderContent = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    const ownersCategories = categories.filter(c => c.ownerId === OWNERID);
    if (ownersCategories.length === 0) {
      return <EmptyList
        className="my-12"
        text="You didn't create a category yet!"
        buttonText='Create Category'
        to='/category/new'
      />
    }
    else {
      return <CategoryLister categories={ownersCategories} manager={true} />
    }
  }, [categories, isLoading])


  return (
    <main className="mx-2">
      <H2>Category Manager</H2>
      {renderContent()}
    </main>
  )
}

export default ManageCategories;