import { schema } from "normalizr";
import userSchema from "./userSchema";

const gameSchema = new schema.Entity("games", {
  white: userSchema,
  black: userSchema,
});

export default gameSchema;
