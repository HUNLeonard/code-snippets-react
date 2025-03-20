import { CSSProperties, useState } from "react";
import { TCode } from "../../types/Code";
import { H3 } from "../common/H3";
import { cn } from "../../utils/cn";
import { Edit } from "lucide-react";

interface CodeCardProps {
  code: TCode;
  manager?: boolean;
  style?: CSSProperties
  className?: string
}

export const CodeCard = ({ code, manager = false, style = {}, className }: CodeCardProps) => {
  const [showMore, setShowMore] = useState(false);


  const copyCode = () => {
    window.navigator.clipboard.writeText(code.code)
  }


  return (
    <article
      style={style}
      className={cn("relative bg-base-300 p-3 sm:p-4 ",
        "flex flex-col rounded-lg gap-4 h-fit",
        className)}>
      <H3 className={`text-center ${!showMore && "line-clamp-2"}`}>
        {code.name}
      </H3>
      <p
        className={`${!showMore && "line-clamp-2"
          } text-center text-primary-content/50 [word-break:break-word]`}
      >
        {code.desc}
      </p>
      <pre className={cn("grid bg-base-100 rounded-md px-4",
        !showMore ? "grid-rows-[0fr]" : "grid-rows-[1fr] pt-4 pb-2",
        " transition-[grid-template-rows,padding] duration-400 ease-in-out")}>
        <code className={`${!showMore ? "overflow-hidden" : "overflow-y-hidden overflow-x-auto"}`}>
          {code.code}
        </code>
      </pre>

      <div className={cn("flex justify-between pt-2",
        "*:hover:-translate-y-0.5 *:hover:brightness-75",
        "*:active:translate-y-0.25 *:active:brightness-50"
      )}>
        <button
          className={"w-fit"}
          onClick={copyCode}
        >
          Copy
        </button>
        <button
          className={cn(
            "w-fit",
            showMore ? "text-accent" : "text-primary",
          )}
          onClick={() => setShowMore((p) => !p)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
      {manager && (
        <>
          <button className="absolute top-3 sm:top-5 right-3 sm:right-5 w-fit bg-base-300">
            <Edit size={32} />
          </button>
        </>
      )}
    </article>
  );
};
