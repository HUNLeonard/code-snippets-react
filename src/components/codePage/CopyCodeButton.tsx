import { Copy } from "lucide-react";
import { cn } from "../../utils/cn";
import { useCopyClipboard } from "../../hooks/useCopyClipboard";

interface CopyCodeButtonProps {
  codeSnippet: string;
}

const CopyCodeButton = ({ codeSnippet }: CopyCodeButtonProps) => {
  const { copied, copyToClipboard } = useCopyClipboard(codeSnippet);

  return (
    <div className="flex gap-4">
      <button
        onClick={copyToClipboard}
        disabled={copied}
        className={cn("flex items-center gap-2 px-4 py-2 bg-primary ",
          "not-disabled:hover:brightness-90 not-disabled:hover:-translate-y-0.5 ",
          "not-disabled:active:translate-y-0",
          "not-disabled:active:brightness-75 transition-[translate,filter] ",
          "disabled:bg-primary/50 disabled:!cursor-not-allowed",
          "rounded-md text-white font-medium"
        )}
      >
        <Copy size={18} />
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  );
};

export default CopyCodeButton;