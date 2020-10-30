import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { GameControlPanelBottomToolbar } from "../GameControlPanelBottomToolbar";

describe("GameControlPanelBottomToolbar", () => {
  describe("Events", () => {
    it("onAbortGame", () => {
      const onAbortGame = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar onAbortGame={onAbortGame} canAbortGame />
      );

      fireEvent.click(getByTestId("abort-game-btn"));

      expect(onAbortGame).toBeCalledTimes(1);
      expect(onAbortGame).toBeCalledWith();
    });

    it("handle abort-game if no onAbortGame callback", () => {
      const { getByTestId } = render(
        <GameControlPanelBottomToolbar canAbortGame />
      );

      expect(() => {
        fireEvent.click(getByTestId("abort-game-btn"));
      }).not.toThrow();
    });

    it("onOfferDraw", () => {
      const onOfferDraw = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar onOfferDraw={onOfferDraw} canOfferDraw />
      );

      fireEvent.click(getByTestId("offer-draw-btn"));

      expect(onOfferDraw).toBeCalledTimes(1);
      expect(onOfferDraw).toBeCalledWith();
    });

    it("handle offer-draw if no onOfferDraw callback", () => {
      const { getByTestId } = render(
        <GameControlPanelBottomToolbar canOfferDraw />
      );

      expect(() => {
        fireEvent.click(getByTestId("offer-draw-btn"));
      }).not.toThrow();
    });

    it("onResignGame", () => {
      const onResignGame = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar
          onResignGame={onResignGame}
          canResignGame
        />
      );

      fireEvent.click(getByTestId("resign-game-btn"));

      expect(onResignGame).toBeCalledTimes(1);
      expect(onResignGame).toBeCalledWith();
    });

    it("handle resign-game if no onResignGame callback", () => {
      const { getByTestId } = render(
        <GameControlPanelBottomToolbar canResignGame />
      );

      expect(() => {
        fireEvent.click(getByTestId("resign-game-btn"));
      }).not.toThrow();
    });
  });

  describe("DOM structure", () => {
    it("abort-game-btn", () => {
      const { getByTestId, rerender } = render(
        <GameControlPanelBottomToolbar />
      );

      const btn = getByTestId("abort-game-btn");

      expect(btn).toBeDisabled();

      rerender(<GameControlPanelBottomToolbar canAbortGame />);

      expect(btn).not.toBeDisabled();
    });

    it("offer-draw-btn", () => {
      const { getByTestId, rerender } = render(
        <GameControlPanelBottomToolbar />
      );

      const btn = getByTestId("offer-draw-btn");

      expect(btn).toBeDisabled();

      rerender(<GameControlPanelBottomToolbar canOfferDraw />);

      expect(btn).not.toBeDisabled();
    });

    it("resign-game-btn", () => {
      const { getByTestId, rerender } = render(
        <GameControlPanelBottomToolbar />
      );

      const btn = getByTestId("resign-game-btn");

      expect(btn).toBeDisabled();

      rerender(<GameControlPanelBottomToolbar canResignGame />);

      expect(btn).not.toBeDisabled();
    });
  });
});
