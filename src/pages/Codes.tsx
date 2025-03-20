import { useSearchParams } from "react-router-dom";
import { H2 } from "../components/common/H2";
import { CodeLister } from "../components/code/CodeLister";
import { useCodeStore } from "../stores/code.store";
import { FilterSection } from "../components/code/FilterSection";
import { useMemo } from "react";

const Codes = () => {
  const allCodes = useCodeStore((store) => store.codes);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const categoryIds = useMemo(() => {
    return searchParams.get("categories")?.split(" ").filter(Boolean) || [];
  }, [searchParams]);

  const filteredCodes = useMemo(() => {
    return allCodes.filter((code) => {
      // Filter by search query
      const matchesQuery = q
        ? code.name.toLowerCase().includes(q.toLowerCase()) ||
        code.desc.toLowerCase().includes(q.toLowerCase()) ||
        code.code.toLowerCase().includes(q.toLowerCase())
        : true;

      // Filter by categories
      const matchesCategories =
        categoryIds.length > 0
          ? categoryIds.some((catId) => code.categories.includes(catId))
          : true;

      return matchesQuery && matchesCategories;
    });
  }, [allCodes, q, categoryIds]);

  return (
    <main className="mx-2">
      <H2>Codes</H2>
      <FilterSection
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <CodeLister codes={filteredCodes} />
    </main>
  );
};

export default Codes;
