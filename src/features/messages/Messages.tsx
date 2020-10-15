/* eslint-disable react/no-array-index-key */

import React, { FC, useCallback } from "react";
import { Toast } from "react-bootstrap";
import { Message } from "../../interfaces/Message";
import css from "./Messages.module.scss";

export interface MessagesProps {
  items?: Message[];
  onHideMessage?(messageId: string): void;
}

export const Messages: FC<MessagesProps> = ({ items = [], onHideMessage }) => {
  const makeHideMessageHandler = useCallback(
    (messageId: string) => () => {
      if (onHideMessage) {
        onHideMessage(messageId);
      }
    },
    [onHideMessage]
  );

  return (
    <div className={css.messages}>
      {items.map((item, index) => (
        <Toast
          key={index}
          onClose={makeHideMessageHandler(item.id)}
          show
          delay={3000}
          autohide
          animation={false}
        >
          <Toast.Body>{item.body}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};
