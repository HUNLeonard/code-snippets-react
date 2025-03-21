import { TCategory } from "../../types/Category";
import CategoryForm from "./CategoryForm";
import { categorySchema } from "../schemas/category";
import { useState } from "react";
import EditFormButtons from "../common/EditFormButtons";

interface CategoryEditFormProps {
  editingvalues: TCategory;
  isDeleting: boolean;
  resetPopup: () => void;
  handleDelete: () => void;
  executeEdit: (data: categorySchema) => void;
}

const CategoryEditForm = ({ editingvalues, isDeleting, resetPopup, handleDelete, executeEdit }: CategoryEditFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CategoryForm
      defaultFormValues={editingvalues}
      execute={executeEdit}
      setLoading={setIsLoading}
      formClass="space-y-4"
    >
      <EditFormButtons isLoading={isLoading} isDeleting={isDeleting} resetPopup={resetPopup} handleDelete={handleDelete} />
    </CategoryForm>
  );
};

export default CategoryEditForm;
