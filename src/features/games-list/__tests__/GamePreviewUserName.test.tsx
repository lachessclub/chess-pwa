import React from "react";
import { render } from "@testing-library/react";
import { makeGameSample } from "../../../test-utils/data-sample/game";
import { GamePreviewUserName } from "../GamePreviewUserName";
import { userSample1 } from "../../../test-utils/data-sample/user";

describe("GamePreviewUserName", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GamePreviewUserName />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const playerVsAiGameSample = makeGameSample({
        aiLevel: 3,
        white: userSample1,
        black: null,
      });

      const { container, rerender } = render(
        <GamePreviewUserName game={playerVsAiGameSample} />
      );

      expect(container).toHaveTextContent("Thomas Miller");

      rerender(
        <GamePreviewUserName game={playerVsAiGameSample} color="black" />
      );

      expect(container).toHaveTextContent("AI level 3");
    });
  });
});
