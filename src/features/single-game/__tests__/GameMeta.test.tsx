import React from "react";
import { render } from "@testing-library/react";
import { GameMeta } from "../GameMeta";
import {
  defaultGameSample,
  gameSample2,
  gameSample3,
  gameWith10Plus5MinControlSample,
} from "../../../test-utils/data-sample/game";
import getGameStatusText from "../../../utils/getGameStatusText";

jest.mock("../../../utils/getGameStatusText");

describe("GameMeta", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMeta />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain status", () => {
      (getGameStatusText as jest.Mock).mockReturnValue("some status text");

      const { queryByTestId } = render(<GameMeta game={defaultGameSample} />);

      const gameStatus = queryByTestId("game-status");

      expect(gameStatus).toHaveTextContent("some status text");
    });

    it("should contain players names", () => {
      const { getByTestId, rerender } = render(<GameMeta game={gameSample2} />);

      expect(getByTestId("white-user")).toHaveTextContent("AI level 3");
      expect(getByTestId("black-user")).toHaveTextContent("Thomas Miller");

      rerender(<GameMeta game={gameSample3} />);

      expect(getByTestId("white-user")).toHaveTextContent("Thomas Miller");
      expect(getByTestId("black-user")).toHaveTextContent("AI level 3");
    });

    it("should contain time control", () => {
      const { queryByTestId, rerender } = render(
        <GameMeta game={defaultGameSample} />
      );

      const timeControl = queryByTestId("time-control");

      expect(timeControl).toHaveTextContent("5 + 3");

      rerender(<GameMeta game={gameWith10Plus5MinControlSample} />);

      expect(timeControl).toHaveTextContent("10 + 5");
    });
  });
});
