import { useCallback } from 'react'
import { CodeLister } from '../components/code/CodeLister'
import EmptyList from '../components/common/EmptyList'
import { H2 } from '../components/common/H2'
import { useCodeStore } from '../stores/code.store'

const ManageCodes = () => {
  const codes = useCodeStore(store => store.codes)

  const renderContent = useCallback(() => {
    if (codes.length === 0) {
      return <EmptyList
        className="my-12"
        text="No code snippet with has been created yet!"
        buttonText='Create Code'
        to="/codes/new"
      />
    }
    else {
      return <CodeLister codes={codes} manager={true} />
    }
  }, [codes])

  return (
    <main className="mx-2">
      <H2>Code Manager</H2>
      {renderContent()}
    </main>
  )
}

export default ManageCodes;