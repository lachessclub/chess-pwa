import { render } from "@testing-library/react";
import React from "react";
import TestRenderer from "react-test-renderer";
import { GameControlPanel } from "../GameControlPanel";
import { gameSample } from "../../../test-utils/data-sample/game";
import { GameClock } from "../GameClock";
import { GameMoves } from "../GameMoves";
import { GameControlPanelUserName } from "../GameControlPanelUserName";
import { GameControlPanelBottomToolbar } from "../GameControlPanelBottomToolbar";
import { GameControlPanelTopToolbar } from "../GameControlPanelTopToolbar";

describe("GameControlPanel", () => {
  describe("children components", () => {
    it("contains GameClock", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameClock).length).toBe(2);
    });

    it("contains GameMoves", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameMoves).length).toBe(1);
    });

    it("contains GameControlPanelUserName", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanelUserName).length).toBe(
        2
      );
    });

    it("contains GameControlPanelTopToolbar", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(GameControlPanelTopToolbar).length
      ).toBe(1);
    });

    it("contains GameControlPanelBottomToolbar", () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanel game={gameSample} />
      );
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(GameControlPanelBottomToolbar).length
      ).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameClock", () => {
      it("time", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameClocks = testInstance.findAllByType(GameClock);

        expect(gameClocks[0].props.time).toBe(365000);
        expect(gameClocks[1].props.time).toBe(310000);

        testRenderer.update(
          <GameControlPanel game={gameSample} orientation="black" />
        );

        expect(gameClocks[0].props.time).toBe(310000);
        expect(gameClocks[1].props.time).toBe(365000);
      });
    });

    describe("GameControlPanelUserName", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanelUserNames = testInstance.findAllByType(
          GameControlPanelUserName
        );

        expect(gameControlPanelUserNames[0].props.game).toBe(gameSample);
        expect(gameControlPanelUserNames[1].props.game).toBe(gameSample);
      });

      it("color", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanelUserNames = testInstance.findAllByType(
          GameControlPanelUserName
        );

        expect(gameControlPanelUserNames[0].props.color).toBe("black");
        expect(gameControlPanelUserNames[1].props.color).toBe("white");

        testRenderer.update(
          <GameControlPanel game={gameSample} orientation="black" />
        );

        expect(gameControlPanelUserNames[0].props.color).toBe("white");
        expect(gameControlPanelUserNames[1].props.color).toBe("black");
      });
    });

    describe("GameMoves", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMoves = testInstance.findByType(GameMoves);

        expect(gameMoves.props.game).toBe(gameSample);
      });

      it("onRewindToMove", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMoves = testInstance.findByType(GameMoves);

        expect(gameMoves.props.onRewindToMove).toBeUndefined();

        const onRewindToMove = jest.fn();

        testRenderer.update(
          <GameControlPanel game={gameSample} onRewindToMove={onRewindToMove} />
        );

        expect(gameMoves.props.onRewindToMove).toBe(onRewindToMove);
      });
    });

    describe("GameControlPanelTopToolbar", () => {
      it("onFlipBoard", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const topToolbar = testInstance.findByType(GameControlPanelTopToolbar);

        expect(topToolbar.props.onFlipBoard).toBeUndefined();

        const onFlipBoard = jest.fn();

        testRenderer.update(
          <GameControlPanel game={gameSample} onFlipBoard={onFlipBoard} />
        );

        expect(topToolbar.props.onFlipBoard).toBe(onFlipBoard);
      });

      it("onRewindToPrevMove", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const topToolbar = testInstance.findByType(GameControlPanelTopToolbar);

        expect(topToolbar.props.onRewindToPrevMove).toBeUndefined();

        const onRewindToPrevMove = jest.fn();

        testRenderer.update(
          <GameControlPanel
            game={gameSample}
            onRewindToPrevMove={onRewindToPrevMove}
          />
        );

        expect(topToolbar.props.onRewindToPrevMove).toBe(onRewindToPrevMove);
      });

      it("onRewindToNextMove", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const topToolbar = testInstance.findByType(GameControlPanelTopToolbar);

        expect(topToolbar.props.onRewindToNextMove).toBeUndefined();

        const onRewindToNextMove = jest.fn();

        testRenderer.update(
          <GameControlPanel
            game={gameSample}
            onRewindToNextMove={onRewindToNextMove}
          />
        );

        expect(topToolbar.props.onRewindToNextMove).toBe(onRewindToNextMove);
      });

      it("onRewindToFirstMove", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const topToolbar = testInstance.findByType(GameControlPanelTopToolbar);

        expect(topToolbar.props.onRewindToFirstMove).toBeUndefined();

        const onRewindToFirstMove = jest.fn();

        testRenderer.update(
          <GameControlPanel
            game={gameSample}
            onRewindToFirstMove={onRewindToFirstMove}
          />
        );

        expect(topToolbar.props.onRewindToFirstMove).toBe(onRewindToFirstMove);
      });

      it("onRewindToLastMove", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const topToolbar = testInstance.findByType(GameControlPanelTopToolbar);

        expect(topToolbar.props.onRewindToLastMove).toBeUndefined();

        const onRewindToLastMove = jest.fn();

        testRenderer.update(
          <GameControlPanel
            game={gameSample}
            onRewindToLastMove={onRewindToLastMove}
          />
        );

        expect(topToolbar.props.onRewindToLastMove).toBe(onRewindToLastMove);
      });
    });

    describe("GameControlPanelBottomToolbar", () => {
      it("onFlipBoard", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const bottomToolbar = testInstance.findByType(
          GameControlPanelBottomToolbar
        );

        expect(bottomToolbar.props.onAbortGame).toBeUndefined();

        const onAbortGame = jest.fn();

        testRenderer.update(
          <GameControlPanel game={gameSample} onAbortGame={onAbortGame} />
        );

        expect(bottomToolbar.props.onAbortGame).toBe(onAbortGame);
      });

      it("onOfferDraw", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const bottomToolbar = testInstance.findByType(
          GameControlPanelBottomToolbar
        );

        expect(bottomToolbar.props.onOfferDraw).toBeUndefined();

        const onOfferDraw = jest.fn();

        testRenderer.update(
          <GameControlPanel game={gameSample} onOfferDraw={onOfferDraw} />
        );

        expect(bottomToolbar.props.onOfferDraw).toBe(onOfferDraw);
      });

      it("onResignGame", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanel game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const bottomToolbar = testInstance.findByType(
          GameControlPanelBottomToolbar
        );

        expect(bottomToolbar.props.onResignGame).toBeUndefined();

        const onResignGame = jest.fn();

        testRenderer.update(
          <GameControlPanel game={gameSample} onResignGame={onResignGame} />
        );

        expect(bottomToolbar.props.onResignGame).toBe(onResignGame);
      });
    });
  });

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GameControlPanel />);
      expect(container).toBeEmptyDOMElement();
    });
  });
});
