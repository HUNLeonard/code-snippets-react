import { NavLink } from 'react-router-dom'
import { capitalizer } from '../../utils/capitalize'
import { cn } from '../../utils/cn'

interface NabButtonProps {
  to: string,
  name: string,
  execute: () => void;
}

export const NavButton = ({ to, name, execute }: NabButtonProps) => {
  return (
    <NavLink end to={to}
      onClick={execute}
      className={cn("px-4 py-1 font-medium rounded-md text-primary-content",
        "bg-primary hover:brightness-75 transition-all duration-200 shadow-md",
        "hover:-translate-y-0.25 inline-block",
        "active:translate-y-0.25 active:brightness-50",
        "[&.active]:bg-accent [&.active]:text-accent-content")}>
      {capitalizer(name)}
    </NavLink>
  )
}
