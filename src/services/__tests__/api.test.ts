/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import Game from "../../interfaces/Game";
import { getGame, getOngoingGames, makeMove, watchGames } from "../api";
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

const gameWithMove: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
};

describe("api service", () => {
  it("getGame() success", () => {
    (ioClient.socket.get as jest.Mock).mockImplementationOnce(
      (url: string, cb: RequestCallback) => {
        cb(games[0], {
          statusCode: 200,
        } as JWR);
      }
    );

    return expect(getGame(1)).resolves.toEqual(games[0]);
  });

  it("getGame() fail", () => {
    (ioClient.socket.get as jest.Mock).mockImplementationOnce(
      (url: string, cb: RequestCallback) => {
        cb("game not found", {
          body: "game not found",
          statusCode: 404,
        } as JWR);
      }
    );

    return expect(getGame(1)).rejects.toEqual({
      statusCode: 404,
      body: "game not found",
    });
  });

  it("getOngoingGames() success", () => {
    (ioClient.socket.get as jest.Mock).mockImplementationOnce(
      (url: string, cb: RequestCallback) => {
        cb(games, {
          body: games,
          statusCode: 200,
        } as JWR);
      }
    );

    return expect(getOngoingGames()).resolves.toEqual(games);
  });

  it("getOngoingGames() fail", () => {
    (ioClient.socket.get as jest.Mock).mockImplementationOnce(
      (url: string, cb: RequestCallback) => {
        cb("route not found", {
          body: "route not found",
          statusCode: 404,
        } as JWR);
      }
    );

    return expect(getOngoingGames()).rejects.toEqual({
      statusCode: 404,
      body: "route not found",
    });
  });

  it("watchGames()", () => {
    return new Promise((resolve) => {
      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            data: {
              id: 2,
              moves: "e2e4",
            },
            id: 2,
          });
        }
      );

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

  it("makeMove() success", () => {
    (ioClient.socket.post as jest.Mock).mockImplementationOnce(
      (url: string, data: any, cb: RequestCallback) => {
        cb(gameWithMove, {
          body: gameWithMove,
          statusCode: 200,
        } as JWR);
      }
    );

    return expect(makeMove(1, "e2e4")).resolves.toEqual(gameWithMove);
  });

  it("makeMove() fail", () => {
    (ioClient.socket.post as jest.Mock).mockImplementationOnce(
      (url: string, data: any, cb: RequestCallback) => {
        cb("game not found", {
          body: "game not found",
          statusCode: 404,
        } as JWR);
      }
    );
    return expect(makeMove(1, "e2e4")).rejects.toEqual({
      statusCode: 404,
      body: "game not found",
    });
  });
});
