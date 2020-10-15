import { PieceColor } from "../types/PieceColor";
import User from "./User";
import Game from "./Game";

export interface Seek {
  id: number;
  color: PieceColor | "random";
  clockLimit: number;
  createdAt: number;
  clockIncrement: number;
  createdBy: User;
  game: Game | null;
}
