import { useState } from "react"
import { cn } from "../../../utils/cn"
import { NavButton } from "../../common/NavButton"
import { ChevronDown, ChevronUp } from "lucide-react"

const navLinks = [
  {
    name: "newCode",
    to: "/codes/new"
  },
  {
    name: "codeManager",
    to: "/codes/manager"
  },
  {
    name: "newCategory",
    to: "/category/new"
  },
  {
    name: "categoryManager",
    to: "/category/manager"
  },
]

export const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn("fixed top-[var(--header-height)] h-16 inset-x-0",
        "rounded-bl-md border-t border-base-100/40 shadow z-40",
        "flex items-center transition-all duration-300 bg-base-200/96",
        "max-w-8xl mx-auto backdrop-blur-xs",
        !isOpen && "-translate-y-full bg-transparent shadow-none"
      )}>
      <nav className={`flex ${!isOpen && "opacity-0"} mx-4 transition-all duration-300 gap-4`}>
        {
          navLinks.map(link =>
            <NavButton to={link.to} name={link.name} key={link.name} />
          )
        }
      </nav>
      <button
        onClick={() => setIsOpen(p => !p)}
        className={cn("absolute right-0 bottom-0 translate-y-full ",
          "bg-primary text-primary-content cursor-pointer",
          "rounded-b-md")}>
        {
          isOpen
            ? <ChevronUp size={36} />
            : <ChevronDown size={36} />
        }
      </button>
    </div>
  )
}
