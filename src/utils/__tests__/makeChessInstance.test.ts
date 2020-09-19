import Game from "../../interfaces/Game";
import makeChessInstance from "../makeChessInstance";

describe("makeChessInstance", () => {
  it("startpos", () => {
    const game: Game = {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    };

    expect(makeChessInstance(game).fen()).toBe(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });

  it("empty moves prop", () => {
    const fen = "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1";

    const game: Game = {
      id: 1,
      initialFen: fen,
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    };

    expect(makeChessInstance(game).fen()).toBe(fen);
  });

  it("not empty moves", () => {
    const game: Game = {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "e2e4 e7e5",
      status: "started",
      white: null,
      black: null,
    };

    expect(makeChessInstance(game).fen()).toBe(
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2"
    );
  });

  it("throws error if move is incorrect", () => {
    const game: Game = {
      id: 1,
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1",
      wtime: 300000,
      btime: 300000,
      moves: "e2e4 e7e5", // e2e4 is incorrect
      status: "started",
      white: null,
      black: null,
    };

    expect(() => makeChessInstance(game)).toThrow(`incorrect move: e2e4`);
  });
});
