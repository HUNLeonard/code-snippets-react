import { useParams } from "react-router-dom";
import { useCodeStore } from "../stores/code.store";
import { useCategoryStore } from "../stores/category.store";
import CodeHeader from "../components/codePage/CodeHeader";
import CodeSnippetViewer from "../components/codePage/CodeSnippetViewer";
import CopyCodeButton from "../components/codePage/CopyCodeButton";
import RelatedCodeSnippets from "../components/codePage/RelatedCodeSnippets";
import EmptyList from "../components/common/EmptyList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "@clerk/clerk-react";

const CodePage = () => {
  const params = useParams();
  const codeId = params.id || "";

  const { categories, isLoading: CatLoading } = useCategoryStore();
  const { codes, isLoading: CodeLoading } = useCodeStore();
  const { userId } = useAuth();
  const isLoading = CatLoading || CodeLoading;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const codeResult = codes.find((c) => c._id === codeId);
  const codeData = codeResult?.visibleToOthers ? codeResult : codeResult?.ownerId === userId ? codeResult : undefined

  const relatedCodes = codes
    .filter((c) => {
      if (!c.visibleToOthers && c.ownerId !== userId) {
        return false;
      }

      return c.categories.some(
        (cat) => {
          if (!codeData) return true;
          return c._id !== codeData._id && codeData.categories.includes(cat);
        },
      )
    }
    )
    .slice(0, 2);

  const categoryNames = categories.filter((cat) => {
    if (!codeData) return [];
    return codeData.categories.includes(cat._id)
  },
  );

  const renderContent = () => {
    if (!codeData) {

      return <EmptyList
        className="my-12"
        text={
          <span className="text-base-content font-medium text-xl">
            Sorry there is no code with this ID
          </span>
        }
        buttonText='Create Code'
        to="/codes/new"
      />

    } else {
      return <>
        <CodeHeader codeResult={codeData} categoryNames={categoryNames} />
        <CodeSnippetViewer codeResult={codeData} />
        <CopyCodeButton codeSnippet={codeData.code} />
      </>
    }
  }

  return (
    <main className="mx-2 space-y-8">
      {renderContent()}
      <RelatedCodeSnippets
        relatedCodes={relatedCodes}
        categories={categories}
      />
    </main>
  );
};

export default CodePage;
