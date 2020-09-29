import { render } from "@testing-library/react";
import React from "react";
import { GameClock } from "../GameClock";
import { defaultGameSample } from "../../../test-utils/data-sample/game";

describe("GameClock", () => {
  describe("DOM structure", () => {
    it("should display time", () => {
      const { rerender, getByTestId } = render(
        <GameClock time={defaultGameSample.wtime} />
      );

      expect(getByTestId("time")).toHaveTextContent("05 : 10");

      rerender(<GameClock time={defaultGameSample.btime} />);
      expect(getByTestId("time")).toHaveTextContent("06 : 05");
    });
  });
});
