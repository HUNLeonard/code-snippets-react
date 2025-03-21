import { Link } from "react-router-dom";
import { useCodeStore } from "../../stores/code.store";
import { H2 } from "../common/H2";
import { cn } from "../../utils/cn";
import { Code } from "lucide-react";
import RecentCodeCard from "./RecentCodeCard";

const RecentCodeShowCase = () => {
  const codes = useCodeStore((state) => state.codes);

  const recentCodes = codes.slice(0, 4);

  return (
    <section
      className="space-y-6 mx-2 my-12 p-6 bg-base-300 rounded-xl backdrop-blur-sm shadow-lg opacity-0 animation-floatUp"
      style={{ animationDelay: "1000ms", animationDuration: "500ms" }}
    >
      <H2 className="relative flex items-center gap-3 !m-0 !mb-6">
        <Code size={32} className="text-primary" />
        Recently added codes
      </H2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentCodes.map((code) => (
          <RecentCodeCard key={code.id} code={code} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/codes"
          className={cn(
            "px-6 py-2 bg-primary/20 text-primary-content rounded-full",
            "hover:bg-primary/30 transition-colors duration-200",
            "flex items-center justify-center gap-2 font-medium",
          )}
        >
          View All Snippets
        </Link>
      </div>
    </section>
  );
};

export default RecentCodeShowCase;
