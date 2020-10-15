import React, { FC, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import css from "./DrawOfferDialog.module.scss";

export interface DrawOfferDialogProps {
  onAccept?(): void;
  onDecline?(): void;
}

export const DrawOfferDialog: FC<DrawOfferDialogProps> = ({
  onAccept,
  onDecline,
}) => {
  const handleAccept = useCallback(() => {
    if (onAccept) {
      onAccept();
    }
  }, [onAccept]);

  const handleDecline = useCallback(() => {
    if (onDecline) {
      onDecline();
    }
  }, [onDecline]);

  return (
    <div className={css.dialogWrapper}>
      <Button
        type="button"
        variant="link"
        data-testid="accept-btn"
        onClick={handleAccept}
        className={css.acceptBtn}
      >
        <FontAwesomeIcon icon={faCheck} />
        <span className="sr-only">Accept</span>
      </Button>

      <Button
        type="button"
        variant="link"
        data-testid="decline-btn"
        onClick={handleDecline}
        className={css.declineBtn}
      >
        <FontAwesomeIcon icon={faTimes} />
        <span className="sr-only">Decline</span>
      </Button>
      <div className={css.dialogText}>Your opponent offers a draw</div>
    </div>
  );
};
