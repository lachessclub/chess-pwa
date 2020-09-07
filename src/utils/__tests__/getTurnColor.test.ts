import { Chess } from "chess.js";
import getTurnColor from "../getTurnColor";

it("getTurnColor", () => {
  expect(
    getTurnColor(
      new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    )
  ).toBe("white");

  expect(
    getTurnColor(
      new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1")
    )
  ).toBe("black");
});
