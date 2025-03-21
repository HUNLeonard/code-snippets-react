import { create } from "zustand";

type ModalType = "success" | "warning" | "error";

interface ModalStore {
  type: ModalType;
  text: string;
  isShowing: boolean;
  closeModal: () => void;
  openModal: () => void;
  setType: (arg: ModalType) => void;
  setText: (str: string) => void;
}
export const useModalStore = create<ModalStore>((set) => ({
  type: "success",
  text: "",
  isShowing: false,
  closeModal: () => set(() => ({ isShowing: false })),
  openModal: () => set(() => ({ isShowing: true })),
  setType: (arg) => set(() => ({ type: arg })),
  setText: (str) => set(() => ({ text: str })),
}));
