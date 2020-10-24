import { ChatMessage } from "../../interfaces/ChatMessage";

export default interface NormalizedChatMessageEntity
  extends Omit<ChatMessage, "createdBy"> {
  createdBy: number | null;
}
