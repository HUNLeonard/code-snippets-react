import React, { useCallback } from "react";
import { capitalizer } from "../../utils/capitalize";
import { TCategory } from "../../types/Category";
import { cn } from "../../utils/cn";
import { LabelText } from "../common/LabelText";
import { FormError } from "../common/FormError";
import { LucideIcon } from "lucide-react";

interface CategorySelectorProps {
  options: TCategory[];
  onChange?: (selectedValue: TCategory["id"][]) => void;
  value?: TCategory["id"][];
  error?: string;
  name?: string;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  listClassName?: string;
  buttonClassName?: string;
  icon?: LucideIcon;
}

const CategorySelector = ({
  options,
  onChange,
  value = [],
  error,
  name,
  label = "",
  wrapperClassName,
  labelClassName,
  listClassName,
  buttonClassName,
  icon: Icon
}: CategorySelectorProps) => {
  const toggleSelectedCategory = useCallback((categoryId: TCategory["id"]) => {
    if (!onChange) return;

    if (value.includes(categoryId)) {
      onChange(value.filter(id => id !== categoryId));
    } else {
      onChange([...value, categoryId]);
    }
  }, [onChange, value]);

  return (
    <div className={wrapperClassName}>
      <label htmlFor={name} className={labelClassName}>
        <div className="flex items-center gap-2 mb-1.5">
          {Icon && <Icon size={20} className="text-primary" />}
          <LabelText text={label.length !== 0 ? label : name} />
        </div>
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
