import { LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useEffect, useState } from 'react';

interface ScrollButtonProps {
  icon: LucideIcon
  className?: string
  execute?: () => void;
  container?: HTMLDivElement | null;
}

export const ScrollButton = ({ icon: Icon, className, execute, container }: ScrollButtonProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const checkButtonShowCase = () => {
      if (container && container.scrollWidth > container.clientWidth) {
        setVisible(true)
      } else if (visible) {
        setVisible(false);
      }
    }
    window.addEventListener("resize", checkButtonShowCase, { signal: controller.signal })
    checkButtonShowCase(); //initial checking
    return () => { controller.abort("clean up") }
  }, [container, visible])

  return (
    <>
      {
        visible &&
        <button onClick={execute}
          className={cn("absolute z-30",
            "bg-primary rounded-md p-1 ",
            "hover:brightness-95 active:brightness-75 transition-all",
            "duration-200",
            className
          )}>
          <Icon size={24} />
        </button>
      }
    </>
  )
}
