import { schema } from "normalizr";
import userSchema from "./userSchema";

const chatMessageSchema = new schema.Entity("chatMessages", {
  createdBy: userSchema,
});

export default chatMessageSchema;
