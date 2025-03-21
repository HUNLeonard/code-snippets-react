import { TCode } from "../../types/Code";
import { TCategory } from "../../types/Category";
import RelatedCodeLister from "./RelatedCodeLister";
import NoRelatedCodes from "./NoRelatedCodes";

interface RelatedCodeSnippetsProps {
  relatedCodes: TCode[];
  categories: TCategory[];
}

const RelatedCodeSnippets = ({ relatedCodes, categories }: RelatedCodeSnippetsProps) => {
  return (
    <section className="mt-12">
      <h3 className="text-4xl font-semibold mb-4 text-gray-300">
        Related Code Snippets
      </h3>
      {
        relatedCodes.length === 0
          ? <NoRelatedCodes />
          : <RelatedCodeLister relatedCodes={relatedCodes} categories={categories} />
      }
    </section>
  );
};

export default RelatedCodeSnippets;