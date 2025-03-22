import { useCallback } from 'react'
import { CodeLister } from '../components/code/CodeLister'
import EmptyList from '../components/common/EmptyList'
import { H2 } from '../components/common/H2'
import { useCodeStore } from '../stores/code.store'
import { OWNERID } from '../shared/const'

const ManageCodes = () => {
  const codes = useCodeStore(store => store.codes)
  const ownersCodes = codes.filter(c => c.ownerId === OWNERID);

  const renderContent = useCallback(() => {
    if (ownersCodes.length === 0) {
      return <EmptyList
        className="my-12"
        text="No code snippet with has been created yet!"
        buttonText='Create Code'
        to="/codes/new"
      />
    }
    else {
      return <CodeLister codes={ownersCodes} manager={true} />
    }
  }, [ownersCodes])

  return (
    <main className="mx-2">
      <H2>Code Manager</H2>
      {renderContent()}
    </main>
  )
}

export default ManageCodes;