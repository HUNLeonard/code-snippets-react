import { useCallback, useState } from "react";
import { z } from "zod";

interface useFormProps<T> {
  defaultFormValues: T;
  execute: (arg: T) => void;
  schema: z.ZodType<T>;
}

export default function useForm<T>({
  defaultFormValues,
  execute,
  schema,
}: useFormProps<T>) {
  const [formData, setFormData] = useState<T>({ ...defaultFormValues });
  const [formError, setFormError] = useState<Partial<Record<keyof T, string>>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setFormError({});
        setIsLoading(true);
        schema.parse(formData);
        await new Promise((res) => setTimeout(res, Math.random() * 1000));
        execute({ ...formData });
        setFormData({ ...defaultFormValues });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Partial<Record<keyof T, string>> = {};
          error.errors.map((err) => {
            const key = err.path[0] as keyof T;
            newErrors[key] = err.message;
          });
          setFormError(newErrors);
        } else {
          console.error(
            "Something went wrong:",
            error instanceof Error ? error.message : String(error),
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [execute, formData, defaultFormValues, schema],
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { value, name } = e.currentTarget;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const setField = useCallback(
    <K extends keyof T>(fieldName: K, value: T[K]) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    },
    [],
  );

  return {
    formData,
    formError,
    isLoading,
    handleChange,
    handleSubmit,
    setField,
  };
}
