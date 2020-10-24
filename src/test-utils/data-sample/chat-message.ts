import { ChatMessage } from "../../interfaces/ChatMessage";
import { userSample1, userSample2 } from "./user";
import NormalizedChatMessageEntity from "../../normalizr/interfaces/NormalizedChatMessageEntity";

export const chatMessageSample1: ChatMessage = {
  id: 1,
  createdBy: userSample1,
  game: 1,
  text: "Good game!",
};

export const normalizedChatMessageSample1: NormalizedChatMessageEntity = {
  id: 1,
  createdBy: 1,
  game: 1,
  text: "Good game!",
};

export const chatMessageSample2: ChatMessage = {
  id: 2,
  createdBy: userSample2,
  game: 2,
  text: "Good game!",
};

export const normalizedChatMessageSample2: NormalizedChatMessageEntity = {
  id: 2,
  createdBy: 2,
  game: 2,
  text: "Good game!",
};

export const makeChatMessageSample = (
  data: Partial<ChatMessage>,
  originalChatMessageSample = chatMessageSample1
): ChatMessage => ({
  ...originalChatMessageSample,
  ...data,
});

export const makeNormalizedChatMessageSample = (
  data: Partial<NormalizedChatMessageEntity>,
  originalChatMessageSample = normalizedChatMessageSample1
): NormalizedChatMessageEntity => ({
  ...originalChatMessageSample,
  ...data,
});
