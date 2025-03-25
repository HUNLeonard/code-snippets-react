import { useCodeStore } from "../../stores/code.store";
import { H2 } from "../common/H2";
import { Code } from "lucide-react";
import RecentCodeLister from "./RecentCodeLister";
import EmptyList from "../common/EmptyList";
import { useCallback } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { OWNERID } from "../../shared/const";

const RecentCodeShowCase = () => {
  const { codes, isLoading } = useCodeStore();


  const renderContent = useCallback(() => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (codes.length === 0) {
      return (
        <EmptyList
          text="No code snippet has been created yet!"
          buttonText="Create Code"
          to="/codes/new"
        />
      );
    } else {
      const availableCodes = codes.filter(c => {
        if (!c.visibleToOthers && c.ownerId !== OWNERID) {
          return false;
        } return true;
      })

      const recentCodes = availableCodes.slice(0, 4);
      return <RecentCodeLister codes={recentCodes} />;
    }
  }, [codes, isLoading]);

  return (
    <section
      className="space-y-6 mx-2 my-12 p-6 bg-base-300 rounded-xl backdrop-blur-sm shadow-lg opacity-0 animation-floatUp"
      style={{ animationDelay: "1000ms", animationDuration: "500ms" }}
    >
      <H2 className="relative flex items-center gap-3 !m-0 !mb-6">
        <Code size={32} className="text-primary" />
        Recently added codes
      </H2>
      {renderContent()}
    </section>
  );
};

export default RecentCodeShowCase;
