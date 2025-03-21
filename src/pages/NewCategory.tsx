import { useState } from "react";
import CategoryForm from "../components/category/CategoryForm";
import { Button } from "../components/common/Button";
import { H2 } from "../components/common/H2";
import { categorySchema } from "../components/schemas/category";
import { useCategoryStore } from "../stores/category.store";

const defaultFormValues: categorySchema = {
  name: "",
  image: "",
};

const NewCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addCategory = useCategoryStore((store) => store.addCategory);

  const executeAddCategory = (data: categorySchema) => {
    addCategory({
      newName: data.name,
      newImage: data.image,
    });
  };

  return (
    <main className="mx-2">
      <H2 className="w-fit mx-auto">New Category</H2>
      <CategoryForm
        defaultFormValues={defaultFormValues}
        execute={executeAddCategory}
        setLoading={setIsLoading}
        formClass="flex flex-col max-w-md mx-auto space-y-4"
      >
        <Button disabled={isLoading} className="w-fit mx-auto" type="submit">
          Add New Category
        </Button>
      </CategoryForm>
    </main>
  );
};

export default NewCategory;
