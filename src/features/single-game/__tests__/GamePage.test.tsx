import React, { useEffect } from "react";
import TestRenderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GamePage from "../GamePage";
import { GameMetaContainer } from "../GameMetaContainer";
import { GameControlPanelContainer } from "../GameControlPanelContainer";
import { SingleGameBoardContainer } from "../SingleGameBoardContainer";
import { fetchGame } from "../singleGameSlice";
import { makeStateSample } from "../../../test-utils/data-sample/state";
import { normalizedGameSample1 } from "../../../test-utils/data-sample/game";
import { Chat } from "../../chat/Chat";
import { fetchChatMessages } from "../../chat/chatSlice";

jest.mock("../singleGameSlice");
jest.mock("../../chat/chatSlice");

const stateWithGameSample = makeStateSample({
  entities: {
    users: {},
    games: {
      1: normalizedGameSample1,
    },
    seeks: {},
    chatMessages: {},
  },
});

describe("GamePage", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithGameSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  describe("children components", () => {
    it("contains GameMetaContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameMetaContainer).length).toBe(1);
    });

    it("contains GameControlPanelContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanelContainer).length).toBe(
        1
      );
    });

    it("contains SingleGameBoardContainer", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGameBoardContainer).length).toBe(
        1
      );
    });

    it("contains Chat", () => {
      const testRenderer = TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Chat).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameMetaContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameMetaContainer = testInstance.findByType(
          GameMetaContainer
        );

        expect(singleGameMetaContainer.props.id).toBe(2);
      });
    });

    describe("GameControlPanelContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelContainer = testInstance.findByType(
          GameControlPanelContainer
        );

        expect(singleGameControlPanelContainer.props.id).toBe(2);
      });
    });

    describe("SingleGameBoardContainer", () => {
      it("id", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const singleGameBoardContainer = testInstance.findByType(
          SingleGameBoardContainer
        );

        expect(singleGameBoardContainer.props.id).toBe(2);
      });
    });

    describe("Chat", () => {
      it("gameId", () => {
        const testRenderer = TestRenderer.create(
          <MemoryRouter initialEntries={["/game/2"]}>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </MemoryRouter>
        );
        const testInstance = testRenderer.root;

        const chat = testInstance.findByType(Chat);

        expect(chat.props.gameId).toBe(2);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(fetchGame())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchGameReturnedValue = Symbol("fetchGame");

      const fetchGameFn = fetchGame as jest.Mock;
      fetchGameFn.mockClear();
      fetchGameFn.mockReturnValue(fetchGameReturnedValue);

      TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);

      // @todo. fix the commented code
      /*
      fetchGameFn.mockClear();
      dispatch.mockClear();
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      testRenderer.update(
        <MemoryRouter initialEntries={["/game/2"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(2);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);
      */
    });

    it("should call dispatch(fetchChatMessages())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchChatMessagesReturnedValue = Symbol("fetchChatMessages");

      const fetchChatMessagesFn = fetchChatMessages as jest.Mock;
      fetchChatMessagesFn.mockClear();
      fetchChatMessagesFn.mockReturnValue(fetchChatMessagesReturnedValue);

      TestRenderer.create(
        <MemoryRouter initialEntries={["/game/1"]}>
          <Route path="/game/:id">
            <GamePage />
          </Route>
        </MemoryRouter>
      );

      expect(fetchChatMessagesFn).toBeCalledTimes(1);
      expect(fetchChatMessagesFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(fetchChatMessagesReturnedValue);
    });
  });
});
