import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { GameControlPanelTopToolbar } from "../GameControlPanelTopToolbar";

describe("GameControlPanelTopToolbar", () => {
  describe("Events", () => {
    it("onFlipBoard", () => {
      const onFlipBoard = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelTopToolbar onFlipBoard={onFlipBoard} />
      );

      fireEvent.click(getByTestId("flip-board-btn"));

      expect(onFlipBoard).toBeCalledTimes(1);
      expect(onFlipBoard).toBeCalledWith();
    });

    it("onRewindToPrevMove", () => {
      const onRewindToPrevMove = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelTopToolbar onRewindToPrevMove={onRewindToPrevMove} />
      );

      fireEvent.click(getByTestId("rewind-to-prev-move-btn"));

      expect(onRewindToPrevMove).toBeCalledTimes(1);
      expect(onRewindToPrevMove).toBeCalledWith();
    });

    it("onRewindToNextMove", () => {
      const onRewindToNextMove = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelTopToolbar onRewindToNextMove={onRewindToNextMove} />
      );

      fireEvent.click(getByTestId("rewind-to-next-move-btn"));

      expect(onRewindToNextMove).toBeCalledTimes(1);
      expect(onRewindToNextMove).toBeCalledWith();
    });

    it("onRewindToFirstMove", () => {
      const onRewindToFirstMove = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelTopToolbar onRewindToFirstMove={onRewindToFirstMove} />
      );

      fireEvent.click(getByTestId("rewind-to-first-move-btn"));

      expect(onRewindToFirstMove).toBeCalledTimes(1);
      expect(onRewindToFirstMove).toBeCalledWith();
    });

    it("onRewindToLastMove", () => {
      const onRewindToLastMove = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelTopToolbar onRewindToLastMove={onRewindToLastMove} />
      );

      fireEvent.click(getByTestId("rewind-to-last-move-btn"));

      expect(onRewindToLastMove).toBeCalledTimes(1);
      expect(onRewindToLastMove).toBeCalledWith();
    });
  });
});
