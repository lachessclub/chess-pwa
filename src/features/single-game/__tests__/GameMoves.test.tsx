import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { GameMoves } from "../GameMoves";
import { gameWithMovesSample } from "../../../test-utils/data-sample/game";

describe("GameMoves", () => {
  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameMoves />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain moves", () => {
      const { getByTestId } = render(<GameMoves game={gameWithMovesSample} />);

      expect(getByTestId("move-0")).toContainHTML("e2e4");
      expect(getByTestId("move-1")).toContainHTML("e7e5");
    });

    it("should contain selected class", () => {
      const { getByTestId } = render(
        <GameMoves game={gameWithMovesSample} rewindToMoveIndex={0} />
      );

      expect(getByTestId("move-0")).toHaveClass("selected");
    });
  });

  describe("Events", () => {
    it("onRewindToMove", () => {
      const onRewindToMove = jest.fn();

      const { getByTestId } = render(
        <GameMoves game={gameWithMovesSample} onRewindToMove={onRewindToMove} />
      );

      fireEvent.click(getByTestId("move-0"));

      expect(onRewindToMove).toBeCalledTimes(1);
      expect(onRewindToMove).toBeCalledWith(0);
    });
  });
});
