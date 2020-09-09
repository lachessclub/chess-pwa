/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import Game from "../../interfaces/Game";
import {
  getCurrentUser,
  getGame,
  getOngoingGames,
  login,
  makeMove,
  register,
  watchGames,
} from "../api";
import { SubscriptionData } from "../../interfaces/SubscriptionData";
import ioClient from "../ioClient";
import User from "../../interfaces/User";

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
  describe("getGame()", () => {
    it("success", () => {
      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(games[0], {
            statusCode: 200,
          } as JWR);
        }
      );

      return expect(getGame(1)).resolves.toEqual(games[0]);
    });

    it("fail", () => {
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
  });

  describe("getOngoingGames()", () => {
    it("success", () => {
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

    it("fail", () => {
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

  describe("makeMove()", () => {
    it("success", () => {
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

    it("fail", () => {
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

  describe("getCurrentUser()", () => {
    it("success. User is authenticated", () => {
      const user: User = {
        id: 1,
        fullName: "Christopher Garcia",
      };

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(user, {
            body: user,
            statusCode: 200,
          } as JWR);
        }
      );
      return expect(getCurrentUser()).resolves.toEqual(user);
    });

    it("success. User is NOT authenticated", () => {
      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("Not authenticated", {
            body: "Not authenticated",
            statusCode: 401,
          } as JWR);
        }
      );
      return expect(getCurrentUser()).resolves.toEqual(null);
    });

    it("fail", () => {
      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("Not founf", {
            body: "Not fount",
            statusCode: 404,
          } as JWR);
        }
      );
      return expect(getCurrentUser()).rejects.toEqual({
        body: "Not fount",
        statusCode: 404,
      });
    });
  });

  describe("login()", () => {
    it("success", () => {
      const user: User = {
        id: 1,
        fullName: "Christopher Garcia",
      };

      (ioClient.socket.put as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(user, {
            body: user,
            statusCode: 200,
          } as JWR);
        }
      );
      return expect(
        login({
          email: "test@test.com",
          password: "123",
        })
      ).resolves.toEqual(user);
    });

    it("fail", () => {
      (ioClient.socket.put as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("Not authenticated", {
            body: "Not authenticated",
            statusCode: 401,
          } as JWR);
        }
      );
      return expect(
        login({
          email: "test@test.com",
          password: "123",
        })
      ).rejects.toEqual({
        body: "Not authenticated",
        statusCode: 401,
      });
    });
  });

  describe("register()", () => {
    it("success", () => {
      const user: User = {
        id: 1,
        fullName: "Christopher Garcia",
      };

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(user, {
            body: user,
            statusCode: 200,
          } as JWR);
        }
      );
      return expect(
        register({
          fullName: "Christopher Garcia",
          email: "test@test.com",
          password: "123",
        })
      ).resolves.toEqual(user);
    });

    it("fail", () => {
      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("User already exists", {
            body: "User already exists",
            statusCode: 409,
          } as JWR);
        }
      );
      return expect(
        register({
          fullName: "John Smith",
          email: "test@test.com",
          password: "123",
        })
      ).rejects.toEqual({
        body: "User already exists",
        statusCode: 409,
      });
    });
  });
});
