import React from "react";
import { render } from "@testing-library/react";
import { gameSample2 } from "../../../test-utils/data-sample/game";
import { GameControlPanelUserName } from "../GameControlPanelUserName";

describe("GameControlPanelUserName", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanelUserName />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player names", () => {
      const { container, rerender } = render(
        <GameControlPanelUserName game={gameSample2} />
      );

      expect(container.innerHTML).toContain("AI level 3");

      rerender(<GameControlPanelUserName game={gameSample2} color="black" />);

      expect(container.innerHTML).toContain("Thomas Miller");
    });
  });
});
