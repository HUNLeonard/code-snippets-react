import { useState } from "react";
import CategoryForm from "../components/category/CategoryForm";
import { Button } from "../components/common/Button";
import { H2 } from "../components/common/H2";
import { useCategoryStore } from "../stores/category.store";
import FormContainer from "../components/common/FormContainer";
import { useModalStore } from "../stores/modal.store";
import { OWNERID } from "../shared/const";
import { categorySchema } from "../schemas/category";

const defaultFormValues: categorySchema = {
  name: "",
  image: "",
};

const NewCategory = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const openModal = useModalStore(store => store.openModal)
  const setType = useModalStore(store => store.setType)
  const setText = useModalStore(store => store.setText)
  const { addCategory, isLoading: CatLoading } = useCategoryStore();

  const executeAddCategory = async (data: categorySchema) => {
    setIsFormLoading(true);
    try {
      await addCategory({
        newName: data.name,
        newImage: data.image,
        ownerId: OWNERID
      });

      openModal();
      setType("success");
      setText("Category Added Successfully!");
    } catch (error) {
      openModal();
      setType("error");
      setText("Failed to add category");
      console.error(error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <main className='sm:mx-2 sm:my-6'>
      <FormContainer>
        <H2 className="w-fit mx-auto">New Category</H2>
        <CategoryForm
          defaultFormValues={defaultFormValues}
          execute={executeAddCategory}
          setLoading={setIsFormLoading}
          formClass="flex flex-col max-w-md mx-auto space-y-4"
        >
          <Button disabled={isFormLoading || CatLoading} className="w-fit mx-auto !bg-accent" type="submit">
            Add New Category
          </Button>
        </CategoryForm>
      </FormContainer>
    </main>
  );
};

export default NewCategory;
