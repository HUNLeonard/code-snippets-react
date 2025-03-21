import { usePopupStore } from "../../stores/popup.store";
import { Button } from "./Button";
import { cn } from "../../utils/cn";
import { useCategoryStore } from "../../stores/category.store";
import { useCodeStore } from "../../stores/code.store";
import { H2 } from "./H2";
import { useEffect, useState } from "react";
import { SaveIcon, Trash2 } from "lucide-react";
import { popupAnimDuration } from "../../shared/const";

const Popup = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const isopen = usePopupStore((store) => store.isOpen);
  const isClosing = usePopupStore((store) => store.isClosing);
  const editingvalues = usePopupStore((store) => store.editingValues);
  const setEditingvalues = usePopupStore((store) => store.setEditingValues);
  const closePopup = usePopupStore((store) => store.closePopup);
  const setIsClosing = usePopupStore((store) => store.setIsCloseing);

  const updateCategory = useCategoryStore((store) => store.updateCategory);
  const updateCode = useCodeStore((store) => store.updateCode);
  const removeCategory = useCategoryStore((store) => store.removeCategory);
  const removeCode = useCodeStore((store) => store.removeCode);


  useEffect(() => {
    if (!editingvalues) return;

    setIsDeleting(false);
    setIsClosing(false);

  }, [editingvalues, setIsDeleting, setIsClosing]);

  if (!isopen || !editingvalues) return null

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ("code" in editingvalues) updateCode(editingvalues);
    else updateCategory(editingvalues);

    resetPopup();
  };

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    if ("code" in editingvalues) removeCode(editingvalues.id);
    else removeCategory(editingvalues.id);

    resetPopup();
  };

  const resetPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setEditingvalues(null);
      closePopup();
    }, popupAnimDuration);
  };

  const editingText = `Editing ${!editingvalues || "code" in editingvalues ? "Code" : "Category"
    }`;

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full z-50",
        "flex justify-center items-center animation-bgFadeIn",
        isClosing && "animation-bgFadeOut",
      )}
      style={{ animationDuration: `${popupAnimDuration}ms` }}
    >
      <form
        onSubmit={handleEdit}
        className={cn(
          "bg-base-300 p-4 rounded-lg",
          "animation-floatUp max-w-lg w-full text-bg-content",
          "flex flex-col justify-between gap-4",
          isClosing && "animation-floatBeyond",
        )}
        style={{ animationDuration: `${popupAnimDuration}ms` }}
      >
        <H2 className="!my-0">{editingText}</H2>
        <div className="flex flex-wrap justify-between gap-2">
          <Button type="submit" className="flex items-center h-fit gap-2 !px-4 flex-1 whitespace-nowrap justify-center">
            <SaveIcon />
            Edit
          </Button>
          <Button
            execute={handleDelete}
            className={cn(
              isDeleting
                ? "!bg-error !text-error-content"
                : "!bg-warning text-warning-content",
              "flex items-center h-fit gap-2 !px-4 flex-1 whitespace-nowrap justify-center",
            )}
          >
            <Trash2 />
            {!isDeleting ? "Delete" : "Delete Confirm"}
          </Button>
          <Button
            execute={resetPopup}
            className="!bg-base-content/70 !text-base-100 flex-1 whitespace-nowrap "
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
