import React from "react";
import { render } from "@testing-library/react";
import { makeGameSample } from "../../../test-utils/data-sample/game";
import getGameStatusText from "../../../utils/getGameStatusText";
import { GameControlPanelStatus } from "../GameControlPanelStatus";

jest.mock("../../../utils/getGameStatusText");

const whiteWinsGameSample = makeGameSample({
  status: "mate",
  winner: "white",
});

const blackWinsGameSample = makeGameSample({
  status: "mate",
  winner: "black",
});

const drawGameSample = makeGameSample({
  status: "draw",
  winner: null,
});

describe("GameControlPanelStatus", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanelStatus />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain status", () => {
      (getGameStatusText as jest.Mock).mockReturnValue("some status text");

      const { queryByTestId } = render(
        <GameControlPanelStatus game={whiteWinsGameSample} />
      );

      const gameStatus = queryByTestId("game-status");

      expect(gameStatus).toHaveTextContent("some status text");
    });

    it("should contain result", () => {
      const { queryByTestId, rerender } = render(
        <GameControlPanelStatus game={whiteWinsGameSample} />
      );

      const gameStatus = queryByTestId("game-result");

      expect(gameStatus).toHaveTextContent("1-0");

      rerender(<GameControlPanelStatus game={blackWinsGameSample} />);
      expect(gameStatus).toHaveTextContent("0-1");

      rerender(<GameControlPanelStatus game={drawGameSample} />);
      expect(gameStatus).toHaveTextContent("½-½");
    });
  });
});
