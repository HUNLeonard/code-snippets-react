import { H2 } from '../components/common/H2'
import { useParams } from 'react-router-dom'

export const CodePage = () => {
  const params = useParams()
  const codeId = params.id || ""

  return (
    <main className="my-6">
      <H2>Code - {codeId}</H2>
    </main>
  )
}
