import React from "react";
import { render } from "@testing-library/react";
import { makeGameSample } from "../../../test-utils/data-sample/game";
import { GameControlPanelUserName } from "../GameControlPanelUserName";
import { userSample1 } from "../../../test-utils/data-sample/user";

describe("GameControlPanelUserName", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanelUserName />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const playerVsAiGameSample = makeGameSample({
        aiLevel: 3,
        white: userSample1,
        black: null,
      });

      const { container, rerender } = render(
        <GameControlPanelUserName game={playerVsAiGameSample} />
      );

      expect(container).toHaveTextContent("Thomas Miller");

      rerender(
        <GameControlPanelUserName game={playerVsAiGameSample} color="black" />
      );

      expect(container).toHaveTextContent("AI level 3");
    });
  });
});
