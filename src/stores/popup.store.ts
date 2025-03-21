import { create } from "zustand";
import { TCategory } from "../types/Category";
import { TCode } from "../types/Code";

interface PopupStore {
  isOpen: boolean;
  isClosing: boolean;
  editingValues: TCode | TCategory | null;
  openPopup: () => void;
  closePopup: () => void;
  setEditingValues: (editProp: TCode | TCategory | null) => void;
  setIsCloseing: (arg: boolean) => void;
}
export const usePopupStore = create<PopupStore>((set) => ({
  isOpen: false,
  isClosing: false,
  editingValues: null,
  openPopup: () => set(() => ({ isOpen: true })),
  closePopup: () => set(() => ({ isOpen: false })),
  setEditingValues: (editProp) => set(() => ({ editingValues: editProp })),
  setIsCloseing: (arg) => set(() => ({ isClosing: arg })),
}));
