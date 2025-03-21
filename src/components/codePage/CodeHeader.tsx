import { TCode } from "../../types/Code";
import { TCategory } from "../../types/Category";
import { H2 } from "../common/H2";
import BubbleText from "../common/BubbleText";
import { Link } from "react-router-dom";

interface CodeHeaderProps {
  codeResult: TCode;
  categoryNames: TCategory[];
}

const CodeHeader = ({ codeResult, categoryNames }: CodeHeaderProps) => {
  return (
    <section>
      <H2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        {codeResult.name}
      </H2>

      <div className="flex flex-wrap gap-2 mb-4">
        {categoryNames.map((cat) => (
          <BubbleText key={cat.id} text={cat.name} tag={Link} tagProps={{ to: `/codes?categories=${cat.id}` }} />
        ))}
      </div>

      <p className="text-gray-400 text-lg">{codeResult.desc}</p>
    </section>
  );
};

export default CodeHeader;