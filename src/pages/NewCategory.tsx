import { Button } from '../components/common/Button'
import { H2 } from '../components/common/H2'
import { Input } from '../components/common/Input'
import { categoryFormSchema, categorySchema } from '../components/schemas/category'
import useForm from '../hooks/useForm'
import { useCategoryStore } from '../stores/category.store'

const defaultFormValues: categorySchema = {
  name: "",
  image: ""
}


const NewCategory = () => {
  const addCategory = useCategoryStore(store => store.addCategory)

  const executeAddCode = (data: categorySchema) => {
    addCategory({
      newName: data.name,
      newImage: data.image
    })
  }

  const {
    formData,
    formError,
    isLoading,
    handleChange,
    handleSubmit
  } = useForm({
    defaultFormValues,
    execute: executeAddCode,
    schema: categoryFormSchema
  })


  return (
    <main className='mx-2'>
      <H2 className="w-fit mx-auto">New Category</H2>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-md mx-auto space-y-4'>
        <Input value={formData.name} onChange={handleChange} error={formError.name} name="name" placeholder="Enter category name..." type="text" />
        <Input value={formData.image} onChange={handleChange} error={formError.image} name="image" placeholder="Enter category image..." type="text" />
        <Button disabled={isLoading} className='w-fit mx-auto' type='submit'>Add New Category</Button>
      </form>
    </main>
  )
}

export default NewCategory;