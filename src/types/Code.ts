import { TCategory } from "./Category";

export type TCode = {
  id: string;
  name: string;
  code: string;
  desc: string;
  categories: TCategory["id"][];
};
