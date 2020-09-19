import makeChessInstance from "../makeChessInstance";
import {
  gameSample,
  gameSampleFen,
  gameWithIncorrectMoveSample,
  gameWithMovesSample,
  gameWithMovesSampleFen,
} from "../../test-utils/data-sample/game";

describe("makeChessInstance", () => {
  it("startpos with empty moves prop", () => {
    expect(makeChessInstance(gameSample).fen()).toBe(gameSampleFen);
  });

  it("not empty moves", () => {
    expect(makeChessInstance(gameWithMovesSample).fen()).toBe(
      gameWithMovesSampleFen
    );
  });

  it("throws error if move is incorrect", () => {
    expect(() => makeChessInstance(gameWithIncorrectMoveSample)).toThrow(
      `incorrect move: e2e4`
    );
  });
});
