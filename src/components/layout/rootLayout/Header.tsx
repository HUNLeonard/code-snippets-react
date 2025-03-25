import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { NavButton } from "../../common/NavButton";
import { SignedOut, SignedIn, UserButton, SignUpButton, SignInButton } from "@clerk/clerk-react";
import { BASE_URL } from "../../../shared/const";

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
        <Link to={"/"} className="text-4xl font-bold w-fit ">
          <span className="text-primary">CS</span>M
        </Link>
        <nav className="flex gap-2">
          {
            navLinks.map(link =>
              <NavButton to={link.to} name={link.name} key={link.name} />
            )
          }
          <SignedIn>
            <UserButton showName appearance={{
              elements: {
                userButtonOuterIdentifier: '!text-base-content !text-lg max-md:!hidden',
              },
            }}
              afterSignOutUrl={BASE_URL}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className={cn("btn-nav")}>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className={cn("btn-nav")}>
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

        </nav>
      </div>
    </header>
  );
}
