import { codeCardAnimDuration } from "../../shared/const";
import { TCategory } from "../../types/Category";
import CategoryCard from "./CategoryCard";

export const CategoryLister = ({
  categories,
  manager = false,
}: {
  categories: TCategory[];
  manager?: boolean;
}) => {
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((cat, index) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          manager={manager}
          style={{
            animationDuration: codeCardAnimDuration + "ms",
            animationDelay:
              (index * codeCardAnimDuration) / categories.length + "ms",
          }}
          className="animation-floatUp opacity-0"

        />
      ))}
    </section>
  );
};
