import makeChessInstance from "../makeChessInstance";
import {
  defaultGameSample,
  gameSampleFen,
  gameWithIncorrectMoveSample,
  gameWithMovesRewoundToIndex2SampleFen,
  gameWithMovesSample,
  gameWithMovesSampleFen,
} from "../../test-utils/data-sample/game";

describe("makeChessInstance", () => {
  it("startpos with empty moves prop", () => {
    expect(makeChessInstance(defaultGameSample).fen()).toBe(gameSampleFen);
  });

  it("not empty moves", () => {
    expect(makeChessInstance(gameWithMovesSample).fen()).toBe(
      gameWithMovesSampleFen
    );
  });

  it("not empty moves and rewindToMoveIndex", () => {
    expect(makeChessInstance(gameWithMovesSample, 2).fen()).toBe(
      gameWithMovesRewoundToIndex2SampleFen
    );
  });

  it("throws error if move is incorrect", () => {
    expect(() => makeChessInstance(gameWithIncorrectMoveSample)).toThrow(
      `incorrect move: e2e4`
    );
  });
});
