import React, { useCallback } from "react";
import { capitalizer } from "../../utils/capitalize";
import { TCategory } from "../../types/Category";
import { cn } from "../../utils/cn";
import { LabelText } from "../common/LabelText";
import { FormError } from "../common/FormError";

interface CategorySelectorProps {
  options: TCategory[];
  onChange?: (selectedValue: TCategory["id"][]) => void;
  value?: TCategory["id"][];
  error?: string;
  name?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  listClassName?: string;
  buttonClassName?: string;
}

const CategorySelector = ({
  options,
  onChange,
  value = [],
  error,
  name,
  wrapperClassName,
  labelClassName,
  listClassName,
  buttonClassName,
}: CategorySelectorProps) => {
  const toggleSelectedCategory = useCallback((categoryId: TCategory["id"]) => {
    if (!onChange) return;

    // Check if the category is already selected
    if (value.includes(categoryId)) {
      // Remove it from the array
      onChange(value.filter(id => id !== categoryId));
    } else {
      // Add it to the array
      onChange([...value, categoryId]);
    }
  }, [onChange, value]);

  return (
    <div className={wrapperClassName}>
      <label htmlFor={name} className={labelClassName}>
        <LabelText text={name} />
        <div className={cn("flex flex-wrap gap-2", listClassName)}>
          {options.map((o, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => toggleSelectedCategory(o.id)}
              className={cn(
                "px-4 py-1 rounded-4xl shadow-md",
                "hover:-translate-y-0.5 transition-transform duration-150",
                value.includes(o.id)
                  ? "bg-accent text-accent-content font-medium ring-2 ring-primary-content"
                  : "bg-primary text-primary-content ",
                buttonClassName,
              )}
            >
              {capitalizer(o.name)}
            </button>
          ))}
        </div>
      </label>
      <FormError error={error} />
    </div>
  );
};

export default React.memo(CategorySelector)
