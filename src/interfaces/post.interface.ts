import { Schema } from "mongoose";

export interface PostType {
  content: string;
  userId: string;
  companyId: string;
  likes?: string;
}
