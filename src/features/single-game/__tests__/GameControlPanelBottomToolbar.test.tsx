import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { GameControlPanelBottomToolbar } from "../GameControlPanelBottomToolbar";

describe("GameControlPanelBottomToolbar", () => {
  describe("Events", () => {
    it("onAbortGame", () => {
      const onAbortGame = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar onAbortGame={onAbortGame} />
      );

      fireEvent.click(getByTestId("abort-game-btn"));

      expect(onAbortGame).toBeCalledTimes(1);
      expect(onAbortGame).toBeCalledWith();
    });

    it("onOfferDraw", () => {
      const onOfferDraw = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar onOfferDraw={onOfferDraw} />
      );

      fireEvent.click(getByTestId("offer-draw-btn"));

      expect(onOfferDraw).toBeCalledTimes(1);
      expect(onOfferDraw).toBeCalledWith();
    });

    it("onResignGame", () => {
      const onResignGame = jest.fn();

      const { getByTestId } = render(
        <GameControlPanelBottomToolbar onResignGame={onResignGame} />
      );

      fireEvent.click(getByTestId("resign-game-btn"));

      expect(onResignGame).toBeCalledTimes(1);
      expect(onResignGame).toBeCalledWith();
    });
  });
});
