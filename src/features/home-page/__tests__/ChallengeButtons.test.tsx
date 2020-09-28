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
  });
});
