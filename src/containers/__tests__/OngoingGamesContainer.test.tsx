import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../OngoingGamesContainer";
import { GamePreviewsList } from "../../components/GamePreviewsList";
import mountTest from "../../test-utils/mountTest";
import { fetchOngoingGames } from "../../redux/slices/ongoingGamesSlice";
import {
  defaultState,
  stateWithDataSample,
} from "../../test-utils/data-sample/state";

jest.useFakeTimers();

jest.mock("../../redux/slices/ongoingGamesSlice");

describe("OngoingGamesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([
          {
            id: 1,
            initialFen: "startpos",
            wtime: 300000,
            btime: 300000,
            moves: "",
            status: "started",
            white: null,
            black: null,
          },
        ]);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(fetchOngoingGames())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchOngoingGamesReturnedValue = Symbol("fetchOngoingGames");

      const fetchOngoingGamesFn = fetchOngoingGames as jest.Mock;
      fetchOngoingGamesFn.mockClear();
      fetchOngoingGamesFn.mockReturnValue(fetchOngoingGamesReturnedValue);

      TestRenderer.create(<OngoingGamesContainer />);

      expect(fetchOngoingGamesFn).toBeCalledTimes(1);
      expect(fetchOngoingGamesFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(fetchOngoingGamesReturnedValue);
    });
  });
});
