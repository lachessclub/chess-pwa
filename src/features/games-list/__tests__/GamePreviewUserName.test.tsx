import React from "react";
import { render } from "@testing-library/react";
import { gameSample2 } from "../../../test-utils/data-sample/game";
import { GamePreviewUserName } from "../GamePreviewUserName";

describe("GamePreviewUserName", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GamePreviewUserName />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const { container, rerender } = render(
        <GamePreviewUserName game={gameSample2} />
      );

      expect(container.innerHTML).toContain("AI level 3");

      rerender(<GamePreviewUserName game={gameSample2} color="black" />);

      expect(container.innerHTML).toContain("Thomas Miller");
    });
  });
});
