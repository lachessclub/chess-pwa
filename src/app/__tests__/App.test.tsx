import React from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch, useSelector } from "react-redux";
import { render } from "@testing-library/react";
import App from "../App";
import mountTest from "../../tests/mountTest";
import HomePage from "../../pages/HomePage";
import { RootState } from "../rootReducer";
import { fetchCurrentUser } from "../../redux/slices/currentUserSlice";
import { watchGames } from "../../redux/slices/entitiesSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/currentUserSlice");
jest.mock("../../redux/slices/entitiesSlice");

const stateSample: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  ongoingGames: {
    items: [],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {},
  },
};

describe("App", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample));
  });

  mountTest(App);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains HomePage", () => {
      const testRenderer = TestRenderer.create(<App />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(HomePage).length).toBe(1);
    });
  });

  // @todo. add tests for App contains HomePage and GamePage
  // @todo. add tests for other content
  // @todo. add tests for auth modal
  // @todo. add tests for AppContext

  describe("DOM structure", () => {
    it("renders learn react link", () => {
      const { getByText } = render(<App />);
      const linkElement = getByText(/Home/i);
      expect(linkElement).toBeInTheDocument();
    });
  });

  describe("dispatch() calls", () => {
    it("fetchCurrentUser()", () => {
      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);
      dispatch.mockClear();

      const fetchCurrentUserFn = fetchCurrentUser as jest.Mock;
      fetchCurrentUserFn.mockReturnValue("fetchCurrentUserFn return value");

      fetchCurrentUserFn.mockClear();

      TestRenderer.act(() => {
        TestRenderer.create(<App />);
      });

      expect(fetchCurrentUserFn).toBeCalledTimes(1);
      expect(fetchCurrentUserFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith("fetchCurrentUserFn return value");
    });

    it("watchGames()", () => {
      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);
      dispatch.mockClear();

      const watchGamesFn = watchGames as jest.Mock;
      watchGamesFn.mockReturnValue("watchGamesFn return value");

      watchGamesFn.mockClear();

      TestRenderer.act(() => {
        TestRenderer.create(<App />);
      });

      expect(watchGamesFn).toBeCalledTimes(1);
      expect(watchGamesFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith("watchGamesFn return value");
    });
  });
});
