import React from "react";
import { cn } from "../../utils/cn";
import { LabelText } from "./LabelText";
import { FormError } from "./FormError";
import { LucideIcon } from "lucide-react";

interface InputProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  input?: "input" | "textarea";
  error?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  type?: "text";
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  icon?: LucideIcon;
}

export const Input = ({
  value,
  onChange,
  error,
  label = "",
  placeholder,
  name,
  type = "text",
  input,
  wrapperClassName,
  labelClassName,
  inputClassName,
  icon: Icon
}: InputProps) => {
  const InputType = input || "input";

  const LabelTag = (label.length > 0 || (name && name.length > 0)) ? "label" : "div"

  return (
    <div className={wrapperClassName}>
      <div className={cn("flex flex-col", labelClassName)}>
        {
          (label.length > 0 || (name && name.length > 0)) &&
          <LabelTag htmlFor={name} className="flex items-center gap-2">
            {Icon && <Icon size={20} className="text-primary mb-1.5" />}
            <LabelText text={label.length !== 0 ? label : name} />
          </LabelTag>
        }
        <InputType
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn("text-lg sm:text-xl bg-base-content/80 text-black rounded-md px-3 py-2",
            "border-2 border-black focus:ring-2 focus:ring-offset-2 ring-primary focus:border-transparent",
            "outline-0 shadow-sm", inputClassName,
            input === "textarea" && "min-h-36 "
          )}
        />
      </div>
      <FormError error={error} />
    </div>
  );
};
