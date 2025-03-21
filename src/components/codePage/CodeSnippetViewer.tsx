import { useState } from "react";
import { ChevronDown, ChevronUp, Code as CodeIcon } from "lucide-react";
import { TCode } from "../../types/Code";

interface CodeSnippetViewerProps {
  codeResult: TCode;
}

const CodeSnippetViewer = ({ codeResult }: CodeSnippetViewerProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-base-300 rounded-lg overflow-hidden shadow-xl border border-base-200 mb-6">
      <div className="flex items-center justify-between p-3 bg-gray-700">
        <div className="flex items-center gap-2">
          <CodeIcon size={18} className="text-blue-400" />
          <span className="font-mono text-sm">{codeResult.name}.ts</span>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 rounded hover:bg-gray-600 transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      <pre
        className={`p-4 overflow-x-auto ${expanded ? "max-h-[500px]" : "max-h-[300px]"
          } transition-all duration-300 ease-in-out`}
      >
        <code className="text-white font-mono text-sm">
          {codeResult.code}
        </code>
      </pre>
    </section>
  );
};

export default CodeSnippetViewer;