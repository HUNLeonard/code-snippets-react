import { useCallback } from 'react'
import { CodeLister } from '../components/code/CodeLister'
import EmptyList from '../components/common/EmptyList'
import { H2 } from '../components/common/H2'
import { useCodeStore } from '../stores/code.store'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useAuth } from '@clerk/clerk-react'

const ManageCodes = () => {
  const { codes, isLoading } = useCodeStore()
  const { userId } = useAuth();
  const renderContent = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    const ownersCodes = codes.filter(c => c.ownerId === userId);
    if (ownersCodes.length === 0) {
      return <EmptyList
        className="my-12"
        text="You didn't create a code snippet yet!"
        buttonText='Create Code'
        to="/codes/new"
      />
    }
    else {
      return <CodeLister codes={ownersCodes} manager={true} />
    }
  }, [codes, isLoading, userId])

  return (
    <main className="mx-2">
      <H2>Code Manager</H2>
      {renderContent()}
    </main>
  )
}

export default ManageCodes;