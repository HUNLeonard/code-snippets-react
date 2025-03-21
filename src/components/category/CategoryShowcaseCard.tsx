import { Link } from "react-router-dom";
import { TCategory } from "../../types/Category";
import { capitalizer } from "../../utils/capitalize";
import { cn } from "../../utils/cn";
import React from "react";
import CardImage from "../common/CardImage";

const CategoryShowcaseCard = ({ category }: { category: TCategory }) => {
  return (
    <Link
      to={`/codes?categories=${category.id}`}
      className="card bg-base-100 shadow-sm group"
    >
      <CardImage src={category.image} name={category.name} />
      <div
        className={cn(
          "max-md:hidden flex flex-col flex-auto gap-2",
          "inset-x-0 absolute bottom-0 rounded-b-md p-6",
          "-translate-y-full group-hover:translate-y-0",
          "opacity-0 group-hover:opacity-100",
          "blur group-hover:blur-none",
          "bg-base-200/40 backdrop-blur-xs",
          "transition-[translate,opacity,filter] duration-600 ease-in-out",
        )}
      >
        <h2 className="text-xl font-semibold">{capitalizer(category.name)}</h2>
      </div>
    </Link>
  );
};

export default React.memo(CategoryShowcaseCard);
