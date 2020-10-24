import { useDispatch, useSelector } from "react-redux";
import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { makeStateSample } from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import { GameMetaContainer } from "../GameMetaContainer";
import { GameMeta } from "../GameMeta";
import {
  gameSample1,
  normalizedGameSample1,
} from "../../../test-utils/data-sample/game";

const stateWithGameSample = makeStateSample({
  entities: {
    users: {},
    games: {
      1: normalizedGameSample1,
    },
    seeks: {},
    chatMessages: {},
  },
});

describe("GameMetaContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithGameSample)
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

        expect(gameMeta.props.game).toEqual(gameSample1);
      });
    });
  });
});
