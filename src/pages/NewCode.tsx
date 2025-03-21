import { H2 } from '../components/common/H2'
import { useCodeStore } from '../stores/code.store'
import { codeSchema } from '../components/schemas/code'
import { Button } from '../components/common/Button'
import { useState } from 'react'
import CodeForm from '../components/code/CodeForm'


const defaultFormValues: codeSchema = {
  name: "",
  code: "",
  desc: "",
  categories: []
}

const NewCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addCode = useCodeStore(store => store.addCode)

  const executeAddCode = (data: codeSchema) => {
    addCode({
      newName: data.name,
      code: data.code,
      categories: data.categories,
      desc: data.desc
    })
  }


  return (
    <main className='mx-2'>
      <H2 className="w-fit mx-auto">New Code</H2>
      <CodeForm
        defaultFormValues={defaultFormValues}
        execute={executeAddCode}
        setLoading={setIsLoading}
        formClass="flex flex-col max-w-md mx-auto space-y-4">
        <Button disabled={isLoading} className='w-fit mx-auto' type='submit'>Add New Code</Button>
      </CodeForm>
    </main>
  )
}

export default NewCode;