import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

const FormContainer = ({ children, className }: FormContainerProps) => {
  return (
    <div className={cn(
      "max-w-2xl mx-auto p-6 rounded-xl",
      "bg-base-300/50 backdrop-blur-sm shadow-lg",
      "border border-base-content/10",
      className
    )}>
      {children}
    </div>
  );
};

export default FormContainer;