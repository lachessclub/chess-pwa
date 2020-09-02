/* eslint-disable @typescript-eslint/no-explicit-any */

import Game from "../../interfaces/Game";
import { getOngoingGames, watchGames } from "../api";
import { SubscriptionData } from "../../interfaces/SubscriptionData";
import ioClient from "../ioClient";

jest.mock("../ioClient");

const games: Game[] = [
  {
    id: 1,
    initialFen: "startpos",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 2,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 3,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
];

describe("api service", () => {
  it("getOngoingGames()", () => {
    (ioClient as any).setMockResponse(games);
    return expect(getOngoingGames()).resolves.toEqual(games);
  });

  it("watchGames()", () => {
    return new Promise((resolve) => {
      (ioClient as any).setMockResponse({
        verb: "updated",
        data: {
          id: 2,
          moves: "e2e4",
        },
        id: 2,
      });

      watchGames((data: SubscriptionData) => {
        expect(data).toEqual({
          verb: "updated",
          data: {
            id: 2,
            moves: "e2e4",
          },
          id: 2,
        });
        resolve();
      });
    });
  });
});
