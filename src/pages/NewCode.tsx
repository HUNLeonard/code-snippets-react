import { H2 } from '../components/common/H2'
import { useCodeStore } from '../stores/code.store'
import { codeFormSchema, codeSchema } from '../components/schemas/code'
import { Input } from '../components/common/Input'
import { TCategory } from '../types/Category'
import { CategorySelector } from '../components/common/CategorySelector'
import { useCategoryStore } from '../stores/category.store'
import useForm from '../hooks/useForm'
import { Button } from '../components/common/Button'


const defaultFormValues: codeSchema = {
  name: "",
  code: "",
  desc: "",
  categories: []
}

export const NewCode = () => {
  const addCode = useCodeStore(store => store.addCode)
  const categories = useCategoryStore(store => store.categories)

  const executeAddCode = (data: codeSchema) => {
    addCode({
      newName: data.name,
      code: data.code,
      categories: data.categories,
      desc: data.desc
    })
  }

  const {
    formData,
    formError,
    isLoading,
    handleChange,
    handleSubmit,
    setField
  } = useForm({
    defaultFormValues,
    execute: executeAddCode,
    schema: codeFormSchema
  })

  const handleCategorySelector = (selectedCategories: TCategory["id"][]) => {
    setField('categories', selectedCategories)
  }

  return (
    <main>
      <H2 className="my-6 w-fit mx-auto">New Code</H2>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-md mx-auto space-y-4'>
        <Input value={formData.name} onChange={handleChange} error={formError.name} name="name" placeholder="Enter codes name..." type="text" />
        <Input value={formData.code} input='textarea' onChange={handleChange} error={formError.code} name="code" placeholder="Enter the code..." />
        <Input value={formData.desc} input='textarea' onChange={handleChange} error={formError.desc} name="desc" label="Description" placeholder="Enter the code's description..." />
        <CategorySelector options={categories} onChange={handleCategorySelector} error={formError.categories} name="catogories" />
        <Button disabled={isLoading} className='w-fit mx-auto' type='submit'>Add New Code</Button>
      </form>
    </main>
  )
}
