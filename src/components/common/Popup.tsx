import { usePopupStore } from "../../stores/popup.store";
import { cn } from "../../utils/cn";
import { useCategoryStore } from "../../stores/category.store";
import { useCodeStore } from "../../stores/code.store";
import { H2 } from "./H2";
import { useEffect, useState } from "react";
import { popupAnimDuration } from "../../shared/const";
import { categorySchema } from "../../schemas/category";
import { codeSchema } from "../../schemas/code";
import { TCategory } from "../../types/Category";
import CategoryEditForm from "../category/CategoryEditForm";
import { TCode } from "../../types/Code";
import CodeEditForm from "../code/CodeEditForm";
import { useModalStore } from "../../stores/modal.store";
import { capitalizer } from "../../utils/capitalize";


const Popup = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const isopen = usePopupStore((store) => store.isOpen);
  const isClosing = usePopupStore((store) => store.isClosing);
  const editingvalues = usePopupStore((store) => store.editingValues);
  const setEditingvalues = usePopupStore((store) => store.setEditingValues);
  const closePopup = usePopupStore((store) => store.closePopup);
  const setIsClosing = usePopupStore((store) => store.setIsCloseing);

  const openModal = useModalStore(store => store.openModal)
  const setType = useModalStore(store => store.setType)
  const setText = useModalStore(store => store.setText)

  const updateCategory = useCategoryStore((store) => store.updateCategory);
  const updateCode = useCodeStore((store) => store.updateCode);
  const removeCategory = useCategoryStore((store) => store.removeCategory);
  const removeCode = useCodeStore((store) => store.removeCode);

  useEffect(() => {
    if (!editingvalues) return;
    setIsDeleting(false);
    setIsClosing(false);
  }, [editingvalues, setIsDeleting, setIsClosing]);

  if (!isopen || !editingvalues) return null;

  const type = "code" in editingvalues ? "code" : "category";

  const executeEdit = (data: categorySchema | codeSchema) => {
    if (!editingvalues) return;
    if (type === "code") {
      updateCode({
        _id: editingvalues._id,
        name: data.name,
        code: (data as TCode).code,
        desc: (data as TCode).desc,
        categories: (data as TCode).categories,
        ownerId: editingvalues.ownerId
      });
    } else if (type === "category") {
      updateCategory({
        _id: editingvalues._id,
        name: (data as TCategory).name,
        image: (data as TCategory).image,
        ownerId: editingvalues.ownerId
      });
    }

    resetPopup();
    openModal();
    setType("success");
    setText(capitalizer(type) + " Added Successfully!");
  };

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    if ("code" in editingvalues) removeCode(editingvalues._id);
    else removeCategory(editingvalues._id);

    resetPopup();
    openModal();
    setType("success");
    setText(capitalizer(type) + " Deleted Successfully!");
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
        className={cn(
          "bg-base-300 p-6 rounded-lg overflow-y-auto",
          "animation-floatUp max-w-lg w-full text-bg-content",
          "flex flex-col justify-between gap-4 max-h-screen",
          isClosing && "animation-floatBeyond",
        )}
        style={{ animationDuration: `${popupAnimDuration}ms` }}
      >
        <H2 className="!m-0">{editingText}</H2>
        {renderEditForm()}
      </div>
    </div>
  );
};

export default Popup;
