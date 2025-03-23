import { CSSProperties, useState } from "react";
import { TCode } from "../../types/Code";
import { H3 } from "../common/H3";
import { cn } from "../../utils/cn";
import { Copy, Edit } from "lucide-react";
import { Card } from "../common/Card";
import { usePopupStore } from "../../stores/popup.store";
import { Link } from "react-router-dom";
import { useCopyClipboard } from "../../hooks/useCopyClipboard";

interface CodeCardProps {
  code: TCode;
  manager?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const CodeCard = ({
  code,
  manager = false,
  style = {},
  className,
}: CodeCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const { copied, copyToClipboard } = useCopyClipboard(code.code);
  const setEditingValues = usePopupStore((store) => store.setEditingValues);
  const openPopup = usePopupStore((store) => store.openPopup);


  const handleEdit = () => {
    setEditingValues(code);
    openPopup();
  };


  return (
    <Card Tag="article" style={style} className={className}>
      <H3
        className={cn("text-center",
          !showMore && "line-clamp-2",
          "hover:scale-105 w-fit mx-auto",
          "hover:text-primary transition-[color,scale] duration-200"
        )}

        title={code.name}
      >
        <Link to={`/codes/${code._id}`}>{code.name}</Link>
      </H3>
      <p
        className={`${!showMore && "line-clamp-2"
          } text-center text-primary-content/50 [word-break:break-word]`}
      >
        {code.desc}
      </p>
      <pre
        className={cn(
          "grid bg-base-100 rounded-md px-4",
          !showMore ? "grid-rows-[0fr]" : "grid-rows-[1fr] pt-4 pb-2",
          " transition-[grid-template-rows,padding] duration-400 ease-in-out",
        )}
      >
        <code
          className={`${!showMore ? "overflow-hidden" : "overflow-y-hidden overflow-x-auto"}`}
        >
          {code.code}
        </code>
      </pre>

      <div
        className={cn(
          "flex items-center justify-between pt-2 gap-4 flex-wrap",
          "*:hover:-translate-y-0.5 *:hover:brightness-75",
          "*:active:translate-y-0.25 *:active:brightness-50",
          "*:transition-transform *:duration-200 *:ease-in-out",
          "*:disabled:text-base-content/50 *:disabled:!cursor-not-allowed",
          "*:flex-1 mt-auto"
        )}
      >
        <button className={"w-fit flex gap-2 items-center"} onClick={copyToClipboard} disabled={copied}>
          <Copy size={18} />
          {copied ? "Copied!" : "Copy"}
        </button>
        <Link
          to={`/codes/${code._id}`}
          className="text-warning font-medium whitespace-nowrap"
        >
          View Code
        </Link>
        <button
          className={cn("w-fit font-medium", showMore ? "text-accent" : "text-primary")}
          onClick={() => setShowMore((p) => !p)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
      {manager && (
        <button
          className={cn("absolute top-3 sm:top-5 right-3 sm:right-5 w-fit",
            "hover:scale-120 transition-transform duration-200 ease-in-out",
          )}
          onClick={handleEdit}
        >
          <Edit size={32} />
        </button>
      )}
    </Card>
  );
};
