/* eslint-disable @typescript-eslint/ban-ts-comment */

import TestRenderer from "react-test-renderer";
import React from "react";
import { SingleGameContainer } from "../SingleGameContainer";
import * as api from "../../services/api";
import { SingleGame } from "../../components/SingleGame";

jest.useFakeTimers();

jest.mock("../../services/api");

describe("SingleGameContainer", () => {
  // @todo. need to fix GameContainer to work with components with async useEffect()
  // mountTest(GameContainer);

  describe("children components", () => {
    it("contains SingleGame", async () => {
      // @ts-ignore
      api.setMockGame({
        id: 1,
        initialFen: "startpos",
        wtime: 300000,
        btime: 300000,
        moves: "",
        status: "started",
        white: null,
        black: null,
      });
      // @ts-ignore
      api.setGetGameDelay(1000);

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGame).length).toBe(0);

      await TestRenderer.act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(testInstance.findAllByType(SingleGame).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGame", () => {
      it("game", async () => {
        // @ts-ignore
        api.setMockGame({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });
        // @ts-ignore
        api.setGetGameDelay(1000);
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

        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.game).toEqual({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(singleGame.props.game).toEqual({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4",
          status: "started",
          white: null,
          black: null,
        });
      });
    });
  });
});
