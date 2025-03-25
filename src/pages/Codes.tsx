import { useSearchParams } from "react-router-dom";
import { H2 } from "../components/common/H2";
import { CodeLister } from "../components/code/CodeLister";
import { useCodeStore } from "../stores/code.store";
import { FilterSection } from "../components/code/FilterSection";
import { useMemo, useCallback } from "react";
import EmptyList from "../components/common/EmptyList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";

const Codes = () => {
  const { codes, isLoading } = useCodeStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userId } = useAuth();

  const q = searchParams.get("q") || "";
  const categoryIds = useMemo(() => {
    return searchParams.get("categories")?.split(" ").filter(Boolean) || [];
  }, [searchParams]);

  const filteredCodes = useMemo(() => {
    return codes.filter((code) => {
      if (!code.visibleToOthers && code.ownerId !== userId) {
        return false;
      }
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
  }, [codes, q, categoryIds, userId]);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    else if (codes.length === 0) {
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
  }, [filteredCodes, codes.length, isLoading])

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
