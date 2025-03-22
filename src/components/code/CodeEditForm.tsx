import CodeForm from "./CodeForm";
import { useState } from "react";
import { TCode } from "../../types/Code";
import { codeSchema } from "../../schemas/code";
import EditFormButtons from "../common/EditFormButtons";

interface CodeEditFormProps {
  editingvalues: TCode;
  isDeleting: boolean;
  resetPopup: () => void;
  handleDelete: () => void;
  executeEdit: (data: codeSchema) => void;
}

const CodeEditForm = ({ editingvalues, isDeleting, resetPopup, handleDelete, executeEdit }: CodeEditFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CodeForm
      defaultFormValues={editingvalues}
      execute={executeEdit}
      setLoading={setIsLoading}
      formClass="space-y-4"
    >
      <EditFormButtons isLoading={isLoading} isDeleting={isDeleting} resetPopup={resetPopup} handleDelete={handleDelete} />
    </CodeForm>
  );
};

export default CodeEditForm;
