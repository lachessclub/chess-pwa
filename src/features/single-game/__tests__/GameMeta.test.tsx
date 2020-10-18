import React from "react";
import { render } from "@testing-library/react";
import { GameMeta } from "../GameMeta";
import {
  gameSample1,
  makeGameSample,
} from "../../../test-utils/data-sample/game";
import getGameStatusText from "../../../utils/getGameStatusText";
import { userSample1 } from "../../../test-utils/data-sample/user";

jest.mock("../../../utils/getGameStatusText");

describe("GameMeta", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMeta />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain status", () => {
      (getGameStatusText as jest.Mock).mockReturnValue("some status text");

      const { queryByTestId } = render(<GameMeta game={gameSample1} />);

      const gameStatus = queryByTestId("game-status");

      expect(gameStatus).toHaveTextContent("some status text");
    });

    it("should contain players names", () => {
      const aiVsPlayerGameSample = makeGameSample({
        white: null,
        black: userSample1,
      });

      const { getByTestId, rerender } = render(
        <GameMeta game={aiVsPlayerGameSample} />
      );

      expect(getByTestId("white-user")).toHaveTextContent("AI level 3");
      expect(getByTestId("black-user")).toHaveTextContent("Thomas Miller");

      const playerVsAiGameSample = makeGameSample({
        white: userSample1,
        black: null,
      });

      rerender(<GameMeta game={playerVsAiGameSample} />);

      expect(getByTestId("white-user")).toHaveTextContent("Thomas Miller");
      expect(getByTestId("black-user")).toHaveTextContent("AI level 3");
    });

    it("should contain time control", () => {
      const gameWith5Plus3ControlSample = makeGameSample({
        clockIncrement: 3,
        clockLimit: 300,
      });

      const { queryByTestId, rerender } = render(
        <GameMeta game={gameWith5Plus3ControlSample} />
      );

      const timeControl = queryByTestId("time-control");

      expect(timeControl).toHaveTextContent("5 + 3");

      const gameWith10Plus5ControlSample = makeGameSample({
        clockIncrement: 5,
        clockLimit: 600,
      });

      rerender(<GameMeta game={gameWith10Plus5ControlSample} />);

      expect(timeControl).toHaveTextContent("10 + 5");
    });
  });
});
