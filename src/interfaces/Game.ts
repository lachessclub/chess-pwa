import GameStatus from "../types/GameStatus";
import User from "./User";

export default interface Game {
  id: number;
  initialFen: string;
  wtime: number;
  btime: number;
  moves: string;
  status: GameStatus;
  white: User | null;
  black: User | null;
}
