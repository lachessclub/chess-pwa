import { Seek } from "../../interfaces/Seek";

export default interface NormalizedSeekEntity
  extends Omit<Seek, "createdBy" | "game"> {
  createdBy: number | null;
  game: number | null;
}
