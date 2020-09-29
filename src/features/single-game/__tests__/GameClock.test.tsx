import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { GameClock } from "../GameClock";
import { defaultGameSample } from "../../../test-utils/data-sample/game";

jest.useFakeTimers();

describe("GameClock", () => {
  beforeEach(() => {
    (useEffect as jest.Mock).mockReset();
  });

  describe("DOM structure", () => {
    it("should display time", () => {
      const { rerender, getByTestId } = render(
        <GameClock time={defaultGameSample.wtime} />
      );

      expect(getByTestId("time").innerHTML).toBe("05 : 10");

      rerender(<GameClock time={defaultGameSample.btime} />);
      expect(getByTestId("time").innerHTML).toBe("06 : 05");
    });
  });
});
