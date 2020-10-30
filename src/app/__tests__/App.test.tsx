import React, { useEffect } from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch, useSelector } from "react-redux";
import App from "../App";
import mountTest from "../../test-utils/mountTest";
import HomePage from "../../features/home-page/HomePage";
import { fetchCurrentUser } from "../../features/current-user/currentUserSlice";
import {
  watchGames,
  watchSeeks,
  watchUsers,
  watchChatMessages,
  watchConnection,
} from "../../features/data-subscription/dataSubscriptionSlice";
import { defaultState } from "../../test-utils/data-sample/state";
import { startGameClock } from "../../features/game-clock/gameClockSlice";
import HeaderContainer from "../../features/header/HeaderContainer";
import AuthModalContainer from "../../features/auth-modal/AuthModalContainer";
import { fetchGames } from "../../features/games-list/gamesListSlice";
import { fetchSeeks } from "../../features/seeks-list/seeksListSlice";
import MessagesContainer from "../../features/messages/MessagesContainer";
import { fetchUsers } from "../../features/users-list/usersListSlice";

jest.mock("../../features/current-user/currentUserSlice");
jest.mock("../../features/game-clock/gameClockSlice");
jest.mock("../../features/data-subscription/dataSubscriptionSlice");
jest.mock("../../features/games-list/gamesListSlice");
jest.mock("../../features/seeks-list/seeksListSlice");
jest.mock("../../features/users-list/usersListSlice");

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

    it("contains MessagesContainer", () => {
      const testRenderer = TestRenderer.create(<App />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(MessagesContainer).length).toBe(1);
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

    // @todo . add test: should stop game clock on component unmount

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

    it("should call dispatch(watchGames())", () => {
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

    it("should call dispatch(watchChatMessages())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const watchChatMessagesReturnedValue = Symbol("watchChatMessages");

      const watchChatMessagesFn = watchChatMessages as jest.Mock;
      watchChatMessagesFn.mockClear();
      watchChatMessagesFn.mockReturnValue(watchChatMessagesReturnedValue);

      TestRenderer.create(<App />);

      expect(watchChatMessagesFn).toBeCalledTimes(1);
      expect(watchChatMessagesFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(watchChatMessagesReturnedValue);
    });

    it("should call dispatch(watchSeeks())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const watchSeeksReturnedValue = Symbol("watchSeeks");

      const watchSeeksFn = watchSeeks as jest.Mock;
      watchSeeksFn.mockClear();
      watchSeeksFn.mockReturnValue(watchSeeksReturnedValue);

      TestRenderer.create(<App />);

      expect(watchSeeksFn).toBeCalledTimes(1);
      expect(watchSeeksFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(watchSeeksReturnedValue);
    });

    it("should call dispatch(watchUsers())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const watchUsersReturnedValue = Symbol("watchUsers");

      const watchUsersFn = watchUsers as jest.Mock;
      watchUsersFn.mockClear();
      watchUsersFn.mockReturnValue(watchUsersReturnedValue);

      TestRenderer.create(<App />);

      expect(watchUsersFn).toBeCalledTimes(1);
      expect(watchUsersFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(watchUsersReturnedValue);
    });

    it("should call dispatch(watchConnection())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const watchConnectionReturnedValue = Symbol("watchConnection");

      const watchConnectionFn = watchConnection as jest.Mock;
      watchConnectionFn.mockClear();
      watchConnectionFn.mockReturnValue(watchConnectionReturnedValue);

      TestRenderer.create(<App />);

      expect(watchConnectionFn).toBeCalledTimes(1);
      expect(watchConnectionFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(watchConnectionReturnedValue);
    });

    it("should call dispatch(fetchGames())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchGamesReturnedValue = Symbol("fetchGames");

      const fetchGamesFn = fetchGames as jest.Mock;
      fetchGamesFn.mockClear();
      fetchGamesFn.mockReturnValue(fetchGamesReturnedValue);

      TestRenderer.create(<App />);

      expect(fetchGamesFn).toBeCalledTimes(1);
      expect(fetchGamesFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(fetchGamesReturnedValue);
    });

    it("should call dispatch(fetchUsers())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchUsersReturnedValue = Symbol("fetchUsers");

      const fetchUsersFn = fetchUsers as jest.Mock;
      fetchUsersFn.mockClear();
      fetchUsersFn.mockReturnValue(fetchUsersReturnedValue);

      TestRenderer.create(<App />);

      expect(fetchUsersFn).toBeCalledTimes(1);
      expect(fetchUsersFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(fetchUsersReturnedValue);
    });

    it("should call dispatch(fetchSeeks())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchSeeksReturnedValue = Symbol("fetchSeeks");

      const fetchSeeksFn = fetchSeeks as jest.Mock;
      fetchSeeksFn.mockClear();
      fetchSeeksFn.mockReturnValue(fetchSeeksReturnedValue);

      TestRenderer.create(<App />);

      expect(fetchSeeksFn).toBeCalledTimes(1);
      expect(fetchSeeksFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(fetchSeeksReturnedValue);
    });
  });
});
