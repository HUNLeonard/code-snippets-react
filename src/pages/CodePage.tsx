import { H2 } from '../components/common/H2'
import { useParams } from 'react-router-dom'
import { useCodeStore } from '../stores/code.store'

const CodePage = () => {
  const params = useParams()
  const codeId = params.id || ""
  const codes = useCodeStore(store => store.codes);
  const codeResult = codes.find(c => c.id === codeId);

  if (!codeResult) {
    return <H2 className='text-center my-16'>Sorry there is no code with this ID</H2>
  }

  return (
    <main className="mx-2">
      <H2>Code - {codeId}</H2>
    </main>
  )
}

export default CodePage;