import { fireEvent, render } from "@testing-library/react";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { ChallengeButtons } from "../ChallengeButtons";

describe("ChallengeButtons", () => {
  mountTest(ChallengeButtons);

  describe("Events", () => {
    it("onChallengeAI", () => {
      const onChallengeAi = jest.fn();

      const { getByTestId } = render(
        <ChallengeButtons onChallengeAi={onChallengeAi} />
      );

      fireEvent.click(getByTestId("challenge-ai-btn"));

      expect(onChallengeAi).toBeCalledTimes(1);
      expect(onChallengeAi).toBeCalledWith();
    });

    it("challenge ai click if no onChallengeAI callback", () => {
      const { getByTestId } = render(<ChallengeButtons />);

      expect(() => {
        fireEvent.click(getByTestId("challenge-ai-btn"));
      }).not.toThrow();
    });

    it("onCreateGame", () => {
      const onCreateGame = jest.fn();

      const { getByTestId } = render(
        <ChallengeButtons onCreateGame={onCreateGame} />
      );

      fireEvent.click(getByTestId("create-game-btn"));

      expect(onCreateGame).toBeCalledTimes(1);
      expect(onCreateGame).toBeCalledWith();
    });

    it("create game click if no onCreateGame callback", () => {
      const { getByTestId } = render(<ChallengeButtons />);

      expect(() => {
        fireEvent.click(getByTestId("create-game-btn"));
      }).not.toThrow();
    });
  });
});
