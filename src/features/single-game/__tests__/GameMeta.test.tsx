import React from "react";
import { render } from "@testing-library/react";
import { GameMeta } from "../GameMeta";
import {
  gameSample,
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
      expect(container).toBeEmpty();
    });

    it("should contain status", () => {
      (getGameStatusText as jest.Mock).mockReturnValue("some status text");

      const { queryByText } = render(<GameMeta game={gameSample} />);

      expect(queryByText("some status text")).not.toBeNull();
    });

    it("should contain players names", () => {
      const { getByTestId, rerender } = render(<GameMeta game={gameSample2} />);

      expect(getByTestId("white-user").innerHTML).toContain("AI level 3");
      expect(getByTestId("black-user").innerHTML).toContain("Thomas Miller");

      rerender(<GameMeta game={gameSample3} />);

      expect(getByTestId("white-user").innerHTML).toContain("Thomas Miller");
      expect(getByTestId("black-user").innerHTML).toContain("AI level 3");
    });

    it("should contain time control", () => {
      const { queryByText, rerender } = render(<GameMeta game={gameSample} />);

      expect(queryByText("5 + 3")).not.toBeNull();

      rerender(<GameMeta game={gameWith10Plus5MinControlSample} />);

      expect(queryByText("10 + 5")).not.toBeNull();
    });
  });
});
