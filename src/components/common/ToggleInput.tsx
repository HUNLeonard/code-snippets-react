import { cn } from "../../utils/cn";
import { LabelText } from "./LabelText";
import { FormError } from "./FormError";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { capitalizer } from "../../utils/capitalize";

interface ToggleInputProps {
  value: boolean;
  onChange: (selectedVisibility: boolean) => void;
  error?: string;
  label?: string;
  name: string;
  wrapperClassName?: string;
  icon?: LucideIcon;
}

export const ToggleInput = ({
  value,
  onChange,
  error,
  label = "",
  name,
  wrapperClassName,
  icon: Icon
}: ToggleInputProps) => {
  const [isVisible, setIsVisible] = useState(value);

  const handleVisibilityChange = () => {
    onChange(!isVisible)
    setIsVisible(!isVisible)
  }

  return (
    <div className={cn("flex flex-wrap gap-2 justify-between max-sm:flex-col", wrapperClassName)}>
      {
        (label.length > 0 || (name && name.length > 0)) &&
        <label htmlFor={name} className="flex items-center justi gap-2">
          {Icon && <Icon size={20} className="text-primary mb-1.5" />}
          <LabelText text={label.length !== 0 ? label : name} />
        </label>
      }
      <button
        name={name}
        id={name}
        title={capitalizer(name || label)}
        type="button"
        onClick={handleVisibilityChange}
        className={cn('w-16 h-8 rounded-4xl border-2 border-base-300',
          'transition-all duration-400 cursor-pointer',
          isVisible ? 'bg-primary' : 'bg-base-content',
          'p-1.5 focus:ring-2 focus:ring-offset-1 ring-primary'
        )}
      >
        <div className={cn('h-full aspect-square  rounded-full',
          isVisible ? 'ml-8 bg-base-content' : "ml-0 bg-base-100",
          'transition-all duration-400'
        )}
        ></div>
      </button>
      <FormError error={error} />
    </div>
  );
};