import { cn } from "../../utils/cn";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex justify-center ",
      "items-center w-full py-8"
      , className
    )}>
      <div className={cn("animate-spin rounded-full ",
        "size-12 border-t-2 border-b-2 border-primary")} />
    </div>
  );
};

export default LoadingSpinner;
