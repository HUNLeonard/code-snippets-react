import React from "react";
import { cn } from "../../utils/cn";
import { LabelText } from "./LabelText";
import { FormError } from "./FormError";

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
}: InputProps) => {
  const InputType = input || "input";

  return (
    <div>
      <label htmlFor={name} className="flex flex-col">
        <LabelText text={label.length !== 0 ? label : name} />
        <InputType
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn("text-lg sm:text-xl bg-base-content/80 text-black rounded-md px-3 py-2",
            "border-2 border-black focus:ring-2 focus:ring-offset-2 ring-primary focus:border-transparent",
            "outline-0 shadow-sm",
            input === "textarea" && "min-h-36 "
          )}
        />
      </label>
      <FormError error={error} />
    </div>
  );
};
