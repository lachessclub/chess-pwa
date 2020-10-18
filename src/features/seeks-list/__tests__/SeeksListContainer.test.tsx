import { useDispatch, useSelector } from "react-redux";
import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import SeeksListContainer from "../SeeksListContainer";
import { SeeksList } from "../SeeksList";
import { acceptSeek } from "../../challenge/challengeSlice";
import {
  makeSeekSample,
  normalizedSeekSample1,
  normalizedSeekSample2,
  seekSample1,
  seekSample2,
} from "../../../test-utils/data-sample/seek";
import {
  normalizedUserSample1,
  normalizedUserSample2,
} from "../../../test-utils/data-sample/user";
import {
  gameSample1,
  normalizedGameSample2,
} from "../../../test-utils/data-sample/game";

jest.mock("../../challenge/challengeSlice");

const stateWithCurrentUser = makeStateSample({
  currentUser: {
    userId: 8,
    isLoading: false,
    error: null,
  },
});

const stateWithLoadedSeeks = makeStateSample({
  seeksList: {
    isLoading: false,
    error: null,
    items: [],
  },
});

const stateWithLoadingError = makeStateSample({
  seeksList: {
    isLoading: false,
    error: "error text",
    items: [],
  },
});

const seekWithStartedGame = makeSeekSample({
  game: gameSample1,
});

const stateWithSeeks = makeStateSample({
  seeksList: {
    isLoading: false,
    error: null,
    items: [2, 1],
  },
  entities: {
    users: {
      1: normalizedUserSample1,
      2: normalizedUserSample2,
    },
    games: {
      2: normalizedGameSample2,
    },
    seeks: {
      1: normalizedSeekSample1,
      2: normalizedSeekSample2,
    },
  },
});

const stateWithAcceptSeekRequest = makeStateSample({
  acceptSeekRequest: {
    inProcess: true,
    itemId: 6,
    error: null,
  },
});

describe("SeeksListContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SeeksListContainer);

  describe("children components", () => {
    it("contains SeeksList", async () => {
      const testRenderer = TestRenderer.create(<SeeksListContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeeksList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SeeksList", () => {
      it("seeks", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.seeks).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithSeeks)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.seeks).toEqual([
          seekSample2,
          seekSample1,
        ]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.isLoading).toBeTruthy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedSeeks)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.isLoading).toBeFalsy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.error).toBe("error text");
      });

      it("acceptInProcess", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.acceptInProcess).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithAcceptSeekRequest)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.acceptInProcess).toBe(6);
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(<SeeksListContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(SeeksList);

        expect(seeksListComponent.props.currentUserId).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithCurrentUser)
        );

        testRenderer.update(<SeeksListContainer />);

        expect(seeksListComponent.props.currentUserId).toBe(8);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(acceptSeek())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<SeeksListContainer />);
      const testInstance = testRenderer.root;

      const seeksList = testInstance.findByType(SeeksList);

      const acceptSeekReturnedValue = Symbol("acceptSeek");

      const acceptSeekFn = acceptSeek as jest.Mock;
      acceptSeekFn.mockClear();
      acceptSeekFn.mockReturnValue(acceptSeekReturnedValue);

      TestRenderer.act(() => {
        seeksList.props.onPlay(5);
      });

      expect(acceptSeekFn).toBeCalledTimes(1);
      expect(acceptSeekFn).toBeCalledWith(5);

      expect(dispatch).toBeCalledWith(acceptSeekReturnedValue);
    });

    it("should handle dispatch(acceptSeek()) success", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.resolve(seekWithStartedGame)
      );

      const testRenderer = TestRenderer.create(<SeeksListContainer />);
      const testInstance = testRenderer.root;

      const seeksList = testInstance.findByType(SeeksList);

      await TestRenderer.act(async () => {
        seeksList.props.onPlay(5);
      });

      const push = useHistory().push as jest.Mock;

      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith("/game/1");
    });

    // @todo. we need to test dispatch(acceptSeek()) fail. We should test if acceptSeek() Promise
    // is rejected then this should be handled in SeeksListContainer (without unhandled Promise rejection)
  });
});
