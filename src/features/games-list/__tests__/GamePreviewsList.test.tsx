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
import { ContentLoadingStatus } from "../../../components/ContentLoadingStatus";

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

    it("contains ContentLoadingStatus", () => {
      const testRenderer = TestRenderer.create(<GamePreviewsList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ContentLoadingStatus).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ContentLoadingStatus", () => {
      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<GamePreviewsList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isLoading).toBeFalsy();

        testRenderer.update(<GamePreviewsList isLoading />);

        expect(contentLoadingStatus.props.isLoading).toBeTruthy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<GamePreviewsList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.error).toBeNull();

        testRenderer.update(<GamePreviewsList isLoading error="error text" />);

        expect(contentLoadingStatus.props.error).toBe("error text");
      });

      it("isEmpty", () => {
        const testRenderer = TestRenderer.create(<GamePreviewsList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isEmpty).toBeTruthy();

        testRenderer.update(<GamePreviewsList games={gamesList} />);

        expect(contentLoadingStatus.props.isEmpty).toBeFalsy();
      });

      it("emptyContentMessage", () => {
        const testRenderer = TestRenderer.create(<GamePreviewsList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.emptyContentMessage).toBeUndefined();

        testRenderer.update(
          <GamePreviewsList emptyContentMessage="no previews" />
        );

        expect(contentLoadingStatus.props.emptyContentMessage).toBe(
          "no previews"
        );
      });
    });

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
