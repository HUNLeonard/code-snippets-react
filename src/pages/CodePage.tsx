import { useParams } from "react-router-dom";
import { useCodeStore } from "../stores/code.store";
import { useCategoryStore } from "../stores/category.store";
import CodeHeader from "../components/codePage/CodeHeader";
import CodeSnippetViewer from "../components/codePage/CodeSnippetViewer";
import CopyCodeButton from "../components/codePage/CopyCodeButton";
import RelatedCodeSnippets from "../components/codePage/RelatedCodeSnippets";
import EmptyList from "../components/common/EmptyList";

const CodePage = () => {
  const params = useParams();
  const codeId = params.id || "";
  const codes = useCodeStore((store) => store.codes);
  const categories = useCategoryStore((store) => store.categories);
  const codeResult = codes.find((c) => c._id === codeId);
  if (!codeResult) {
    return (
      <>
        <EmptyList
          className="my-12"
          text={
            <span className="text-base-content font-medium text-xl">
              Sorry there is no code with this ID
            </span>
          }
          buttonText='Create Code'
          to="/codes/new"
        />
      </>
    );
  }

  const relatedCodes = codes
    .filter((c) =>
      c.categories.some(
        (cat) => c._id !== codeResult._id && codeResult.categories.includes(cat),
      ),
    )
    .slice(0, 2);

  const categoryNames = categories.filter((cat) =>
    codeResult.categories.includes(cat._id),
  );

  return (
    <main className="mx-2 space-y-8">
      <CodeHeader codeResult={codeResult} categoryNames={categoryNames} />
      <CodeSnippetViewer codeResult={codeResult} />
      <CopyCodeButton codeSnippet={codeResult.code} />
      <RelatedCodeSnippets
        relatedCodes={relatedCodes}
        categories={categories}
      />
    </main>
  );
};

export default CodePage;
