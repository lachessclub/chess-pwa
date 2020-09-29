import React from "react";
import { render } from "@testing-library/react";
import { makeGameSample } from "../../../test-utils/data-sample/game";
import { GamePreviewResult } from "../GamePreviewResult";

describe("GamePreviewResult", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GamePreviewResult />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain result", () => {
      const gameSample = makeGameSample({
        winner: "black",
        status: "mate",
      });

      const { container, rerender } = render(
        <GamePreviewResult game={gameSample} />
      );

      expect(container).toHaveTextContent("0");

      rerender(<GamePreviewResult game={gameSample} color="black" />);

      expect(container).toHaveTextContent("1");

      const drawGameSample = makeGameSample({
        winner: null,
        status: "draw",
      });

      rerender(<GamePreviewResult game={drawGameSample} />);

      expect(container).toHaveTextContent("½");

      rerender(<GamePreviewResult game={drawGameSample} color="black" />);

      expect(container).toHaveTextContent("½");
    });
  });
});
