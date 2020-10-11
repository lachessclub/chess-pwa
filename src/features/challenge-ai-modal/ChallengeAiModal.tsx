import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import ChallengeAiFormContainer from "./ChallengeAiFormContainer";

export interface ChallengeAiModalProps {
  show?: boolean;
  onHide?(): void;
}

export const ChallengeAiModal: FC<ChallengeAiModalProps> = ({
  show = false,
  onHide,
}) => {
  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Play with the computer</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ChallengeAiFormContainer />
      </Modal.Body>
    </Modal>
  );
};
