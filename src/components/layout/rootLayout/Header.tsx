import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { NavButton } from "../../common/NavButton";

const navLinks = [
  {
    name: "codes",
    to: "codes"
  },
]

export default function Header() {
  return (
    <header className={cn("bg-base-100/95 text-base-content ",
      "sticky top-0 z-50 flex h-[var(--header-height)] w-full",
      "items-center backdrop-blur transition-shadow duration-100",
      "shadow print:hidden")}>
      <div className="max-w-8xl mx-auto w-full flex justify-between items-center px-2">
        <Link to={"/"} className="text-4xl font-bold w-fit">
          <span className="text-primary">CS</span>M
        </Link>
        <nav>
          {
            navLinks.map(link =>
              <NavButton to={link.to} name={link.name} key={link.name} />
            )
          }
        </nav>
      </div>
    </header>
  );
}
