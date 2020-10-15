import { schema } from "normalizr";
import userSchema from "./userSchema";
import gameSchema from "./gameSchema";

const seekSchema = new schema.Entity("seeks", {
  createdBy: userSchema,
  game: gameSchema,
});

export default seekSchema;
