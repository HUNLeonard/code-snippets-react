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
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useModalStore(store => store.openModal)
  const setType = useModalStore(store => store.setType)
  const setText = useModalStore(store => store.setText)
  const addCategory = useCategoryStore((store) => store.addCategory);

  const executeAddCategory = (data: categorySchema) => {
    addCategory({
      newName: data.name,
      newImage: data.image,
      ownerId: OWNERID
    });
    openModal();
    setType("success");
    setText("Category Added Successfully!");
  };

  return (
    <main className='sm:mx-2 sm:my-6'>
      <FormContainer>
        <H2 className="w-fit mx-auto">New Category</H2>
        <CategoryForm
          defaultFormValues={defaultFormValues}
          execute={executeAddCategory}
          setLoading={setIsLoading}
          formClass="flex flex-col max-w-md mx-auto space-y-4"
        >
          <Button disabled={isLoading} className="w-fit mx-auto !bg-accent" type="submit">
            Add New Category
          </Button>
        </CategoryForm>
      </FormContainer>
    </main>
  );
};

export default NewCategory;
