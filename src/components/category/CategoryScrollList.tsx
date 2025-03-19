import { useEffect, useRef, useState } from "react";
import { TCategory } from "../../types/Category";
import CategoryCard from "./CategoryCard";

export const CategoryScrollList = ({ categories }: { categories: TCategory[] }) => {
  const [scrollAmount, setScrollAmount] = useState(0);
  const categoryContainer = useRef<HTMLDivElement | null>(null);

  const scrollHorizintal = (direction: "left" | "right") => {
    const calcScroll = 0;
    setScrollAmount(p => p + (direction === "left" ? calcScroll : -calcScroll))
  }

  useEffect(() => {
    if (!categoryContainer.current) return;
    const controller = new AbortController();
    let containerLength = categoryContainer.current?.scrollWidth || 0;

    const reCalculateContainerLength = () => {
      containerLength = categoryContainer.current?.scrollWidth || 0;
    }

    const scroller = () => {
      setScrollAmount(p => containerLength / 2 > -p ? p - 0.25 : 0)
    }

    setInterval(() => {
      scroller()
    }, 10, { signal: controller.signal })

    window.addEventListener('resize', reCalculateContainerLength, { signal: controller.signal })

    return () => { controller.abort() }
  }, [categoryContainer, setScrollAmount])

  return (
    <div
      ref={categoryContainer}
      className="flex h-40 *:max-w-64 *:shrink-0 gap-4"
      style={{ translate: scrollAmount + "px" }}
    >
      {categories.map((c, index) => (
        <CategoryCard key={c.id + "-" + index} category={c} />
      ))}
    </div>
  );
};
