/* eslint-disable @typescript-eslint/ban-ts-comment */

import TestRenderer from "react-test-renderer";
import React from "react";
import { OngoingGamesContainer } from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import Game from "../../interfaces/Game";
import * as api from "../../services/api";

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
  // @todo. need to fix mountTest to work with components with async useEffect()
  // mountTest(OngoingGamesContainer);

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
          // @ts-ignore
          api.setMockOngoingGames(gamesBeforeChange);
          // @ts-ignore
          api.setGetOngoingGamesDelay(1000);
          // @ts-ignore
          api.setMockSubscriptionData({
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
          // @ts-ignore
          api.setWatchDelay(2000);

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
          // @ts-ignore
          api.setMockOngoingGames(gamesBeforeChange);
          // @ts-ignore
          api.setGetOngoingGamesDelay(1000);
          // @ts-ignore
          api.setMockSubscriptionData({
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
          // @ts-ignore
          api.setWatchDelay(2000);

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
          // @ts-ignore
          api.setMockOngoingGames(gamesBeforeChange);
          // @ts-ignore
          api.setGetOngoingGamesDelay(1000);
          // @ts-ignore
          api.setMockSubscriptionData({
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
          // @ts-ignore
          api.setWatchDelay(2000);

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
