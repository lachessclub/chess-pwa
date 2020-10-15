import { fireEvent, render } from "@testing-library/react";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { SeeksListItem } from "../SeeksListItem";
import {
  defaultSeekSample,
  seekSample2,
  seekSample3,
} from "../../../test-utils/data-sample/seek";

describe("SeeksListItem", () => {
  mountTest(SeeksListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no seek", () => {
      const { container } = render(<SeeksListItem />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain color icon", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      expect(queryByTestId("white-icon")).toBeInTheDocument();
      expect(queryByTestId("black-icon")).not.toBeInTheDocument();
      expect(queryByTestId("random-icon")).not.toBeInTheDocument();

      rerender(<SeeksListItem seek={seekSample2} />);
      expect(queryByTestId("white-icon")).not.toBeInTheDocument();
      expect(queryByTestId("black-icon")).toBeInTheDocument();
      expect(queryByTestId("random-icon")).not.toBeInTheDocument();

      rerender(<SeeksListItem seek={seekSample3} />);
      expect(queryByTestId("white-icon")).not.toBeInTheDocument();
      expect(queryByTestId("black-icon")).not.toBeInTheDocument();
      expect(queryByTestId("random-icon")).toBeInTheDocument();
    });

    it("should contain player name", () => {
      const { getByTestId } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      expect(getByTestId("user-name")).toHaveTextContent("Thomas Miller");
    });

    it("should contain time control", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      const timeControl = queryByTestId("time-control");

      expect(timeControl).toHaveTextContent("5 + 5");

      rerender(<SeeksListItem seek={seekSample2} />);

      expect(timeControl).toHaveTextContent("10 + 3");
    });

    it("should contain gameIsStarted class", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      const seekWrapper = queryByTestId("seek-wrapper");

      expect(seekWrapper).not.toHaveClass("gameIsStarted");

      rerender(<SeeksListItem seek={seekSample2} />);

      expect(seekWrapper).toHaveClass("gameIsStarted");
    });

    it("play button should contain spinner if acceptInProcess contains ID of the seek", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      let playBtnSpinner = queryByTestId("play-btn-spinner");
      expect(playBtnSpinner).not.toBeInTheDocument();

      rerender(<SeeksListItem seek={defaultSeekSample} acceptInProcess={4} />);
      playBtnSpinner = queryByTestId("play-btn-spinner");
      expect(playBtnSpinner).not.toBeInTheDocument();

      rerender(<SeeksListItem seek={defaultSeekSample} acceptInProcess={1} />);
      playBtnSpinner = queryByTestId("play-btn-spinner");
      expect(playBtnSpinner).toBeInTheDocument();
    });

    it("play button disabled if acceptInProcess is not NULL", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      const playBtn = queryByTestId("play-btn");

      expect(playBtn).not.toBeDisabled();

      rerender(<SeeksListItem seek={defaultSeekSample} acceptInProcess={4} />);

      expect(playBtn).toBeDisabled();
    });

    it("play button disabled if game is started", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      const playBtn = queryByTestId("play-btn");

      expect(playBtn).not.toBeDisabled();

      rerender(<SeeksListItem seek={seekSample2} />);

      expect(playBtn).toBeDisabled();
    });

    it("play button is hidden if current user created the seek", () => {
      const { queryByTestId, rerender } = render(
        <SeeksListItem seek={defaultSeekSample} />
      );

      let playBtn = queryByTestId("play-btn");
      expect(playBtn).toBeInTheDocument();

      rerender(<SeeksListItem seek={seekSample2} currentUserId={2} />);
      playBtn = queryByTestId("play-btn");
      expect(playBtn).toBeInTheDocument();

      rerender(<SeeksListItem seek={seekSample2} currentUserId={1} />);
      playBtn = queryByTestId("play-btn");
      expect(playBtn).not.toBeInTheDocument();
    });
  });

  describe("Events", () => {
    it("onPlay", () => {
      const onPlay = jest.fn();

      const { getByTestId } = render(
        <SeeksListItem seek={defaultSeekSample} onPlay={onPlay} />
      );

      fireEvent.click(getByTestId("play-btn"));

      expect(onPlay).toBeCalledTimes(1);
      expect(onPlay).toBeCalledWith(1);
    });
  });
});
