import getGameStatusText from "../getGameStatusText";
import { makeGameSample } from "../../test-utils/data-sample/game";

it("getGameStatusText", () => {
  const gameWithStartedStatus = makeGameSample({
    status: "started",
  });

  expect(getGameStatusText(gameWithStartedStatus)).toBe("Playing right now");

  const whiteOutOfTimeGameSample = makeGameSample({
    status: "outoftime",
    winner: "black",
  });
  expect(getGameStatusText(whiteOutOfTimeGameSample)).toBe(
    "Time out • Black is victorious"
  );

  const blackOutOfTimeGameSample = makeGameSample({
    status: "outoftime",
    winner: "white",
  });
  expect(getGameStatusText(blackOutOfTimeGameSample)).toBe(
    "Time out • White is victorious"
  );

  const invalidOutOfTimeGameSample = makeGameSample({
    status: "outoftime",
    winner: null,
  });
  expect(getGameStatusText(invalidOutOfTimeGameSample)).toBe(
    "Playing right now"
  );

  const blackResignedGameSample = makeGameSample({
    status: "resign",
    winner: "white",
  });
  expect(getGameStatusText(blackResignedGameSample)).toBe(
    "Black resigned • White is victorious"
  );

  const whiteResignedGameSample = makeGameSample({
    status: "resign",
    winner: "black",
  });
  expect(getGameStatusText(whiteResignedGameSample)).toBe(
    "White resigned • Black is victorious"
  );
  const invalidResignedGameSample = makeGameSample({
    status: "resign",
    winner: null,
  });
  expect(getGameStatusText(invalidResignedGameSample)).toBe(
    "Playing right now"
  );

  const abortedGameSample = makeGameSample({
    status: "aborted",
  });
  expect(getGameStatusText(abortedGameSample)).toBe("Game aborted");

  const gameWithCheckmateByWhiteSample = makeGameSample({
    status: "mate",
    winner: "white",
  });
  expect(getGameStatusText(gameWithCheckmateByWhiteSample)).toBe(
    "Checkmate • White is victorious"
  );

  const gameWithCheckmateByBlackSample = makeGameSample({
    status: "mate",
    winner: "black",
  });
  expect(getGameStatusText(gameWithCheckmateByBlackSample)).toBe(
    "Checkmate • Black is victorious"
  );

  const invalidCheckmateGameSample = makeGameSample({
    status: "mate",
    winner: null,
  });
  expect(getGameStatusText(invalidCheckmateGameSample)).toBe(
    "Playing right now"
  );

  const gameWithDrawSample = makeGameSample({
    status: "draw",
  });
  expect(getGameStatusText(gameWithDrawSample)).toBe("Draw");

  const gameWithStalemateSample = makeGameSample({
    status: "stalemate",
  });
  expect(getGameStatusText(gameWithStalemateSample)).toBe("Stalemate");
});
