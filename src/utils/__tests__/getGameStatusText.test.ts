import getGameStatusText from "../getGameStatusText";
import {
  abortedGameSample,
  blackOutOfTimeGameSample,
  blackResignedGameSample,
  defaultGameSample,
  gameWithCheckmateByBlackSample,
  gameWithCheckmateByWhiteSample,
  gameWithDrawSample,
  gameWithStalemateSample,
  whiteOutOfTimeGameSample,
  whiteResignedGameSample,
} from "../../test-utils/data-sample/game";

it("getGameStatusText", () => {
  expect(getGameStatusText(defaultGameSample)).toBe("Playing right now");
  expect(getGameStatusText(whiteOutOfTimeGameSample)).toBe(
    "Time out • Black is victorious"
  );
  expect(getGameStatusText(blackOutOfTimeGameSample)).toBe(
    "Time out • White is victorious"
  );

  expect(getGameStatusText(blackResignedGameSample)).toBe(
    "Black resigned • White is victorious"
  );
  expect(getGameStatusText(whiteResignedGameSample)).toBe(
    "White resigned • Black is victorious"
  );

  expect(getGameStatusText(abortedGameSample)).toBe("Game aborted");

  expect(getGameStatusText(gameWithCheckmateByWhiteSample)).toBe(
    "Checkmate • White is victorious"
  );
  expect(getGameStatusText(gameWithCheckmateByBlackSample)).toBe(
    "Checkmate • Black is victorious"
  );

  expect(getGameStatusText(gameWithDrawSample)).toBe("Draw");

  expect(getGameStatusText(gameWithStalemateSample)).toBe("Stalemate");
});
