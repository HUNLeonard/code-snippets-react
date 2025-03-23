import { AlertTriangle, Check, InfoIcon, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useCallback, useEffect, useState } from "react";
import { modalCloseAnimationTimer, modalCountdownTimer } from "../../shared/const";
import TopLoadingBar from "./TopLoadingBar";
import { useModalStore } from "../../stores/modal.store";
import LoadingBarIconWrapper from "./LoadingBarIconWrapper";


const Modal = () => {
  const { type, isShowing, text, closeModal } = useModalStore();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
      setIsClosing(false);
    }, modalCloseAnimationTimer);
  }, [closeModal]);

  useEffect(() => {
    let closeTimer: NodeJS.Timeout;
    if (isShowing && !isClosing) {
      closeTimer = setTimeout(() => {
        handleClose();
      }, modalCountdownTimer);
    }

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, [isShowing, isClosing, handleClose]);

  if (!isShowing) return null;

  const renderIcon = () => {
    if (type === "success") {
      return (
        <>
          <TopLoadingBar maxTime={modalCountdownTimer} bg="var(--color-success)" />
          <LoadingBarIconWrapper bg={"var(--color-success)"} color={"var(--color-success-content)"}>
            <Check strokeWidth={4} />
          </LoadingBarIconWrapper>

        </>
      )
    } else if (type === "error") {
      return (
        <>
          <TopLoadingBar maxTime={modalCountdownTimer} bg="var(--color-error)" />
          <LoadingBarIconWrapper bg={"var(--color-error)"} color={"var(--color-error-content)"}>
            <X strokeWidth={4} />
          </LoadingBarIconWrapper>
        </>
      )
    } else if (type === "warning") {
      return (<>
        <TopLoadingBar maxTime={modalCountdownTimer} bg="var(--color-warning)" />
        <LoadingBarIconWrapper bg={"var(--color-warning)"} color={"var(--color-warning-content)"}>
          <AlertTriangle strokeWidth={2} />
        </LoadingBarIconWrapper>
      </>)
    } else if (type === "info") {
      return (<>
        <TopLoadingBar maxTime={modalCountdownTimer} bg="var(--color-info)" />
        <LoadingBarIconWrapper bg={"var(--color-info)"} color={"var(--color-info-content)"}>
          <InfoIcon strokeWidth={3} />
        </LoadingBarIconWrapper>

      </>)
    } else {
      return (<TopLoadingBar maxTime={modalCountdownTimer} />)
    }
  }

  return (
    <div className={cn("fixed top-[var(--header-height)] z-50 right-0 flex items-center gap-4 p-4",
      "border border-base-content/10 shadow:md rounded-l-lg bg-base-300 overflow-hidden",
      isClosing ? "animation-slideOutRight" : "animation-slideInLeft",
    )}
      style={{ animationDuration: modalCloseAnimationTimer + "ms" }}
    >
      <TopLoadingBar maxTime={modalCountdownTimer} />
      {
        renderIcon()
      }
      <h3 className="sm:text-xl font-medium sm:font-bold text-base-content flex-1">{text}</h3>
      <button
        className={cn("bg-error text-error-content size-6 rounded-full",
          "grid place-content-center hover:bg-red-500 shrink-0 mb-auto")}
        onClick={handleClose}>
        <X strokeWidth={4} size={16} />
      </button>
    </div>
  )
}

export default Modal