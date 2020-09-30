import { useDispatch, useSelector } from "react-redux";
import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { stateWithDataSample } from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import { GameMetaContainer } from "../GameMetaContainer";
import { GameMeta } from "../GameMeta";

describe("GameMetaContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(GameMetaContainer, { id: 1 });

  describe("children components", () => {
    it("contains GameMeta", async () => {
      const testRenderer = TestRenderer.create(<GameMetaContainer id={2} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameMeta).length).toBe(0);

      testRenderer.update(<GameMetaContainer id={1} />);

      expect(testInstance.findAllByType(GameMeta).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameMeta", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(<GameMetaContainer id={1} />);
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameMeta);

        expect(gameMeta.props.game).toEqual({
          id: 1,
          aiLevel: 3,
          clockLimit: 300,
          clockIncrement: 3,
          createdAt: 0,
          drawOffer: null,
          initialFen: "startpos",
          turn: "white",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4 e7e5 g1f3 g8f6",
          status: "started",
          white: null,
          black: null,
          winner: null,
        });
      });
    });
  });
});
