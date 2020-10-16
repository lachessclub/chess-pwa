import React from "react";
import { render } from "@testing-library/react";
import mountTest from "../../test-utils/mountTest";
import { ContentLoadingStatus } from "../ContentLoadingStatus";

describe("ContentLoadingStatus", () => {
  mountTest(ContentLoadingStatus);

  describe("DOM structure", () => {
    it("should contain message if content is empty", () => {
      const { queryByTestId, rerender } = render(<ContentLoadingStatus />);
      expect(queryByTestId("empty-content-message")).not.toBeInTheDocument();

      rerender(<ContentLoadingStatus isEmpty isLoading />);
      expect(queryByTestId("empty-content-message")).not.toBeInTheDocument();

      rerender(<ContentLoadingStatus isEmpty error="error text" />);
      expect(queryByTestId("empty-content-message")).not.toBeInTheDocument();

      rerender(<ContentLoadingStatus isEmpty />);
      expect(queryByTestId("empty-content-message")).toBeInTheDocument();
    });

    it("empty content message", () => {
      const { queryByTestId, rerender } = render(
        <ContentLoadingStatus isEmpty />
      );
      expect(queryByTestId("empty-content-message")).toHaveTextContent(
        "content is empty"
      );

      rerender(
        <ContentLoadingStatus isEmpty emptyContentMessage="error text" />
      );
      expect(queryByTestId("empty-content-message")).toHaveTextContent(
        "error text"
      );
    });

    it("should contain loading spinner if content is loading", () => {
      const { queryByTestId, rerender } = render(
        <ContentLoadingStatus isEmpty={false} isLoading />
      );
      expect(queryByTestId("loading-spinner")).not.toBeInTheDocument();

      rerender(<ContentLoadingStatus isEmpty isLoading={false} />);
      expect(queryByTestId("loading-spinner")).not.toBeInTheDocument();

      rerender(<ContentLoadingStatus isLoading isEmpty />);
      expect(queryByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("should contain error message if has error", () => {
      const { queryByTestId, rerender } = render(<ContentLoadingStatus />);
      expect(queryByTestId("error-message")).not.toBeInTheDocument();

      rerender(<ContentLoadingStatus error="error text" />);
      expect(queryByTestId("error-message")).toBeInTheDocument();
    });

    it("error message text", () => {
      const { queryByTestId, rerender } = render(
        <ContentLoadingStatus error="error text" />
      );
      expect(queryByTestId("error-message")).toHaveTextContent("error text");

      rerender(<ContentLoadingStatus error="another error" />);
      expect(queryByTestId("error-message")).toHaveTextContent("another error");
    });
  });
});
