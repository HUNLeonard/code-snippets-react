import { useSearchParams } from "react-router-dom";
import { H2 } from "../components/common/H2";
import { CodeLister } from "../components/code/CodeLister";
import { useCodeStore } from "../stores/code.store";
import { FilterSection } from "../components/code/FilterSection";
import { useMemo, useCallback } from "react";
import EmptyList from "../components/common/EmptyList";

const Codes = () => {
  const allCodes = useCodeStore((store) => store.codes);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const categoryIds = useMemo(() => {
    return searchParams.get("categories")?.split(" ").filter(Boolean) || [];
  }, [searchParams]);

  const filteredCodes = useMemo(() => {
    return allCodes.filter((code) => {

      const matchesQuery = q
        ? code.name.toLowerCase().includes(q.toLowerCase()) ||
        code.desc.toLowerCase().includes(q.toLowerCase()) ||
        code.code.toLowerCase().includes(q.toLowerCase())
        : true;


      const matchesCategories =
        categoryIds.length > 0
          ? categoryIds.some((catId) => code.categories.includes(catId))
          : true;

      return matchesQuery && matchesCategories;
    });
  }, [allCodes, q, categoryIds]);

  const renderContent = useCallback(() => {
    if (allCodes.length === 0) {
      return <EmptyList
        className="my-12"
        text="No code snippet with has been created yet!"
        buttonText='Create Code'
        to="/codes/new"
      />
    }
    else if (filteredCodes.length === 0) {
      return <EmptyList
        className="my-12"
        text="No code snippet with these search parameters exists yet!"
        buttonText='Create Code'
        to="/codes/new"
      />
    } else {
      return <CodeLister codes={filteredCodes} />
    }
  }, [filteredCodes, allCodes.length])

  return (
    <main className="mx-2">
      <H2>Codes</H2>
      <FilterSection
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {renderContent()}
    </main>
  );
};

export default Codes;
