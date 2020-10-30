import { makeGameSample } from "../../test-utils/data-sample/game";
import { getMovesQnt, isPromotionMove } from "../chess";

it("isPromotionMove()", () => {
  const prePromotionGameSample = makeGameSample({
    initialFen: "k7/4P3/8/8/8/8/8/K7 w KQkq - 0 1",
  });

  expect(
    isPromotionMove(prePromotionGameSample, {
      from: "e7",
      to: "e8",
    })
  ).toBeTruthy(); // 1. e7-e8

  expect(
    isPromotionMove(prePromotionGameSample, {
      from: "a1",
      to: "a2",
    })
  ).toBeFalsy(); // 1. ka1-a2

  expect(
    isPromotionMove(prePromotionGameSample, {
      from: "e2",
      to: "e4",
    })
  ).toBeFalsy(); // 1. e2 e4 - invalid move
});

it("getMovesQnt()", () => {
  expect(
    getMovesQnt(
      makeGameSample({
        moves: "",
      })
    )
  ).toBe(0);

  expect(
    getMovesQnt(
      makeGameSample({
        moves: "e2e4",
      })
    )
  ).toBe(1);

  expect(
    getMovesQnt(
      makeGameSample({
        moves: "e2e4 e7e5",
      })
    )
  ).toBe(2);
});
