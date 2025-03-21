import { cn } from "../../utils/cn";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className={cn(
        "relative min-h-[40vh] flex items-center justify-center mb-12",
        "bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl overflow-hidden",
        "transition-opacity duration-1000 mt-6 mx-2 overflow-hidden opacity-0 animation-fadeIn",
      )}
      style={{ animationDuration: "2000ms" }}
    >
      <div
        className="relative z-10 max-w-3xl text-center p-6"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          <span className="text-primary">C</span>ode{" "}
          <span className="text-primary">S</span>nippets Manager
        </h1>
        <p className="text-xl mb-8 text-base-content/80">
          Store, organize, and easily access your favorite code snippets all in
          one place
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button tag={Link} tagProps={{ to: "/codes/new" }}>
            Add New Snippet
          </Button>
          <Button className="!bg-accent" tag={Link} tagProps={{ to: "/codes" }}>
            Browse Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
