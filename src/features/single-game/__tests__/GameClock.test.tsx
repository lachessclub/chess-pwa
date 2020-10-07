import { render } from "@testing-library/react";
import React from "react";
import { GameClock } from "../GameClock";
import { GamePreviewClock } from "../../games-list/GamePreviewClock";

describe("GameClock", () => {
  describe("DOM structure", () => {
    it("should display time", () => {
      const { rerender, getByTestId } = render(<GameClock />);

      expect(getByTestId("time")).toHaveTextContent("00:00");

      rerender(<GameClock time={310000} />);
      expect(getByTestId("time")).toHaveTextContent("05:10");

      rerender(<GameClock time={365000} />);
      expect(getByTestId("time")).toHaveTextContent("06:05");
    });

    it("should contain clockRun class", () => {
      const { getByTestId, rerender } = render(<GamePreviewClock />);

      expect(getByTestId("time")).not.toHaveClass("clockRun");

      rerender(<GameClock time={365000} isRunning />);

      expect(getByTestId("time")).toHaveClass("clockRun");
    });
  });
});
