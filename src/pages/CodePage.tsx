import { H2 } from "../components/common/H2";
import { useParams } from "react-router-dom";
import { useCodeStore } from "../stores/code.store";
import { useCategoryStore } from "../stores/category.store";
import CodeHeader from "../components/codePage/CodeHeader";
import CodeSnippetViewer from "../components/codePage/CodeSnippetViewer";
import CopyCodeButton from "../components/codePage/CopyCodeButton";
import RelatedCodeSnippets from "../components/codePage/RelatedCodeSnippets";

const CodePage = () => {
  const params = useParams();
  const codeId = params.id || "";
  const codes = useCodeStore((store) => store.codes);
  const categories = useCategoryStore((store) => store.categories);
  const codeResult = codes.find((c) => c.id === codeId);

  if (!codeResult) {
    return (
      <H2 className="text-center my-16">Sorry there is no code with this ID</H2>
    );
  }

  const relatedCodes = codes
    .filter((c) =>
      c.categories.some(
        (cat) => c.id !== codeResult.id && codeResult.categories.includes(cat),
      ),
    )
    .slice(0, 2);

  const categoryNames = categories.filter((cat) =>
    codeResult.categories.includes(cat.id),
  );

  return (
    <main className="mx-2 space-y-8">
      <CodeHeader codeResult={codeResult} categoryNames={categoryNames} />
      <CodeSnippetViewer codeResult={codeResult} />
      <CopyCodeButton codeSnippet={codeResult.code} />
      <RelatedCodeSnippets relatedCodes={relatedCodes} categories={categories} />
    </main>
  );
};

export default CodePage;