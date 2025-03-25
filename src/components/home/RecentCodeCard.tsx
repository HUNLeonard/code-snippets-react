import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Card } from "../common/Card";
import { H3 } from "../common/H3";
import { TCode } from "../../types/Code";
import { useCopyClipboard } from "../../hooks/useCopyClipboard";

const RecentCodeCard = ({ code }: { code: TCode }) => {
  const { copied, copyToClipboard } = useCopyClipboard(code.code);

  return (
    <Card
      key={code._id}
      className={cn(
        "transition-all duration-300",
        "!bg-base-200",
      )}
    >
      <H3
        title={code.name}
        className={cn(
          "text-center line-clamp-2 [word-break:break-word]",
          "hover:scale-105 w-fit mx-auto",
          "hover:text-primary transition-[color,scale] duration-200",
        )}
      >
        <Link to={`/codes/${code._id}`}>{code.name}</Link>
      </H3>
      <p
        title={code.desc}
        className="text-center text-primary-content/50 [word-break:break-word] line-clamp-4"
      >
        {code.desc}
      </p>
      <div className="flex justify-between mt-auto pt-2">
        <Link
          to={`/codes/${code._id}`}
          className="text-warning hover:underline text-sm font-medium"
        >
          View Code
        </Link>
        <button
          onClick={copyToClipboard} disabled={copied}
          className={cn("text-accent hover:underline text-sm font-medium",
            "disabled:!cursor-not-allowed disabled:text-primary-content/50",
          )}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </Card>
  );
};

export default RecentCodeCard;
