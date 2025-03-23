import { usePopupStore } from "../../stores/popup.store";
import { cn } from "../../utils/cn";
import { useCategoryStore } from "../../stores/category.store";
import { useCodeStore } from "../../stores/code.store";
import { H2 } from "./H2";
import { useEffect, useState } from "react";
import { OWNERID, popupAnimDuration } from "../../shared/const";
import { categorySchema } from "../../schemas/category";
import { codeSchema } from "../../schemas/code";
import { TCategory } from "../../types/Category";
import CategoryEditForm from "../category/CategoryEditForm";
import { TCode } from "../../types/Code";
import CodeEditForm from "../code/CodeEditForm";
import { useModalStore } from "../../stores/modal.store";
import { capitalizer } from "../../utils/capitalize";
import LoadingSpinner from "./LoadingSpinner";
import { X } from "lucide-react";


const Popup = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isopen = usePopupStore((store) => store.isOpen);
  const isClosing = usePopupStore((store) => store.isClosing);
  const editingvalues = usePopupStore((store) => store.editingValues);
  const setEditingvalues = usePopupStore((store) => store.setEditingValues);
  const closePopup = usePopupStore((store) => store.closePopup);
  const setIsClosing = usePopupStore((store) => store.setIsCloseing);

  const openModal = useModalStore(store => store.openModal)
  const setType = useModalStore(store => store.setType)
  const setText = useModalStore(store => store.setText)

  const { updateCategory, removeCategory, isLoading: CatLoading } = useCategoryStore();
  const { updateCode, removeCode, isLoading: CodeLoading } = useCodeStore();
  const isLoading = CatLoading || CodeLoading || isSubmitting;

  useEffect(() => {
    if (!editingvalues) return;
    setIsDeleting(false);
    setIsClosing(false);
    setIsSubmitting(false);
  }, [editingvalues, setIsDeleting, setIsClosing, setIsSubmitting]);

  if (!isopen || !editingvalues) return null;

  const type = "code" in editingvalues ? "code" : "category";

  const executeEdit = async (data: categorySchema | codeSchema) => {
    if (!editingvalues) return;
    setIsSubmitting(true);

    try {
      if (type === "code") {
        await updateCode({
          code: {
            _id: editingvalues._id,
            name: data.name,
            code: (data as TCode).code,
            desc: (data as TCode).desc,
            categories: (data as TCode).categories,
            ownerId: editingvalues.ownerId
          },
          ownerId: OWNERID
        });
      } else if (type === "category") {
        await updateCategory({
          category: {
            _id: editingvalues._id,
            name: (data as TCategory).name,
            image: (data as TCategory).image,
            ownerId: editingvalues.ownerId
          },
          ownerId: OWNERID,
        });
      }

      resetPopup();
      openModal();
      setType("success");
      setText(capitalizer(type) + " Updated Successfully!");
    } catch (error) {
      openModal();
      setType("error");
      setText("Failed to update " + capitalizer(type));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    setIsSubmitting(true);
    try {
      if ("code" in editingvalues) {
        await removeCode({ id: editingvalues._id, ownerId: OWNERID });
      } else {
        await removeCategory({ id: editingvalues._id, ownerId: OWNERID });
      }

      resetPopup();
      openModal();
      setType("success");
      setText(capitalizer(type) + " Deleted Successfully!");
    } catch (error) {
      openModal();
      setType("error");
      setText("Failed to delete " + capitalizer(type));
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setEditingvalues(null);
      closePopup();
    }, popupAnimDuration);
  };

  const editingText = `Editing ${type}`;



  const renderEditForm = () => {
    if (isLoading) {
      return <>
        <LoadingSpinner />
      </>
    }
    if (type === "code") {
      return <CodeEditForm editingvalues={editingvalues as TCode} isDeleting={isDeleting} resetPopup={resetPopup} handleDelete={handleDelete} executeEdit={executeEdit} />;
    } else {
      return <CategoryEditForm editingvalues={editingvalues as TCategory} isDeleting={isDeleting} resetPopup={resetPopup} handleDelete={handleDelete} executeEdit={executeEdit} />;
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full z-50",
        "flex justify-center items-center animation-bgFadeIn",
        isClosing && "animation-bgFadeOut"
      )}
      style={{ animationDuration: `${popupAnimDuration}ms` }}
    >
      <div
        className={cn("relative",
          "bg-base-300 p-6 rounded-lg overflow-y-auto",
          "animation-floatUp max-w-lg w-full text-bg-content",
          "flex flex-col justify-between gap-4 max-h-screen",
          isClosing && "animation-floatBeyond",
        )}
        style={{ animationDuration: `${popupAnimDuration}ms` }}
      >
        <H2 className="!m-0">{editingText}</H2>
        <button className={cn("absolute right-4 top-6 ",
          "cursor-pointer bg-base-100 text-base-content",
          "rounded-full size-12",
          "grid place-content-center",
          "hover:brightness-110 transition-[filter]"
        )}
          onClick={resetPopup}
        >
          <X size={32} strokeWidth={3} />
        </button>
        {renderEditForm()}
      </div>
    </div>
  );
};

export default Popup;
