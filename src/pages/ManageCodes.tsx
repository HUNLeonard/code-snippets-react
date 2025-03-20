import { CodeLister } from '../components/code/CodeLister'
import { H2 } from '../components/common/H2'
import { useCodeStore } from '../stores/code.store'

const ManageCodes = () => {
  const codes = useCodeStore(store => store.codes)

  return (
    <main className="mx-2">
      <H2>Code Manager</H2>
      <CodeLister codes={codes} manager={true} />
    </main>
  )
}

export default ManageCodes;