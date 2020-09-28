import React, { useEffect } from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch, useSelector } from "react-redux";
import App from "../App";
import mountTest from "../../test-utils/mountTest";
import HomePage from "../../features/home-page/HomePage";
import { fetchCurrentUser } from "../../features/current-user/currentUserSlice";
import { watchGames } from "../../features/data-subscription/dataSubscriptionSlice";
import { defaultState } from "../../test-utils/data-sample/state";
import { startGameClock } from "../../features/game-clock/gameClockSlice";
import HeaderContainer from "../../features/header/HeaderContainer";
import AuthModalContainer from "../../features/auth-modal/AuthModalContainer";

jest.useFakeTimers();

jest.mock("../../features/current-user/currentUserSlice");
jest.mock("../../features/game-clock/gameClockSlice");
jest.mock("../../features/data-subscription/dataSubscriptionSlice");

describe("App", () => {
  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(App);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains HeaderContainer", () => {
      const testRenderer = TestRenderer.create(<App />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(HeaderContainer).length).toBe(1);
    });

    it("contains HomePage", () => {
      const testRenderer = TestRenderer.create(<App />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(HomePage).length).toBe(1);
    });

    it("contains AuthModalContainer", () => {
      const testRenderer = TestRenderer.create(<App />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(AuthModalContainer).length).toBe(1);
    });
  });

  // @todo. add tests for other content

  describe("dispatch() calls", () => {
    it("should call dispatch(startGameClock())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const startGameClockReturnedValue = Symbol("startGameClock");

      const startGameClockFn = startGameClock as jest.Mock;
      startGameClockFn.mockClear();
      startGameClockFn.mockReturnValue(startGameClockReturnedValue);

      TestRenderer.create(<App />);

      expect(startGameClockFn).toBeCalledTimes(1);
      expect(startGameClockFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(startGameClockReturnedValue);
    });

    it("should call dispatch(fetchCurrentUser())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchCurrentUserReturnedValue = Symbol("fetchCurrentUser");

      const fetchCurrentUserFn = fetchCurrentUser as jest.Mock;
      fetchCurrentUserFn.mockClear();
      fetchCurrentUserFn.mockReturnValue(fetchCurrentUserReturnedValue);

      TestRenderer.create(<App />);

      expect(fetchCurrentUserFn).toBeCalledTimes(1);
      expect(fetchCurrentUserFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(fetchCurrentUserReturnedValue);
    });

    it("watchGames()", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const watchGamesReturnedValue = Symbol("watchGames");

      const watchGamesFn = watchGames as jest.Mock;
      watchGamesFn.mockClear();
      watchGamesFn.mockReturnValue(watchGamesReturnedValue);

      TestRenderer.create(<App />);

      expect(watchGamesFn).toBeCalledTimes(1);
      expect(watchGamesFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(watchGamesReturnedValue);
    });
  });
});
