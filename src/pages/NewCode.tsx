import { H2 } from "../components/common/H2";
import { useCodeStore } from "../stores/code.store";
import { Button } from "../components/common/Button";
import { useState } from "react";
import CodeForm from "../components/code/CodeForm";
import FormContainer from "../components/common/FormContainer";
import { PlusCircle } from "lucide-react";
import { useModalStore } from "../stores/modal.store";
import { OWNERID } from "../shared/const";
import { codeSchema } from "../schemas/code";

const defaultFormValues: codeSchema = {
  name: "",
  code: "",
  desc: "",
  categories: [],
};

const NewCode = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const openModal = useModalStore(store => store.openModal)
  const setType = useModalStore(store => store.setType)
  const setText = useModalStore(store => store.setText)
  const { addCode, isLoading: CodeLoading } = useCodeStore();

  const executeAddCode = async (data: codeSchema) => {
    setIsFormLoading(true);
    try {
      await addCode({
        newName: data.name,
        code: data.code,
        categories: data.categories,
        desc: data.desc,
        ownerId: OWNERID
      });

      openModal();
      setType("success");
      setText("Code Added Successfully!");
    } catch (error) {
      openModal();
      setType("error");
      setText("Failed to add code snippet");
      console.error(error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <main className="sm:mx-2 sm:my-6">
      <FormContainer>
        <H2 className="w-fit mx-auto">New Code</H2>
        <CodeForm
          defaultFormValues={defaultFormValues}
          execute={executeAddCode}
          setLoading={setIsFormLoading}
          formClass="flex flex-col max-w-md mx-auto space-y-4"
        >
          <Button
            disabled={isFormLoading || CodeLoading}
            className="w-fit mx-auto !bg-accent !px-4"
            type="submit"
          >
            <span className="flex items-center gap-2">
              <PlusCircle size={20} />
              Add New Code
            </span>
          </Button>
        </CodeForm>
      </FormContainer>
    </main>
  );
};

export default NewCode;
