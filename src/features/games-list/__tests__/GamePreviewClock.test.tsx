import React from "react";
import { render } from "@testing-library/react";
import { GamePreviewClock } from "../GamePreviewClock";

describe("GamePreviewClock", () => {
  describe("DOM structure", () => {
    it("should contain clock", () => {
      const { getByTestId, rerender } = render(<GamePreviewClock />);

      expect(getByTestId("time")).toHaveTextContent("00:00");

      rerender(<GamePreviewClock time={365000} />);

      expect(getByTestId("time")).toHaveTextContent("06:05");
    });

    it("should contain clockRun class", () => {
      const { getByTestId, rerender } = render(<GamePreviewClock />);

      expect(getByTestId("time")).not.toHaveClass("clockRun");

      rerender(<GamePreviewClock time={365000} isRunning />);

      expect(getByTestId("time")).toHaveClass("clockRun");
    });
  });
});
