import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { RefObject } from 'react';
import { useElementOverflow } from '../../hooks/useElementOverflow';

interface ScrollButtonProps {
  icon: LucideIcon;
  className?: string;
  execute?: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

export const ScrollButton = ({
  icon: Icon,
  className,
  execute,
  containerRef
}: ScrollButtonProps) => {
  const hasOverflow = useElementOverflow(containerRef);

  if (!hasOverflow) {
    return null;
  }

  return (
    <button
      onClick={execute}
      className={cn("absolute z-30",
        "bg-primary rounded-md p-1 ",
        "hover:brightness-95 active:brightness-75 transition-all",
        "duration-200",
        className
      )}
    >
      <Icon size={24} />
    </button>
  );
};