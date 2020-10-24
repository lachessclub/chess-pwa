import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { ChatMessagesListContainer } from "./ChatMessagesListContainer";
import { PostChatMessageFormContainer } from "./PostChatMessageFormContainer";

export interface ChatProps {
  gameId: number;
}

export const Chat: FC<ChatProps> = ({ gameId }) => {
  return (
    <Card>
      <Card.Header className="p-2">Chat room</Card.Header>
      <Card.Body className="p-2">
        <ChatMessagesListContainer gameId={gameId} />
      </Card.Body>
      <Card.Footer className="p-2">
        <PostChatMessageFormContainer gameId={gameId} />
      </Card.Footer>
    </Card>
  );
};
