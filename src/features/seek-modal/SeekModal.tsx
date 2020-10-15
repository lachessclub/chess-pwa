import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import CreateSeekFormContainer from "./CreateSeekFormContainer";

export interface SeekModalProps {
  allowClose?: boolean;
  show?: boolean;
  onHide?(): void;
}

export const SeekModal: FC<SeekModalProps> = ({
  allowClose = true,
  show = false,
  onHide,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      animation={false}
      backdrop={allowClose ? true : "static"}
    >
      <Modal.Header closeButton={allowClose}>
        <Modal.Title>Create a game</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CreateSeekFormContainer />
      </Modal.Body>
    </Modal>
  );
};
