import { TCategory } from "./Category";

export type TCode = {
  _id: string;
  name: string;
  code: string;
  desc: string;
  categories: TCategory["_id"][];
  ownerId: string;
};
