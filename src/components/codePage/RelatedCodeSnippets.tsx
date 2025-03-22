import { TCode } from "../../types/Code";
import { TCategory } from "../../types/Category";
import RelatedCodeLister from "./RelatedCodeLister";
import EmptyList from "../common/EmptyList";
import { useCallback } from "react";

interface RelatedCodeSnippetsProps {
  relatedCodes: TCode[];
  categories: TCategory[];
}

const RelatedCodeSnippets = ({
  relatedCodes,
  categories,
}: RelatedCodeSnippetsProps) => {
  const renderContent = useCallback(() => {
    if (relatedCodes.length === 0) {
      return <EmptyList
        text="No related code snippet has been created yet!"
        buttonText='Create Code'
        to="/codes/new"
      />;
    } else {
      return (
        <RelatedCodeLister
          relatedCodes={relatedCodes}
          categories={categories}
        />
      );
    }
  }, [relatedCodes, categories]);

  return (
    <section className="mt-12">
      <h3 className="text-4xl font-semibold mb-4 text-gray-300">
        Related Code Snippets
      </h3>
      {renderContent()}
    </section>
  );
};

export default RelatedCodeSnippets;
