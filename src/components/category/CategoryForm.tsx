import { CSSProperties, memo, useEffect } from "react";
import { Input } from "../common/Input";
import useForm from "../../hooks/useForm";
import { categoryFormSchema, categorySchema } from "../../schemas/category";
import { EyeIcon, FileText } from "lucide-react";

interface CategoryFormProps {
  defaultFormValues: categorySchema;
  execute: (data: categorySchema) => void;
  setLoading: (value: boolean) => void;
  children: Readonly<React.ReactNode>;
  formClass?: string;
  formStyle?: CSSProperties;
}

const CategoryForm = ({
  defaultFormValues,
  execute,
  setLoading,
  children,
  formClass,
  formStyle,
}: CategoryFormProps) => {
  const { formData, formError, isLoading, handleChange, handleSubmit } =
    useForm({
      defaultFormValues,
      execute,
      schema: categoryFormSchema,
    });

  useEffect(() => {
    setLoading(isLoading);
  });

  return (
    <form onSubmit={handleSubmit} className={formClass} style={formStyle}>
      <Input
        value={formData.name}
        onChange={handleChange}
        error={formError.name}
        name="name"
        placeholder="Enter category name..."
        type="text"
        icon={FileText}
      />
      <Input
        value={formData.image}
        onChange={handleChange}
        error={formError.image}
        name="image"
        placeholder="Enter category's image..."
        type="text"
        icon={EyeIcon}
      />
      {children}
    </form>
  );
};

export default memo(CategoryForm);
