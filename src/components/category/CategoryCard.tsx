import { Link } from "react-router-dom";
import { TCategory } from "../../types/Category";
import { capitalizer } from "../../utils/capitalize";
import { cn } from "../../utils/cn";
import React from "react";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const cardImageSrc =
    category.image ||
    `https://placehold.co/600x400/221144/a3bbff/?text=${capitalizer(category.name).replace(" ", "%20")}`;

  return (
    <Link to={`/codes?categories=${category.slug}`} className="card bg-base-100 shadow-sm group">
      <figure className="rounded-md overflow-hidden">
        <img
          src={cardImageSrc}
          alt="Shoes"
          className="md:group-hover:blur-[2px] group-hover:scale-105 transition-all duration-600 ease-out"
        />
      </figure>
      <div className={cn("max-md:hidden",
        "card-body inset-x-0 absolute bottom-0 rounded-b-md",
        "-translate-y-full group-hover:translate-y-0",
        "opacity-0 group-hover:opacity-100",
        "blur group-hover:blur-none",
        "bg-base-200/40 backdrop-blur-xs",
        "transition-[translate,opacity,filter] duration-600 ease-in-out")}>
        <h2 className="text-xl font-semibold">{capitalizer(category.name)}</h2>
      </div>
    </Link>
  );
};

export default React.memo(CategoryCard);