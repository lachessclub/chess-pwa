import makeChessInstance from "../makeChessInstance";
import {
  gameSample1,
  gameSample1Fen,
  makeGameSample,
} from "../../test-utils/data-sample/game";

describe("makeChessInstance", () => {
  it("startpos with empty moves prop", () => {
    expect(makeChessInstance(gameSample1).fen()).toBe(gameSample1Fen);
  });

  it("not empty moves", () => {
    const gameWithMovesSample = makeGameSample({
      initialFen: "startpos",
      moves: "e2e4 e7e5 g1f3 g8f6",
    });
    const gameWithMovesSampleFen =
      "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3";

    expect(makeChessInstance(gameWithMovesSample).fen()).toBe(
      gameWithMovesSampleFen
    );
  });

  it("not empty moves and rewindToMoveIndex", () => {
    const gameWithMovesSample = makeGameSample({
      initialFen: "startpos",
      moves: "e2e4 e7e5 g1f3 g8f6",
    });
    const gameWithMovesRewoundToIndex3SampleFen =
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";

    expect(makeChessInstance(gameWithMovesSample, 3).fen()).toBe(
      gameWithMovesRewoundToIndex3SampleFen
    );
  });

  it("throws error if move is incorrect", () => {
    const gameWithIncorrectMoveSample = makeGameSample({
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1",
      moves: "e2e4 e7e5", // e2e4 is incorrect
    });

    expect(() => makeChessInstance(gameWithIncorrectMoveSample)).toThrow(
      `incorrect move: e2e4`
    );
  });
});
