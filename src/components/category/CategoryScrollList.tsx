import { useRef } from "react";
import { TCategory } from "../../types/Category";
import CategoryCard from "./CategoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollButton } from "../common/ScrollButton";
import { cn } from "../../utils/cn";

export const CategoryScrollList = ({
  categories,
}: {
  categories: TCategory[];
}) => {
  const categoryContainer = useRef<HTMLDivElement | null>(null);

  const scrollHorizintal = (direction: "left" | "right") => {
    if (!categoryContainer.current) return;
    // const containerLength = categoryContainer.current?.scrollWidth || 0;
    categoryContainer.current.scrollLeft += direction === "left" ? -360 : 360

    return;
  };

  return (
    <>
      <ScrollButton
        icon={ChevronLeft}
        execute={() => scrollHorizintal("left")}
        className="left-0 top-1/2 -translate-y-1/2 max-sm:bg-primary/20"
      />
      <div
        ref={categoryContainer}
        className={cn("flex h-20 md:h-40",
          "max-md:[&_figure,&_img]:h-full max-md:[&_img]:object-cover",
          "max-md:*:h-20 *:max-w-20 md:*:max-w-64 *:shrink-0",
          "gap-4 overflow-x-auto no-scrollbar scroll-smooth ",
          "max-md:*:!rounded-full max-md:*:overflow-hidden ",
          "items-center sm:mx-8")}
      >
        {categories.map((c, index) => (
          <CategoryCard key={c.id + "-" + index} category={c} />
        ))}
      </div>
      <ScrollButton
        icon={ChevronRight}
        execute={() => scrollHorizintal("right")}
        className="right-0 top-1/2 -translate-y-1/2 max-sm:bg-primary/20"
      />
    </>
  );
};
