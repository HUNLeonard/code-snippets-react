import { create } from "zustand";
import { TCode } from "../types/Code";
import { persist } from "zustand/middleware";

interface AddCodeProps {
  newName: string;
  code: string;
  categories: TCode["id"][];
  desc: TCode["desc"];
}

interface CodeStore {
  codes: TCode[];
  addCode: ({ newName, code, categories }: AddCodeProps) => void;
  updateCode: (uCode: TCode) => void;
  removeCode: (codeId: TCode["id"]) => void;
}
export const useCodeStore = create<CodeStore>()(
  persist(
    (set) => ({
      codes: [],
      addCode: ({ newName, code, desc, categories }) => {
        const newCode: TCode = {
          id: crypto.randomUUID(),
          name: newName,
          code,
          desc,
          categories,
        };
        return set((store) => ({ codes: [...store.codes, newCode] }));
      },
      updateCode: (uCategory) =>
        set((store) => ({
          codes: store.codes.map((c) =>
            c.id !== uCategory.id
              ? c
              : {
                  ...c,
                  name: uCategory.name.length > 0 ? uCategory.name : c.name,
                  code: uCategory.code.length > 0 ? uCategory.code : c.code,
                  categories:
                    uCategory.categories.length > 0
                      ? uCategory.categories
                      : c.categories,
                },
          ),
        })),
      removeCode: (codeId) =>
        set((store) => ({
          codes: store.codes.filter((c) => c.id !== codeId),
        })),
    }),
    { name: "RCSCodes" },
  ),
);
