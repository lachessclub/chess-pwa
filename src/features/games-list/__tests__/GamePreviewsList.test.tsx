import React from "react";
import TestRenderer from "react-test-renderer";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  gameWithMovesSample,
  defaultGameSample,
} from "../../../test-utils/data-sample/game";
import Game from "../../../interfaces/Game";
import { GamePreviewsListItem } from "../GamePreviewsListItem";

const gamesList: Game[] = [defaultGameSample, gameWithMovesSample];

describe("GamePreviewsList", () => {
  mountTest(GamePreviewsList);

  describe("children components", () => {
    it("contains GamePreviewsList", () => {
      const testRenderer = TestRenderer.create(<GamePreviewsList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsListItem).length).toBe(0);

      testRenderer.update(<GamePreviewsList games={gamesList} />);
      expect(testInstance.findAllByType(GamePreviewsListItem).length).toBe(2);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsListItem", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsList games={gamesList} />
        );
        const testInstance = testRenderer.root;

        const gamePreviewsListItems = testInstance.findAllByType(
          GamePreviewsListItem
        );

        expect(gamePreviewsListItems[0].props.game).toBe(defaultGameSample);
        expect(gamePreviewsListItems[1].props.game).toBe(gameWithMovesSample);
      });
    });
  });
});
