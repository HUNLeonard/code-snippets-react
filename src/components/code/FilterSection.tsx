import { BoltIcon, ChevronDown, ChevronUp, SearchIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { H3 } from "../common/H3";
import { useCategoryStore } from "../../stores/category.store";
import { TCategory } from "../../types/Category";
import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import CategorySelector from "../common/CategorySelector";
import { SetURLSearchParams } from "react-router-dom";

interface FilterSectionProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const FilterSection = ({ searchParams, setSearchParams }: FilterSectionProps) => {
  const [isCatFilterOpen, setIsCatFilterOpen] = useState(false);
  const categories = useCategoryStore((store) => store.categories);
  const q = searchParams.get("q") || "";
  const categoryIds = searchParams.get("categories")?.split(" ").filter(Boolean) || [];
  const [inputQuery, setInputQuery] = useState(q);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSearchParams(params => {
      if (inputQuery) {
        params.set("q", inputQuery.trim());
      } else {
        params.delete("q");
      }
      return params;
    });
  };

  const handleCategoriesChange = (newCategories: TCategory["id"][]) => {
    setSearchParams(params => {
      if (newCategories.length > 0) {
        params.set("categories", newCategories.join(" "));
      } else {
        params.delete("categories");
      }
      return params;
    });
  };

  return (
    <section
      className={cn(
        "w-full px-6 py-3 rounded-lg my-6",
        "bg-base-content/80 backdrop-blur-xs",
        "md:sticky top-[var(--header-height)] z-30",
        "flex flex-col md:flex-row md:items-center justify-between",
        "gap-4"
      )}
    >
      <H3 className="!text-base-100 flex items-center gap-2">
        <BoltIcon size={32} /> Filters
      </H3>
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-1 focus-within:ring-2 rounded-md ",
          "ring-primary focus-within:*:border-transparent md:max-w-lg")}>
        <Input
          value={inputQuery}
          onChange={handleSearchInputChange}
          labelClassName="flex-1"
          wrapperClassName="flex-1 min-w-32"
          inputClassName="rounded-r-none !border-r-0 !ring-0 !ring-offset-0"
        />
        <button type="submit"
          className={cn("min-w-12 grid place-content-center bg-base-100",
            " rounded-r-md border-2 border-l-0 border-black hover:bg-base-300")}>
          <SearchIcon size={32} />
        </button>
      </form>
      <div className="w-fit relative">
        <Button
          className={cn("flex items-center justify-between !pr-2 pl-4 gap-4 ",
            "border-2 border-black",
            isCatFilterOpen && "rounded-b-none hover:!translate-y-0")}
          execute={() => setIsCatFilterOpen((p) => !p)}
        >
          Categories
          {isCatFilterOpen ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </Button>

        <CategorySelector
          options={categories}
          value={categoryIds}
          wrapperClassName={cn(
            "absolute flex justify-center w-full ",
            "bg-base-content p-2 rounded-b-md border-2 border-black border-t-0",
            !isCatFilterOpen && "hidden",
          )}
          labelClassName=" w-full"
          listClassName="flex-col justify-center w-full"
          buttonClassName="!w-full"
          onChange={handleCategoriesChange}
        />
      </div>
    </section>
  );
};
