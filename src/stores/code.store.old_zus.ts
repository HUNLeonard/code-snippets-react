// import { create } from "zustand";
// import { TCode } from "../types/Code";
// import { persist } from "zustand/middleware";

// interface AddCodeProps {
//   newName: string;
//   code: string;
//   categories: TCode["_id"][];
//   desc: TCode["desc"];
//   ownerId: string;
// }

// interface CodeStore {
//   codes: TCode[];
//   addCode: ({ newName, code, categories }: AddCodeProps) => void;
//   updateCode: (uCode: TCode) => void;
//   removeCode: (codeId: TCode["_id"]) => void;
// }
// export const useCodeStore = create<CodeStore>()(
//   persist(
//     (set) => ({
//       codes: [],
//       addCode: ({
//         newName,
//         code,
//         desc,
//         categories,
//         ownerId = crypto.randomUUID(),
//       }) => {
//         const newCode: TCode = {
//           _id: crypto.randomUUID(),
//           name: newName,
//           code,
//           desc,
//           categories,
//           ownerId,
//         };
//         return set((store) => ({ codes: [...store.codes, newCode] }));
//       },
//       updateCode: (uCategory) =>
//         set((store) => ({
//           codes: store.codes.map((c) =>
//             c._id !== uCategory._id
//               ? c
//               : {
//                   ...c,
//                   name: uCategory.name.length > 0 ? uCategory.name : c.name,
//                   code: uCategory.code.length > 0 ? uCategory.code : c.code,
//                   categories:
//                     uCategory.categories.length > 0
//                       ? uCategory.categories
//                       : c.categories,
//                 },
//           ),
//         })),
//       removeCode: (codeId) =>
//         set((store) => ({
//           codes: store.codes.filter((c) => c._id !== codeId),
//         })),
//     }),
//     { name: "RCSCodes" },
//   ),
// );
