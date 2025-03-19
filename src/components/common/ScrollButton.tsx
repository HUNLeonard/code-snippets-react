import { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ScrollButtonProps {
  icon: LucideIcon
  className?: string
  execute?: () => void;
}

export const ScrollButton = ({ icon: Icon, className, execute }: ScrollButtonProps) => {
  return (
    <button onClick={execute}
      className={cn("absolute z-30",
        "bg-primary rounded-md cursor-pointer p-1 ",
        "hover:brightness-95 active:brightness-75 transition-all",
        "duration-200",
        className
      )}>
      <Icon size={24} />
    </button>
  )
}
