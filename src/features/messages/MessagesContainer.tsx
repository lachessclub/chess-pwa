import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "./Messages";
import { RootState } from "../../app/rootReducer";
import { hideMessage } from "./messagesSlice";

const MessagesContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state: RootState) => state.messages);

  const handleHideMessage = useCallback(
    (messageId: string) => {
      dispatch(hideMessage(messageId));
    },
    [dispatch]
  );

  return <Messages items={messages} onHideMessage={handleHideMessage} />;
};

export default MessagesContainer;
