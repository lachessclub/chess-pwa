import React, { FC } from "react";
import { Spinner } from "react-bootstrap";

export interface ContentLoadingStatusProps {
  emptyContentMessage?: string;
  isEmpty?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const defaultEmptyContentMessage = "content is empty";

export const ContentLoadingStatus: FC<ContentLoadingStatusProps> = ({
  emptyContentMessage = defaultEmptyContentMessage,
  isEmpty = false,
  isLoading = false,
  error = null,
}) => {
  if (isEmpty && !isLoading && !error) {
    return (
      <div
        className="alert alert-warning text-center"
        role="alert"
        data-testid="empty-content-message"
      >
        {emptyContentMessage}
      </div>
    );
  }

  if (isLoading && isEmpty) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" data-testid="loading-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="alert alert-danger text-center"
        role="alert"
        data-testid="error-message"
      >
        {error}
      </div>
    );
  }

  return null;
};
