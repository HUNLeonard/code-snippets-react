import { codeCardAnimDuration } from "../../shared/const";
import { TCode } from "../../types/Code";
import { CodeCard } from "./CodeCard";

export const CodeLister = ({
  codes,
  manager = false,
}: {
  codes: TCode[];
  manager?: boolean;
}) => {
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
      {codes.map((code, index) => (
        <CodeCard
          key={code._id}
          code={code}
          manager={manager}
          style={{
            animationDuration: codeCardAnimDuration + "ms",
            animationDelay:
              (index * codeCardAnimDuration) / codes.length + "ms",
          }}
          className="animation-floatUp opacity-0 "

        />
      ))}
    </section>
  );
};
