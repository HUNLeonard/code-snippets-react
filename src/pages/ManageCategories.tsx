import { useCallback, useEffect } from 'react';
import { CategoryLister } from '../components/category/CategoryLister';
import { H2 } from '../components/common/H2'
import { useCategoryStore } from '../stores/category.store';
import EmptyList from '../components/common/EmptyList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const ManageCategories = () => {
  const { categories, isLoading } = useCategoryStore();
  const { userId } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/", { replace: true }); // TODO only admins can manager categories
  })
  // if (!userId) {
  //   navigate("/", { replace: true });
  //   return null;
  // }
  return null;

  const renderContent = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    const ownersCategories = categories.filter(c => c.ownerId === userId);
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
  }, [categories, isLoading, userId])


  return (
    <main className="mx-2">
      <H2>Category Manager</H2>
      {renderContent()}
    </main>
  )
}

export default ManageCategories;