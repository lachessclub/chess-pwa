import User from "./User";

export interface ChatMessage {
  id: number;
  createdBy: User;
  game: number;
  text: string;
}
