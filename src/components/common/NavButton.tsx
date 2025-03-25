import { NavLink } from 'react-router-dom'
import { capitalizer } from '../../utils/capitalize'
import { cn } from '../../utils/cn'

interface NabButtonProps {
  to: string,
  name: string,
  execute?: () => void;
}

export const NavButton = ({ to, name, execute }: NabButtonProps) => {
  return (
    <NavLink end to={to}
      onClick={execute}
      className={cn("btn-nav",
        "[&.active]:bg-accent [&.active]:text-accent-content")}>
      {capitalizer(name)}
    </NavLink>
  )
}
