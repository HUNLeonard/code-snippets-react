import { CSSProperties, memo, useEffect } from "react";
import { Input } from "../common/Input";
import useForm from "../../hooks/useForm";
import { codeFormSchema, codeSchema } from "../../schemas/code";
import CategorySelector from "../category/CategorySelector";
import { useCategoryStore } from "../../stores/category.store";
import { TCategory } from "../../types/Category";
import { Code, FileText, Tag } from "lucide-react";

interface CodeFormProps {
  defaultFormValues: codeSchema;
  execute: (data: codeSchema) => void;
  setLoading: (value: boolean) => void;
  children: Readonly<React.ReactNode>;
  formClass?: string;
  formStyle?: CSSProperties;
}

const CodeForm = ({
  defaultFormValues,
  execute,
  setLoading,
  children,
  formClass,
  formStyle,
}: CodeFormProps) => {

  const { categories, isLoading: CatLoading } = useCategoryStore();
  const {
    formData,
    formError,
    isLoading,
    handleChange,
    handleSubmit,
    setField,
  } = useForm({
    defaultFormValues,
    execute,
    schema: codeFormSchema,
  });
  const handleCategorySelector = (selectedCategories: TCategory["_id"][]) => {
    setField("categories", selectedCategories);
  };

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
        placeholder="Enter codes name..."
        type="text"
        icon={FileText}
      />
      <Input
        value={formData.code}
        input="textarea"
        onChange={handleChange}
        error={formError.code}
        name="code"
        placeholder="Enter the code..."
        icon={Code}
      />
      <Input
        value={formData.desc}
        input="textarea"
        onChange={handleChange}
        error={formError.desc}
        name="desc"
        label="Description"
        placeholder="Enter the code's description..."
        icon={FileText}
      />
      <CategorySelector
        options={categories}
        value={formData.categories}
        isLoading={CatLoading}
        onChange={handleCategorySelector}
        error={formError.categories}
        name="categories"
        icon={Tag}
      />
      {children}
    </form>
  );
};

export default memo(CodeForm);
