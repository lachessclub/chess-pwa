/* eslint-disable @typescript-eslint/ban-ts-comment */

import TestRenderer from "react-test-renderer";
import React from "react";
import { OngoingGamesContainer } from "../OngoingGamesContainer";
import { GamePreviewsList } from "../../components/GamePreviewsList";
import Game from "../../interfaces/Game";
import mountTest from "../../tests/mountTest";
import { getOngoingGames, watchGames } from "../../services/api";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

// @todo. add tests about subscriptions. Warning: Can't perform a React state update on an unmounted component.
//  This is a no-op, but it indicates a memory leak in your application. To fix,
//  cancel all subscriptions and asynchronous tasks in a useEffect cleanup function

jest.useFakeTimers();

jest.mock("../../services/api");

const gamesBeforeChange: Game[] = [
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

const gamesAfterChange: Game[] = [
  {
    id: 1,
    initialFen: "startpos",
    wtime: 300000,
    btime: 300000,
    moves: "e2e4",
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

const gamesAfterCreatingNewOne: Game[] = [
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
  {
    id: 4,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 500000,
    btime: 500000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
];

describe("OngoingGamesContainer", () => {
  mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      describe("games", () => {
        it("get games by request and change game by subscription (with existing one)", async () => {
          (getOngoingGames as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(gamesBeforeChange);
              }, 1000);
            });
          });

          (watchGames as jest.Mock).mockImplementation(
            (cb: (data: SubscriptionData) => void) => {
              setTimeout(() => {
                cb({
                  verb: "updated",
                  data: {
                    id: 1,
                    moves: "e2e4",
                  },
                  previous: {
                    id: 1,
                    initialFen: "startpos",
                    wtime: 300000,
                    btime: 300000,
                    moves: "",
                    status: "started",
                    white: null,
                    black: null,
                  },
                  id: 1,
                });
              }, 2000);
            }
          );

          const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
          const testInstance = testRenderer.root;

          const gamePreviewsComponent = testInstance.findByType(
            GamePreviewsList
          );

          expect(gamePreviewsComponent.props.games).toEqual([]);

          await TestRenderer.act(async () => {
            jest.advanceTimersByTime(1000);
          });

          expect(gamePreviewsComponent.props.games).toEqual(gamesBeforeChange);

          await TestRenderer.act(async () => {
            jest.advanceTimersByTime(1000);
          });

          expect(gamePreviewsComponent.props.games).toEqual(gamesAfterChange);
        });

        it("get games by request and change game by subscription (with NOT existing one)", async () => {
          (getOngoingGames as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(gamesBeforeChange);
              }, 1000);
            });
          });

          (watchGames as jest.Mock).mockImplementation(
            (cb: (data: SubscriptionData) => void) => {
              setTimeout(() => {
                cb({
                  verb: "updated",
                  data: {
                    id: 4,
                    status: "started",
                  },
                  previous: {
                    id: 4,
                    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
                    wtime: 500000,
                    btime: 500000,
                    moves: "",
                    status: "resign",
                    white: null,
                    black: null,
                  },
                  id: 4,
                });
              }, 2000);
            }
          );

          const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
          const testInstance = testRenderer.root;

          const gamePreviewsComponent = testInstance.findByType(
            GamePreviewsList
          );

          expect(gamePreviewsComponent.props.games).toEqual([]);

          await TestRenderer.act(async () => {
            jest.advanceTimersByTime(1000);
          });

          expect(gamePreviewsComponent.props.games).toEqual(gamesBeforeChange);

          await TestRenderer.act(async () => {
            jest.advanceTimersByTime(1000);
          });

          expect(gamePreviewsComponent.props.games).toEqual(
            gamesAfterCreatingNewOne
          );
        });

        it("get games by request and add game by subscription", async () => {
          (getOngoingGames as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(gamesBeforeChange);
              }, 1000);
            });
          });

          (watchGames as jest.Mock).mockImplementation(
            (cb: (data: SubscriptionData) => void) => {
              setTimeout(() => {
                cb({
                  verb: "created",
                  data: {
                    id: 4,
                    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
                    wtime: 500000,
                    btime: 500000,
                    moves: "",
                    status: "started",
                    white: null,
                    black: null,
                  },
                  id: 1,
                });
              }, 2000);
            }
          );

          const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
          const testInstance = testRenderer.root;

          const gamePreviewsComponent = testInstance.findByType(
            GamePreviewsList
          );

          expect(gamePreviewsComponent.props.games).toEqual([]);

          await TestRenderer.act(async () => {
            jest.advanceTimersByTime(1000);
          });

          expect(gamePreviewsComponent.props.games).toEqual(gamesBeforeChange);

          await TestRenderer.act(async () => {
            jest.advanceTimersByTime(1000);
          });

          expect(gamePreviewsComponent.props.games).toEqual(
            gamesAfterCreatingNewOne
          );
        });
      });
    });
  });
});
