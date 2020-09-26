import React, { FC, useCallback } from "react";

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
    <div>
      <button type="button" data-testid="accept-btn" onClick={handleAccept}>
        Accept
      </button>
      <button type="button" data-testid="decline-btn" onClick={handleDecline}>
        Decline
      </button>
    </div>
  );
};
