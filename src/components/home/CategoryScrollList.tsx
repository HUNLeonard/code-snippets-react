import { useEffect, useRef, useState } from "react";
import { TCategory } from "../../types/Category";
import CategoryShowcaseCard from "./CategoryShowcaseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollButton } from "../common/ScrollButton";
import { cn } from "../../utils/cn";
import EmptyList from "../common/EmptyList";

export const CategoryScrollList = ({
  categories,
}: {
  categories: TCategory[];
}) => {
  const categoryContainer = useRef<HTMLDivElement | null>(null);
  const [containerElement, setContainerElement] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (categoryContainer.current) {
      setContainerElement(categoryContainer.current);
    }
  }, []);

  const scrollHorizintal = (direction: "left" | "right") => {
    if (!categoryContainer.current) return;
    // const containerLength = categoryContainer.current?.scrollWidth || 0;
    categoryContainer.current.scrollLeft += direction === "left" ? -360 : 360;
    return;
  };

  return (
    <>
      {categories.length === 0 ? (
        <EmptyList
          text="No category has been created yet!"
          buttonText="Create Category"
          to="/category/new"
        />
      ) : (
        <>
          <div className="max-md:hidden absolute left-0 inset-y-0 w-14 bg-gradient-to-r from-base-300 from-80% to-transparent z-10" />
          <ScrollButton
            icon={ChevronLeft}
            execute={() => scrollHorizintal("left")}
            className="left-0 top-1/2 -translate-y-1/2 max-sm:bg-primary/20"
            container={containerElement}
          />
          <div
            ref={categoryContainer}
            className={cn(
              "flex h-20 md:h-40",
              "max-md:[&_figure,&_img]:h-full max-md:[&_img]:object-cover",
              "max-md:*:h-20 *:max-w-20 md:*:max-w-64 *:shrink-0",
              "gap-4 overflow-x-auto no-scrollbar scroll-smooth ",
              "max-md:*:!rounded-full max-md:*:overflow-hidden ",
              "items-center md:mx-8",
            )}
          >
            {categories.map((c, index) => (
              <CategoryShowcaseCard key={c.id + "-" + index} category={c} />
            ))}
          </div>
          <ScrollButton
            icon={ChevronRight}
            execute={() => scrollHorizintal("right")}
            className="right-0 top-1/2 -translate-y-1/2 max-sm:bg-primary/20"
            container={containerElement}
          />
          <div className="max-md:hidden absolute right-0 inset-y-0 w-14 bg-gradient-to-r from-transparent to-20% to-base-300 z-10" />
        </>
      )}
    </>
  );
};
