import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import LoginTabsContainer from "./LoginTabsContainer";

export interface AuthModalProps {
  show?: boolean;
  onHide?(): void;
}

export const AuthModal: FC<AuthModalProps> = ({ show = false, onHide }) => {
  return (
    <div>
      <Modal show={show} onHide={onHide} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginTabsContainer />
        </Modal.Body>
      </Modal>
    </div>
  );
};
